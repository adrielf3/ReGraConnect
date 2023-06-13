import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Body,
  Title,
  QuestionContainer,
  Question,
  PollCreatedBy,
  OptionContainer,
  OptionBody,
  OptionTitleContainer,
  OptionTitle,
  OptionIcon
} from './styles';

// context
import { useAuth } from '../../../../contexts/auth';
import { useEnquete } from '../../../../contexts/enquete';
// >

// components
import HeaderStack from '../../../../components/HeaderStack';
import Like from '../../../../components/Enquete/Like';
// >

// services
import { saveVote } from '../../../../services/Enquete/saveVote';
import { listOptions } from '../../../../services/Enquete/listOptions';
// >

const AccessPoll: React.FC = () => {

  const navigation = useNavigation();
  const { user } = useAuth();
  const { pollSelectedData, pollOptionsData, updatePoll } = useEnquete();

  async function handleVote(IdEnquete: number, IdOpcao: number) {


    const result1 = pollOptionsData.filter((item: { StatusUser: number }) => item.StatusUser == 1);
    if (result1.length !== 0) {
      
      result1[0].StatusUser = 0
    }

    const result2 = pollOptionsData.filter((item: { Id: number }) => (item.Id == IdOpcao));
    result2[0].StatusUser = 1

    updatePoll([...pollOptionsData])

    if (user) {
      await saveVote(IdEnquete, user.Id, IdOpcao);
    }

  }

  async function loadPoll() {

    if (user) {
      let res = await listOptions(user.Id, pollSelectedData.Id);
      if (res.data) {
        updatePoll([...res.data]);
      }
    }

  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadPoll();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>

      <HeaderStack title={String(pollSelectedData.CodigoAcesso)} goBack={() => navigation.goBack()} disabled={false} />

      <Body>

        <Title>Pergunta</Title>

        <QuestionContainer>
          <Question>{pollSelectedData.Enquete}</Question>
        </QuestionContainer>

        <PollCreatedBy>
          <Title>Por {pollSelectedData.Apelido} <Icon name='timer-outline' size={13} color='#676F85' /> {pollSelectedData.Dt_Operacao}</Title>
        </PollCreatedBy>

        <Title>Opções</Title>

        {pollOptionsData.map((item: { Id: number, Id_Enquete: number, Opcao: string, Perc: number, StatusUser: number }, index: number) => (
          <OptionContainer key={index}>

            {item.StatusUser == 1 ? (
              <OptionBody onPress={() => { }} disabled={false}>
                <OptionTitleContainer>
                  <OptionTitle>{item.Opcao}</OptionTitle>
                </OptionTitleContainer>
                <OptionIcon>
                  <Like perc={Number(item.Perc).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 })} statusUser={item.StatusUser} />
                </OptionIcon>
              </OptionBody>
            ) : (
              <OptionBody onPress={() => handleVote(item.Id_Enquete, item.Id)} disabled={false}>
                <OptionTitleContainer>
                  <OptionTitle>{item.Opcao}</OptionTitle>
                </OptionTitleContainer>
                <OptionIcon>
                  <Like perc={Number(item.Perc).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 })} statusUser={item.StatusUser} />
                </OptionIcon>
              </OptionBody>
            )}

          </OptionContainer>
        ))}

      </Body>

    </Container >
  )
}

export default AccessPoll;