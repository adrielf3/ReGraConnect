import React from 'react';
import { Image } from 'react-native';
import styles, {
  Container,
  Body,
  TitleContainer,
  Title,
  SubTitle,
  ImageContainer
} from './styles';

type Props = {
  accessNews: any
}

function Notifications({ accessNews }: Props) {

  return (
    <Container>
      <Body style={styles.img} onPress={accessNews}>
        <TitleContainer>
          <Title>Lançamento</Title>
          <SubTitle>Budweiser lança no Brasil cerveja zero álcool.</SubTitle>
        </TitleContainer>
        <ImageContainer>
          <Image style={{
            width: 120,
            height: 120,
            resizeMode: 'contain'
          }} source={require('../../assets/imgs/bud-zero-ln.png')} />
        </ImageContainer>
      </Body>
      <Body style={styles.img}>
        <TitleContainer>
          <Title>Outubro rosa</Title>
          <SubTitle>Mês de prevenção do câncer de mama.</SubTitle>
        </TitleContainer>
        <ImageContainer>
          <Image style={{
            width: 120,
            height: 120,
            resizeMode: 'contain'
          }} source={require('../../assets/imgs/cancer-de-mama.png')} />
        </ImageContainer>
      </Body>
    </Container>
  )
}

export default Notifications;