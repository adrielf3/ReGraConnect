import React, { useState } from 'react';
import { ScrollView } from 'react-native';
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
// >

// date
import { yesNot, weekValue } from '../../../data/question';
// >

// services
import { saveProfile } from '../../../services/saveProfile';
// >

type T = {
  buttonDisable: boolean,
  drink: string | any,
  smoke: string | any,
  exercise: string | any,
  exerciseWeek: number | any
}

const Health: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { data } = useProfile();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    drink: data.Bebe,
    smoke: data?.Fuma,
    exercise: data?.AtvFisica,
    exerciseWeek: data?.QtdAtvFisicaSemana
  })

  async function handlesaveProfile() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true
    });
    handleModalLoading(true);

    data.Bebe = dataLocal.drink;
    data.Fuma = dataLocal.smoke;
    data.AtvFisica = dataLocal.exercise;
    data.QtdAtvFisicaSemana = dataLocal.exerciseWeek;

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

  function handleDrink(val: string | any) {
    setDataLocal({
      ...dataLocal,
      drink: val.value,
    })
  }

  function handleSmoke(val: number | any) {
    setDataLocal({
      ...dataLocal,
      smoke: val.value,
    })
  }

  function handleExercise(val: number | any) {
    setDataLocal({
      ...dataLocal,
      exercise: val.value,
    })
  };

  function handleExerciseWeek(val: number | any) {
    setDataLocal({
      ...dataLocal,
      exerciseWeek: val.value,
    })
  };

  return (
    <Container>
      
      <HeaderStackWithHelp title='Saúde' informativeText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' goBack={() => navigation.goBack()} disabled={dataLocal.buttonDisable} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>

          <Dropdown
            search={false}
            title='Ingere bebida alcoólica?'
            data={yesNot}
            value={dataLocal.drink}
            onChange={handleDrink}
          />

          <Dropdown
            search={false}
            title='Fumante?'
            data={yesNot}
            value={dataLocal.smoke}
            onChange={handleSmoke}
          />

          <Dropdown
            search={false}
            title='Exercita-se?'
            data={yesNot}
            value={dataLocal.exercise}
            onChange={handleExercise}
          />

          <Dropdown
            search={false}
            title='Se exercita quantas vezes por semana?'
            data={weekValue}
            value={dataLocal.exerciseWeek}
            onChange={handleExerciseWeek}
          />

          <ButtonContainer>
            <Button color={true} title='Salvar' onPress={() => handlesaveProfile()} disabled={dataLocal.buttonDisable} />
          </ButtonContainer>

        </Body>
      </ScrollView>
    </Container>
  )
}

export default Health;