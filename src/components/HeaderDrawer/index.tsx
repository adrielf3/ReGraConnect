import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  IconBody
} from './styles';

type Props = {
  openDrawer: any;
  notifications: any;
}

function HeaderDrawer({ openDrawer, notifications }: Props) {

  return (
    <Container>
      <IconBody onPress={openDrawer}>
        <Icon name='menu-outline' size={30} color='#676F85' />
      </IconBody>
      <IconBody onPress={notifications}>
        <Icon name='notifications-outline' size={30} color='#676F85' />
      </IconBody>
    </Container>
  )
}

export default HeaderDrawer;