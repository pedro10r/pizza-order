import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Description,
  Image,
  Name,
  StatusContainer,
  StatusLabel,
} from './styles';

type Props = TouchableOpacityProps & {
  index: number;
};

export function OrderCard({ index, ...rest }: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: 'https://github.com/pedro10r.png' }} />

      <Name>4 Queijos</Name>

      <Description>Mesa 5 • Qnt: 1</Description>

      <StatusContainer status="preparando">
        <StatusLabel status="preparando">Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
