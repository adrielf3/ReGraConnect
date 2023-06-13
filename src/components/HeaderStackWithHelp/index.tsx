import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  IconBody,
  Title
} from './styles';

type Props = {
  title: string;
  informativeText: string;
  goBack: any;
  disabled: boolean;
}

function HeaderDrawer({ title, informativeText, goBack, disabled }: Props) {

  return (
    <Container>
      <IconBody color={true} onPress={goBack} disabled={disabled}>
        <Icon name='arrow-back-outline' size={30} color='#676F85' />
      </IconBody>
      <Title>{title}</Title>
      <IconBody color={false} onPress={() => Alert.alert('', informativeText)}>
        <Icon name='information-circle' size={30} color='#676F85' />
      </IconBody>
    </Container>
  )
}

export default HeaderDrawer;