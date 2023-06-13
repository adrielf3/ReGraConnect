import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Body,
  ContainerLogo,
  Logo,
  Title,
  LogoTitle,
  ContainerInput,
  ButtonForgotUse,
  ForgotUseTitle,
  Version
} from './styles';

import { useAuth } from '../../contexts/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {

  const navigation = useNavigation();

  const { signIn, buttonDisable } = useAuth();

  const [cpf, onChangeCPF] = useState('');
  const [password, onChangePassword] = useState('');
  const [keyVisible, setKeyVisible] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState(true);

  function handleSignIn() {
    signIn(cpf, password);
  }

  function handleForgotUser() {
    navigation.navigate('ForgotUser');
  }

  function handleKeyVisible() {
    setKeyVisible(keyVisible ? false : true)
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => { setKeyboardStatus(false) })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => { setKeyboardStatus(true) })
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <Container>
      <Body type={keyboardStatus}>

        {keyboardStatus &&
          <ContainerLogo>
            <Logo source={require('../../assets/imgs/partnership.png')} />
            <LogoTitle>Regra Conect</LogoTitle>
          </ContainerLogo>
        }

        <ContainerInput>

          <Title>Faça login para continuar</Title>

          <Input
            type='cpf'
            onChangeText={onChangeCPF}
            value={cpf}
            placeholder='CPF'
            secureTextEntry={false}
            iconNameLeft='person-outline'
            iconLeft={true}
            iconNameRight='default'
            iconRight={false}
            onPress={handleKeyVisible}
          />

          <Input
            type='senha'
            onChangeText={onChangePassword}
            value={password}
            placeholder='Senha'
            secureTextEntry={keyVisible ? true : false}
            iconNameLeft='lock-open-outline'
            iconLeft={true}
            iconNameRight={keyVisible ? 'eye-off-outline' : 'eye-outline'}
            iconRight={true}
            onPress={handleKeyVisible}
          />

          <ButtonForgotUse onPress={handleForgotUser} disabled={buttonDisable}>
            <ForgotUseTitle>Esqueceu a senha?</ForgotUseTitle>
          </ButtonForgotUse>
          <Button color={cpf.length === 14 ? password.length >= 3 ? true : false : false} title='Entrar' onPress={() => handleSignIn()} disabled={buttonDisable} />
        </ContainerInput>

        {keyboardStatus &&
          <Version>Versão: 1.0.0</Version>
        }

      </Body>
    </Container>
  )
}

export default SignIn;