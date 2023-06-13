import React, { useState, useEffect } from 'react';
import { ScrollView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Body,
  ButtonContainer
} from './styles';

// contexts
import { useLoading } from '../../../contexts/loading';
import { useAuth } from '../../../contexts/auth';
import { useProfile } from '../../../contexts/profile';
// >

// components
import HeaderStackWithHelp from '../../../components/HeaderStackWithHelp';
import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button';
import InputMask from '../../../components/InputMask';
import InputMaskLarger from '../../../components/InputMaskLarger';
// >

// date
import { children, vehicle, preference } from '../../../data/about';
import { yesNot } from '../../../data/question';
// >

// services
import { saveProfile } from '../../../services/saveProfile';
// >

type T = {
  buttonDisable: boolean,
  children: number | any,
  vehicle: string | any,
  savings: string | any,
  preference: string | any,
  books: string | any,
  about: string | any
}

const AboutMe: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { data } = useProfile();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    children: data.QtdFilhos,
    vehicle: data.PossuiVeiculo,
    savings: data?.PPoupanca,
    preference: data?.OquePrefere,
    books: data?.LivrosLidos,
    about: data?.Sobre
  })

  async function handlesaveProfile() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true
    });
    handleModalLoading(true);

    data.QtdFilhos = dataLocal.children;
    data.PossuiVeiculo = dataLocal.vehicle;
    data.PPoupanca = dataLocal.savings;
    data.OquePrefere = dataLocal.preference;
    data.LivrosLidos = dataLocal.books;
    data.Sobre = dataLocal.about;

    let res = await saveProfile(user?.CPF, data)

    if (res.data === 200) {
      navigation.goBack()
      setTimeout(() => {
        handleModalLoading(false);
        setDataLocal({
          ...dataLocal,
          buttonDisable: false
        });
      }, 300);
    } else {
      handleModalLoading(false);
      setDataLocal({
        ...dataLocal,
        buttonDisable: false
      });
    }

  }

  function handleChildren(val: string | any) {
    setDataLocal({
      ...dataLocal,
      children: val.value,
    })
  }

  function handleVehicle(val: string | any) {
    setDataLocal({
      ...dataLocal,
      vehicle: val.value,
    })
  }

  function handleSavings(val: string | any) {
    setDataLocal({
      ...dataLocal,
      savings: val.value,
    })
  };

  function handlePreference(val: string | any) {
    setDataLocal({
      ...dataLocal,
      preference: val.value,
    })
  };

  function handleBooks(val: string | any) {
    setDataLocal({
      ...dataLocal,
      books: val.length < 1 ? null : val
    })
  };

  function handleAbout(val: string | any) {
    setDataLocal({
      ...dataLocal,
      about: val.length < 1 ? null : val
    })
  };

  const [keyboardStatus, setKeyboardStatus] = useState(true);

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

      <HeaderStackWithHelp title='Sobre' informativeText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' goBack={() => navigation.goBack()} disabled={dataLocal.buttonDisable} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>

          {keyboardStatus &&
            <>
              <Dropdown
                search={false}
                title='Quantidade de filhos'
                data={children}
                value={dataLocal.children}
                onChange={handleChildren}
              />

              <Dropdown
                search={false}
                title='Possui Veículo?'
                data={vehicle}
                value={dataLocal.vehicle}
                onChange={handleVehicle}
              />

              <Dropdown
                search={false}
                title='Possui poupança?'
                data={yesNot}
                value={dataLocal.savings}
                onChange={handleSavings}
              />

              <Dropdown
                search={false}
                title='O que prefere?'
                data={preference}
                value={dataLocal.preference}
                onChange={handlePreference}
              />
            </>
          }

          <InputMask
            title='Livros que já leu?'
            value={dataLocal.books}
            onChange={handleBooks}
            maxLength={500}
          />

          <InputMaskLarger
            title='Sobre'
            value={dataLocal.about}
            onChange={handleAbout}
          />

          <ButtonContainer>
            <Button color={true} title='Salvar' onPress={() => handlesaveProfile()} disabled={dataLocal.buttonDisable} />
          </ButtonContainer>

        </Body>
      </ScrollView>
    </Container>
  )
}

export default AboutMe;