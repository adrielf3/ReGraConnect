import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Body,
  Img,
  Msg,
  Title,
  SubTitle
} from './styles';

// component
import Button from '../Button';
// >

type Props = {
  disabled: boolean;
  onPress: any;
}

function CallError({ disabled, onPress }: Props) {

  return (
    <Container>
      <Body>
        <Img>
          <Image style={{ width: 150, height: 150, resizeMode: 'contain' }} source={require('../../assets/imgs/triste.png')} />
        </Img>
        <Msg>
          <Title>Tivemos um problema</Title>
          <SubTitle>Não foi possível carregar as informações.</SubTitle>
          <SubTitle>Por favor, verifique sua conexão com a internet.</SubTitle>
        </Msg>
        <Button color={true} title='Tente novamente' onPress={onPress} disabled={disabled} />
      </Body>
    </Container>
  )
}

export default CallError;