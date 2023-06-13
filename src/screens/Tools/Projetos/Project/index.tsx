import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Body,
  ModalContainer,
  ModalBody,
  Title,
  SubTitle,
  SubTitleSmall,
  ModalTitleContainer,
  ModalTitleBody,
  ModalIconBody,
  ModalIcon,
  ModalInfoContainer,
  ModalInfoBody,
  Note,
  NoteTitle,
  NoteContainer,
  NoteBody,
  NoteBodyName,
  NoteName,
  NoteBodyTime,
  NoteTime,
  NoteUser,
  ModalAddActionContainer,
  ModalTypeSwitch,
  ModalButton
} from './styles';

// contexts
import { useLoading } from '../../../../contexts/loading';
import { useAuth } from '../../../../contexts/auth';
import { useProjetos } from '../../../../contexts/projetos';
// >

// components
import HeaderStack from '../../../../components/HeaderStack';
import ProjectInfo from '../../../../components/Projetos/ProjectInfo';
import HeaderButtons from '../../../../components/Projetos/HeaderButtons';
import Input from '../../../../components/Projetos/Input';
import Button from '../../../../components/Button';
// >

// services
import { projectSaveNote } from '../../../../services/Projetos/projectSaveNote';
import { projectNoteRefresh } from '../../../../services/Projetos/projectNoteRefresh';
// >

