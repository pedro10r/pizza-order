import { FlatList } from 'react-native';

import { ItemSeparator } from '@components/ItemSeparator';
import { OrderCard } from '@components/OrderCard';

import { Container, Header, Title } from './styles';

export function Orders() {
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={['1', '2', '3']}
        keyExtractor={(item) => String(item)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <OrderCard index={index} />}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}
