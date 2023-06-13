import React from 'react';
import { Modal } from 'react-native';
import {
  Container,
  ActivityIndicator,
} from './styles';

import { useLoading } from '../../contexts/loading';

function Loading() {

  const { modalLoading } = useLoading();

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalLoading}
    >
      <Container>
        <ActivityIndicator />
      </Container>
    </Modal>
  )
}

export default Loading;