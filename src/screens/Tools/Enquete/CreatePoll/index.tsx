import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Body,
  TitleContainer,
  Title,
  ButtonContainer
} from './styles';

// context
import { useAuth } from '../../../../contexts/auth';
// >

// components
import HeaderStack from '../../../../components/HeaderStack';
import InputQuestion from '../../../../components/Enquete/InputQuestion';
import InputOption from '../../../../components/Enquete/InputOption';
import Button from '../../../../components/Button';
// >

// services
import { savePoll } from '../../../../services/Enquete/savePoll';
// >

type T = {
  buttonDisable: boolean,
  question: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  option5: string
}


const CreatePoll: React.FC = () => {

  const navigation = useNavigation();
  const { user } = useAuth();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: ''
  });

  function handleQuestion(value: string) {
    setDataLocal({ ...dataLocal, question: value });
  };

  function handleOption1(value: string) {
    setDataLocal({ ...dataLocal, option1: value });
  };

  function handleOption2(value: string) {
    setDataLocal({ ...dataLocal, option2: value });
  };

  function handleOption3(value: string) {
    setDataLocal({ ...dataLocal, option3: value });
  };

  function handleOption4(value: string) {
    setDataLocal({ ...dataLocal, option4: value });
  };

  function handleOption5(value: string) {
    setDataLocal({ ...dataLocal, option5: value });
  };

  async function handleSave() {

    const opcoes = [
      {"id": 1, "opcao": dataLocal.option1},
      {"id": 2, "opcao": dataLocal.option2},
      {"id": 3, "opcao": dataLocal.option3},
      {"id": 4, "opcao": dataLocal.option4},
      {"id": 5, "opcao": dataLocal.option5}
    ];

    const result = opcoes.filter((item: { id: number, opcao: string }) => (item.opcao !== ''));

    if (!dataLocal.question) { return Alert.alert('', 'Faca uma pergunta para continuar.') };
    if (result.length < 2) { return Alert.alert('', 'Adicione no mínimo duas opções para salvar.') };

    if (user) {
      let res = await savePoll(user.IdEmpresaPadrao, user.Id, dataLocal.question, result);
      if (res) {
        navigation.goBack();
        Alert.alert('', 'Enquete criada com sucesso.')
      };
    };

  };

  return (
    <Container>

      <HeaderStack title='Criar enquete' goBack={() => navigation.goBack()} disabled={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>

          <InputQuestion
            title='Pergunta'
            value={dataLocal.question}
            onChange={handleQuestion}
            maxLength={100}
          />

          <TitleContainer>
            <Title>Opçōes</Title>
            <Title>2/5</Title>
          </TitleContainer>

          <InputOption
            value={dataLocal.option1}
            onChange={handleOption1}
            maxLength={100}
          />

          <InputOption
            value={dataLocal.option2}
            onChange={handleOption2}
            maxLength={100}
          />

          <InputOption
            value={dataLocal.option3}
            onChange={handleOption3}
            maxLength={100}
          />

          <InputOption
            value={dataLocal.option4}
            onChange={handleOption4}
            maxLength={100}
          />

          <InputOption
            value={dataLocal.option5}
            onChange={handleOption5}
            maxLength={100}
          />

        </Body>

      </ScrollView>

      <ButtonContainer>
        <Button color={true} title='Salvar' onPress={() => handleSave()} disabled={dataLocal.buttonDisable} />
      </ButtonContainer>

    </Container >
  )
}

export default CreatePoll;