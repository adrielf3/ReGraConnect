import React from 'react';
import {
  Container,
  Title
} from './styles';

type Props = {
  color: boolean;
  title: string;
  onPress: any;
  disabled: boolean;
}

function Button({ color, title, onPress, disabled }: Props) {

  return (
    <Container color={color} onPress={onPress} disabled={disabled}>
      <Title color={color}>{title}</Title>
    </Container>
  )
}

export default Button;