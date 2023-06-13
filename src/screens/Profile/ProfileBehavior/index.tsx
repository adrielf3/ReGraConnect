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
import { typePerson, problemSolutin, decisionMaking } from '../../../data/behavior';
import { yesNot } from '../../../data/question';
// >

// services
import { saveProfile } from '../../../services/saveProfile';
// >

type T = {
  buttonDisable: boolean,
  typePerson: string | any,
  feedback: string | any,
  changes: string | any,
  decisions: string | any,
  problemSolutin: string | any,
  decisionMaking: string | any,
  career: string | any,
}

const Behavior: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { data } = useProfile();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    typePerson: data?.SeConsidera,
    feedback: data?.RFeedback,
    changes: data?.GostaMudancas,
    decisions: data?.GostaDecisoes,
    problemSolutin: data?.ResolverProblemas,
    decisionMaking: data?.TomadaDecisoes,
    career: data?.CarreiraEmpresa
  })

  async function handlesaveProfile() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true
    });
    handleModalLoading(true);

    data.SeConsidera = dataLocal.typePerson;
    data.RFeedback = dataLocal.feedback;
    data.GostaMudancas = dataLocal.changes;
    data.GostaDecisoes = dataLocal.decisions;
    data.ResolverProblemas = dataLocal.problemSolutin;
    data.TomadaDecisoes = dataLocal.decisionMaking;
    data.CarreiraEmpresa = dataLocal.career;

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

  function handleTypePerson(val: string | any) {
    setDataLocal({
      ...dataLocal,
      typePerson: val.value,
    })
  }

  function handleFeedback(val: string | any) {
    setDataLocal({
      ...dataLocal,
      feedback: val.value,
    })
  }

  function handleChanges(val: string | any) {
    setDataLocal({
      ...dataLocal,
      changes: val.value,
    })
  };

  function handleDecisions(val: string | any) {
    setDataLocal({
      ...dataLocal,
      decisions: val.value,
    })
  };

  function handleProblemSolutin(val: string | any) {
    setDataLocal({
      ...dataLocal,
      problemSolutin: val.value,
    })
  };

  function handleDecisionMaking(val: string | any) {
    setDataLocal({
      ...dataLocal,
      decisionMaking: val.value,
    })
  };

  function handleCareer(val: string | any) {
    setDataLocal({
      ...dataLocal,
      career: val.value,
    })
  };

  return (
    <Container>

      <HeaderStackWithHelp title='Comportamento' informativeText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' goBack={() => navigation.goBack()} disabled={dataLocal.buttonDisable} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>

          <Dropdown
            search={false}
            title='Você se considera'
            data={typePerson}
            value={dataLocal.typePerson}
            onChange={handleTypePerson}
          />

          <Dropdown
            search={false}
            title='Gosta de receber feedback?'
            data={yesNot}
            value={dataLocal.feedback}
            onChange={handleFeedback}
          />

          <Dropdown
            search={false}
            title='Gosta de mudanças?'
            data={yesNot}
            value={dataLocal.changes}
            onChange={handleChanges}
          />

          <Dropdown
            search={false}
            title='Gosta de tomar decisões?'
            data={yesNot}
            value={dataLocal.decisions}
            onChange={handleDecisions}
          />

          <Dropdown
            search={false}
            title='Para novos problemas, você tende a'
            data={problemSolutin}
            value={dataLocal.problemSolutin}
            onChange={handleProblemSolutin}
          />

          <Dropdown
            search={false}
            title='Em uma tomada de decisão você utiliza'
            data={decisionMaking}
            value={dataLocal.decisionMaking}
            onChange={handleDecisionMaking}
          />

          <Dropdown
            search={false}
            title='Seguir carreira na empresa?'
            data={yesNot}
            value={dataLocal.career}
            onChange={handleCareer}
          />

          <ButtonContainer>
            <Button color={true} title='Salvar' onPress={() => handlesaveProfile()} disabled={dataLocal.buttonDisable} />
          </ButtonContainer>

        </Body>
      </ScrollView>
    </Container>
  )
}

export default Behavior;