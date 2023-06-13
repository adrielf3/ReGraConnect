import React from 'react';
import {
  Container,
  Body,
  ContainerButton,
  Button,
  ButtonTitle
} from './styles';

type Props = {
  titleOne: string;
  titleTwo: string;
  onPressOne: any;
  onPressTwo: any;
  disabled: boolean;
}

function TwoButtons({ titleOne, titleTwo, onPressOne, onPressTwo, disabled }: Props) {

  return (
    <Container>
      <Body>
        <ContainerButton>
          <Button onPress={onPressOne} disabled={disabled}>
            <ButtonTitle>{titleOne}</ButtonTitle>
          </Button>
        </ContainerButton>
        <ContainerButton>
          <Button onPress={onPressTwo} disabled={disabled}>
            <ButtonTitle>{titleTwo}</ButtonTitle>
          </Button>
        </ContainerButton>
      </Body>
    </Container>
  )
}

export default TwoButtons;