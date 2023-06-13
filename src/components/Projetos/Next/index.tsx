import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  IconBody
} from './styles';

function HeaderDrawer() {

  return (
    <Container>
      <IconBody>
        <Icon name='chevron-forward-outline' size={30} color='#676F85' />
      </IconBody>
    </Container>
  )
}

export default HeaderDrawer;