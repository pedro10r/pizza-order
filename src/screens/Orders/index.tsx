import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';

import { ItemSeparator } from '@components/ItemSeparator';
import { OrderCard, OrderProps } from '@components/OrderCard';

import { Container, Header, Title } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const { user } = useAuth();

  function handlePizzaDelivery(id: string) {
    Alert.alert('Pedido', 'Deseja confirmar que a pizza foi entregue?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          firestore().collection('orders').doc(id).update({
            status: 'entregue',
          });
        },
      },
    ]);
  }

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderProps[];

        setOrders(data);
      });

    return () => subscribe();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === 'entregue'}
            onPress={() => handlePizzaDelivery(item.id)}
          />
        )}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}
