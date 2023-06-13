import React from 'react';
import {
  Container,
  Title
} from './styles';

const ForgotUser: React.FC = () => {
  return (
    <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Title>Recuperar senha</Title>
    </Container>
  )
}

export default ForgotUser;