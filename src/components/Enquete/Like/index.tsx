import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  TitleContainer,
  Title,
  IconBodyGreen,
  IconBody
} from './styles';

type Props = {
  perc: string;
  statusUser: number;
}

function HeaderDrawer({ perc, statusUser }: Props) {

  return (
    <Container>
      <TitleContainer>
        <Title>{perc}</Title>
      </TitleContainer>
      {statusUser == 1 ? (
        <IconBodyGreen>
          <Image style={{ width: 20, height: 20 }} source={require('../../../assets/imgs/likeGreen.png')} />
        </IconBodyGreen>
      ) : (
        <IconBody>
          <Image style={{ width: 20, height: 20 }} source={require('../../../assets/imgs/like.png')} />
        </IconBody>
      )}

    </Container>
  )
}

export default HeaderDrawer;