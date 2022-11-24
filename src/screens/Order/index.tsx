import { Platform } from 'react-native';

import { ButtonBack } from '@components/ButtonBack';

import { Container, Header, Photo, Sizes } from './styles';
import { RadioButton } from '@components/RadioButton';

export function Order() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </Header>

      <Photo source={{ uri: 'https://github.com/pedro10r.png' }} />

      <Sizes>
        <RadioButton title="Pequeno" selected={false} />
      </Sizes>
    </Container>
  );
}