const ProjectMain: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { projectApontamentosRefresh, resultBuscaProjeto, resultBuscaProjetoUsuarios, resultApontamentos } = useProjetos();

  type T = {
    buttonDisable: boolean;
    modalProjectInfo: boolean;
    modalAddAction: boolean;
  };

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    modalProjectInfo: false,
    modalAddAction: false
  });

  const [isEnabledTipo, setIsEnabledTipo] = useState(false);
  const [description, onChangeDescription] = React.useState(null);
  const toggleSwitch = () => setIsEnabledTipo(previousState => !previousState);

  async function handleAddAction() {

    if (!description) { return Alert.alert('', 'Preencha o campo descrição para continuar.') };

    setDataLocal({ ...dataLocal, buttonDisable: true, modalAddAction: false });
    handleModalLoading(true);

    let res = await projectSaveNote(user?.Id, resultBuscaProjeto.Id, description, isEnabledTipo ? 'P' : 'E');

    if (res.data) {

      // resultApontamentos.unshift({
      //   Id: parseInt(res.data),
      //   Descricao: description,
      //   Tipo: isEnabledTipo ? 'P' : 'E',
      //   NomeCompleto: user?.NomeCompleto,
      //   Tempo: 'Agora'
      // });

      // projectApontamentosRefresh([...resultApontamentos]);

      setTimeout(() => {
        handleModalLoading(false);
        setDataLocal({ ...dataLocal, buttonDisable: false, modalAddAction: false });
        setIsEnabledTipo(false);
        onChangeDescription(null);
      }, 2000)

    } else {

      handleModalLoading(false);
      setDataLocal({ ...dataLocal, buttonDisable: false, modalAddAction: true });

    }

  };

  async function handleCollaborator() {
    setDataLocal({ ...dataLocal, buttonDisable: true });
    navigation.navigate('Collaborator');
    setDataLocal({ ...dataLocal, buttonDisable: false });
  };

  function formatDate(date: string) {
    const dateTime = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('pt-BR').format(dateTime);
    return formattedDate;
  };

  async function handleNoteRefresh() {
    const maxId = resultApontamentos.length ? Math.max(...resultApontamentos.map((item: { Id: any; }) => item.Id)) : 0;
    const res = await projectNoteRefresh(resultBuscaProjeto.Id, maxId);

    if (res.data.length) {
      res.data.forEach((item: object) => {
        resultApontamentos.unshift(item);
      });
      projectApontamentosRefresh([...resultApontamentos]);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNoteRefresh()
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>

      <HeaderStack title='Projeto' goBack={() => navigation.goBack()} disabled={false} />

      <Body>

        <ProjectInfo
          title={resultBuscaProjeto.Titulo_Projeto}
          onPress={() => setDataLocal({ ...dataLocal, modalProjectInfo: true })}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={dataLocal.modalProjectInfo}
          onRequestClose={() => setDataLocal({ ...dataLocal, modalProjectInfo: false })}
        >
          <ModalContainer>
            <ModalBody>
              <ModalTitleContainer>
                <ModalTitleBody>
                  <Title>{resultBuscaProjeto.Titulo_Projeto}</Title>
                </ModalTitleBody>
                <ModalIconBody>
                  <ModalIcon onPress={() => setDataLocal({ ...dataLocal, modalProjectInfo: false })}>
                    <Icon name='close-outline' size={30} color='#676F85' />
                  </ModalIcon>
                </ModalIconBody>
              </ModalTitleContainer>
              <ModalInfoContainer>
                <ModalInfoBody>
                  <SubTitleSmall>Anfitrião: <SubTitle>{resultBuscaProjeto.NomeCompleto}</SubTitle></SubTitleSmall>
                </ModalInfoBody>
                <SubTitleSmall>Criado: <SubTitle>{formatDate(resultBuscaProjeto.Data_Cadastro)}</SubTitle></SubTitleSmall>
                <SubTitleSmall>Área: <SubTitle>{resultBuscaProjeto.Area_Negocio}</SubTitle></SubTitleSmall>
                <SubTitleSmall>Atividade: <SubTitle>{resultBuscaProjeto.Atividade_Negocio}</SubTitle></SubTitleSmall>
                <SubTitleSmall>Descrição: <SubTitle>{resultBuscaProjeto.Descricao_Projeto}</SubTitle></SubTitleSmall>
              </ModalInfoContainer>
            </ModalBody>
          </ModalContainer>
        </Modal>

        <HeaderButtons
          collaborators={resultBuscaProjetoUsuarios.length}
          onPressLeft={() => setDataLocal({ ...dataLocal, modalAddAction: true })}
          onPressRight={handleCollaborator}
          disabled={false}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={dataLocal.modalAddAction}
          onRequestClose={() => setDataLocal({ ...dataLocal, modalAddAction: false })}
        >
          <ModalAddActionContainer>
            <ModalBody>
              <ModalTitleContainer>
                <ModalTitleBody>
                  <Title>Apontamento</Title>
                </ModalTitleBody>
                <ModalIconBody>
                  <ModalIcon onPress={() => setDataLocal({ ...dataLocal, modalAddAction: false })}>
                    <Icon name='close-outline' size={30} color='#676F85' />
                  </ModalIcon>
                </ModalIconBody>
              </ModalTitleContainer>
              <ModalInfoContainer>

                <ModalTypeSwitch>
                  <Title>{isEnabledTipo ? 'Problema' : 'Expectativa'}</Title>
                  <Switch
                    trackColor={{ false: "#97C93A", true: "#F03B3F" }}
                    thumbColor={isEnabledTipo ? "#ffffff" : "#ffffff"}
                    ios_backgroundColor="#97C93A"
                    onValueChange={toggleSwitch}
                    value={isEnabledTipo}
                  />
                </ModalTypeSwitch>

                <Input
                  title='Descrição'
                  value={description}
                  onChange={onChangeDescription}
                  maxLength={300}
                />

                <ModalButton>
                  <Button color={true} title='Salvar' onPress={handleAddAction} disabled={dataLocal.buttonDisable} />
                </ModalButton>

              </ModalInfoContainer>
            </ModalBody>
          </ModalAddActionContainer>
        </Modal>

        {resultApontamentos.length !== 0 &&
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}>
            <Note>

              <NoteTitle>Expectativas:</NoteTitle>

              {resultApontamentos.map((item: { Descricao: string, Tipo: string, NomeCompleto: string, Tempo: string }, index: number) => (
                item.Tipo == 'E' &&
                <NoteContainer key={index}>
                  <NoteBody>
                    <NoteBodyName>
                      <NoteName color={true}>{item.Descricao}</NoteName>
                    </NoteBodyName>
                    <NoteBodyTime>
                      <NoteTime>{item.Tempo}</NoteTime>
                    </NoteBodyTime>
                  </NoteBody>
                  <NoteUser>{item.NomeCompleto}</NoteUser>
                </NoteContainer>
              ))}

              <NoteTitle>Problemas:</NoteTitle>

              {resultApontamentos.map((item: { Descricao: string, Tipo: string, NomeCompleto: string, Tempo: string }, index: number) => (
                item.Tipo == 'P' &&
                <NoteContainer key={index}>
                  <NoteBody>
                    <NoteBodyName>
                      <NoteName color={false}>{item.Descricao}</NoteName>
                    </NoteBodyName>
                    <NoteBodyTime>
                      <NoteTime>{item.Tempo}</NoteTime>
                    </NoteBodyTime>
                  </NoteBody>
                  <NoteUser>{item.NomeCompleto}</NoteUser>
                </NoteContainer>
              ))}

            </Note>
          </ScrollView>
        }
        
      </Body>

    </Container>
  )
}

export default ProjectMain;