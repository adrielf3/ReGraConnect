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
  goBack: any;
  disabled: boolean;
}

function HeaderDrawer({ title, goBack, disabled }: Props) {

  return (
    <Container>
      <IconBody onPress={goBack} disabled={disabled}>
        <Icon name='arrow-back-outline' size={30} color='#676F85' />
      </IconBody>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
    </Container>
  )
}

export default HeaderDrawer;