import { TextInputProps } from 'react-native';

import { Container, TypeProps } from './styles';

type Props = TextInputProps & {
  type?: TypeProps;
}

export function Input({ type, ...rest }: Props) {
  return (
    <Container
      type={type}
      {...rest}
    />
  );
}