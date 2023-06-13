import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  IconBody,
  TitleContainer,
  Title
} from './styles';

type Props = {
  title: string;
  openDrawer: any;
}

function HeaderDrawer({ title, openDrawer }: Props) {

  return (
    <Container>
      <IconBody onPress={openDrawer}>
        <Icon name='menu-outline' size={30} color='#676F85' />
      </IconBody>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
    </Container>
  )
}

export default HeaderDrawer;