import { useState, useEffect } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductNavigationProps } from '../../@types/navigation';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ProductProps } from '@components/ProductCard';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  InputGroup,
  Label,
  InputGroupHeader,
  MaxCharacters,
} from './styles';

type PizzasResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  }
}

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photoPath, setPhotoPath] = useState('');

  const route = useRoute();
  const id = route.params as ProductNavigationProps;
  const navigation = useNavigation();

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza.')
    }

    if (!description.trim()) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza.')
    }

    if (!image) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza.')
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos da pizza.')
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => {
        Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.')
      })
      .catch(() => {
        Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.')
      })

    setIsLoading(false);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id.id)
        .get()
        .then((response) => {
          const product = response.data() as PizzasResponse;

          setName(product.name);
          setImage(product.photo_url);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
          setPhotoPath(product.photo_path);
        })
    }
  }, [id])

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack onPress={handleGoBack} />
        <Title>Cadastrar</Title>
        {!id ?
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
          : <View style={{ width: 30 }} />
        }
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Upload>
          <Photo uri={image} />
          {!id &&
            <PickImageButton
              title='Carregar'
              type='secondary'
              onPress={handlePickerImage}
            />
          }
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input
              value={name}
              onChangeText={setName}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>o de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              value={description}
              onChangeText={setDescription}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice
              size='P'
              value={priceSizeP}
              onChangeText={setPriceSizeP}
            />
            <InputPrice
              size='M'
              value={priceSizeM}
              onChangeText={setPriceSizeM}
            />
            <InputPrice
              size='G'
              value={priceSizeG}
              onChangeText={setPriceSizeG}
            />
          </InputGroup>

          {!id &&
            <Button
              title='Cadastrar Pizza'
              isLoading={isLoading}
              onPress={handleAdd}
            />
          }

        </Form>
      </ScrollView>
    </Container>
  );
}