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
import { score } from '../../../data/evaluation';
// >

// services
import { saveProfile } from '../../../services/saveProfile';
// >

type T = {
  buttonDisable: boolean,
  teamPerformance: number | any,
  leadershipPerformance: number | any,
  yourPerformance: number | any,
}

const Performance: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { data } = useProfile();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    teamPerformance: data.DesempenhoColegas,
    leadershipPerformance: data?.DesempenhoLideranca,
    yourPerformance: data?.SeuDesempenho
  })

  async function handlesaveProfile() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true
    });
    handleModalLoading(true);

    data.DesempenhoColegas = dataLocal.teamPerformance;
    data.DesempenhoLideranca = dataLocal.leadershipPerformance;
    data.SeuDesempenho = dataLocal.yourPerformance;

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

  function handleTeamPerformance(val: string | any) {
    setDataLocal({
      ...dataLocal,
      teamPerformance: val.value,
    })
  }

  function handleLeadershipPerformance(val: number | any) {
    setDataLocal({
      ...dataLocal,
      leadershipPerformance: val.value,
    })
  }

  function handleYourPerformance(val: number | any) {
    setDataLocal({
      ...dataLocal,
      yourPerformance: val.value,
    })
  };

  return (
    <Container>

      <HeaderStackWithHelp title='Desempenho' informativeText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' goBack={() => navigation.goBack()} disabled={dataLocal.buttonDisable} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>

          <Dropdown
            search={false}
            title='Desempenho da equipe'
            data={score}
            value={dataLocal.teamPerformance}
            onChange={handleTeamPerformance}
          />

          <Dropdown
            search={false}
            title='Desempenho da liderança'
            data={score}
            value={dataLocal.leadershipPerformance}
            onChange={handleLeadershipPerformance}
          />

          <Dropdown
            search={false}
            title='O seu desempenho'
            data={score}
            value={dataLocal.yourPerformance}
            onChange={handleYourPerformance}
          />

          <ButtonContainer>
            <Button color={true} title='Salvar' onPress={() => handlesaveProfile()} disabled={dataLocal.buttonDisable} />
          </ButtonContainer>

        </Body>
      </ScrollView>
    </Container>
  )
}

export default Performance;