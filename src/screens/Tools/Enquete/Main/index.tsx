import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Modal, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Body,
  Title,
  ContainerItem,
  Item,
  ItemContainerTitle,
  ItemTitle,
  ItemSubTitle,
  ItemNumberTitle,
  ContainerNext,
  ModalAddActionContainer,
  ModalBody,
  ModalTitleContainer,
  ModalTitleBody,
  ModalTitle,
  ModalIconBody,
  ModalIcon,
  ModalInfoContainer,
  ModalButton
} from './styles';

// contexts
import { useLoading } from '../../../../contexts/loading';
import { useAuth } from '../../../../contexts/auth';
import { useProjetos } from '../../../../contexts/projetos';
import { useEnquete } from '../../../../contexts/enquete';
// >

// components
import ToolInfo from '../../../../components/ToolInfo';
import CallError from '../../../../components/CallError';
import Skeleton from '../../../../components/Skeleton';
import HeaderStack from '../../../../components/HeaderStack';
import Next from '../../../../components/Enquete/Next';
import TwoButtons from '../../../../components/TwoButtons';
import InputGray from '../../../../components/Enquete/InputGray';
import Button from '../../../../components/Button';
// >

// services
import { listPoll } from '../../../../services/Enquete/listPoll';
import { listOptions } from '../../../../services/Enquete/listOptions';
import { listOptionsWithCode } from '../../../../services/Enquete/listOptionsWithCode';
// >

type T = {
  buttonDisable: boolean,
  callErrorScreen: boolean,
  loading: boolean,
  loadingModalAcessPoll: boolean,
  modalAcessPoll: boolean,
  codAcessPoll: string,
  listPolls: object | any
}

const SurveyMain: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { data, handleButtonDisable, pollSelected } = useEnquete();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    callErrorScreen: false,
    loading: true,
    loadingModalAcessPoll: false,
    modalAcessPoll: false,
    codAcessPoll: '',
    listPolls: []
  })

  async function handlePolls() {

    handleButtonDisable(true);
    setDataLocal({
      ...dataLocal,
      buttonDisable: true,
      callErrorScreen: false,
      loading: true
    })

    if (user) {

      let res = await listPoll(user?.Id);

      if (!res.data) {
        handleButtonDisable(false);
        setDataLocal({
          ...dataLocal,
          callErrorScreen: true,
          loading: true,
          buttonDisable: false,
          listPolls: []
        })
      } else {
        handleButtonDisable(false);
        setDataLocal({
          ...dataLocal,
          callErrorScreen: false,
          loading: false,
          buttonDisable: false,
          listPolls: res.data
        })
      }

    }

  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handlePolls();
    })

    return unsubscribe
  }, [navigation])

  async function handleAccessPoll(value: any) {

    handleButtonDisable(true);
    handleModalLoading(true);

    if (user) {
      let res = await listOptions(user.Id, value.Id);

      if (res.data) {
        pollSelected(value, res.data);
        handleModalLoading(false);
        handleButtonDisable(false);
        navigation.navigate('AccessPoll');
      } else {
        handleModalLoading(false);
        handleButtonDisable(false);
      }
    }

  };

  const dataToolInfo = [
    { label: 'Interagir com o público e obter feedback sobre diferentes tópicos;', value: 1 }
  ]

  function handleCreatePoll() {
    handleButtonDisable(true);
    navigation.navigate('CreatePoll');
    setTimeout(() => {
      handleButtonDisable(false);
    }, 1000)
  };

  function handleModalAcessPoll(value: boolean) {
    handleButtonDisable(true);
    setDataLocal({ ...dataLocal, modalAcessPoll: value });
    setTimeout(() => {
      handleButtonDisable(false);
    }, 1000)
  };

  function handleCodAcessPoll(value: string) {
    setDataLocal({ ...dataLocal, codAcessPoll: value });
  };

  async function handleAccessPollWithCode() {

    if (!dataLocal.codAcessPoll) { return Alert.alert('', 'Digite o código de acesso para continuar.') };

    handleButtonDisable(true);
    setDataLocal({ ...dataLocal, loadingModalAcessPoll: true });

    if (user) {
      let res = await listOptionsWithCode(user.Id, parseInt(dataLocal.codAcessPoll));

      if (res.data) {
        pollSelected(res.data.poll, res.data.options);
        handleModalAcessPoll(false);
        navigation.navigate('AccessPoll');
        setDataLocal({ ...dataLocal, loadingModalAcessPoll: false, modalAcessPoll: false });
      } else {
        handleButtonDisable(false);
        setDataLocal({ ...dataLocal, loadingModalAcessPoll: false });
      }
    }

  };

  return (
    <Container>

      <HeaderStack title='Enquete' goBack={() => navigation.goBack()} disabled={data.buttonDisable} />

      {dataLocal.callErrorScreen ? (
        <CallError onPress={handlePolls} disabled={data.buttonDisable} />
      ) : (
        <>
          {dataLocal.loading ? (
            <Body>
              <Skeleton w={'100%'} h={'20px'} r={'10px'} />
              <Skeleton w={'100%'} h={'245px'} r={'10px'} />
              <Skeleton w={'100%'} h={'20px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
            </Body>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>

              <Body>

                <ToolInfo
                  title='Pesquisa ou questionário feito para coletar opiniões ou informações.'
                  subTitle={dataToolInfo}
                  img={3}
                />

                {dataLocal.listPolls.length !== 0 ? (
                  <>
                    <Title>Lista de enquetes:</Title>
                    {
                      dataLocal.listPolls.map((item: { Apelido: string, CodigoAcesso: number }, index: number) => (
                        <ContainerItem key={index}>
                          <Item onPress={() => handleAccessPoll(item)} disabled={false}>
                            <ItemContainerTitle>
                              <ItemSubTitle>Código de acesso: <ItemTitle>{item.CodigoAcesso}</ItemTitle></ItemSubTitle>
                              <ItemSubTitle>Anfitrião: <ItemNumberTitle>{item.Apelido}</ItemNumberTitle></ItemSubTitle>
                            </ItemContainerTitle>
                            <ContainerNext>
                              <Next />
                            </ContainerNext>
                          </Item>
                        </ContainerItem>
                      ))
                    }
                  </>
                ) : (
                  <>
                    <Title>Lista de enquetes:</Title>
                    <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                      <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={require('../../../../assets/imgs/conjunto-vazio.png')} />
                    </View>
                  </>
                )}

              </Body>
            </ScrollView>
          )}
          <TwoButtons
            titleOne='Criar'
            titleTwo='Entrar'
            onPressOne={handleCreatePoll}
            onPressTwo={() => handleModalAcessPoll(true)}
            disabled={data.buttonDisable}
          />
        </>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={dataLocal.modalAcessPoll}
        onRequestClose={() => handleModalAcessPoll(false)}
      >
        <ModalAddActionContainer>
          {dataLocal.loadingModalAcessPoll ? (
            <ModalBody>
              <ActivityIndicator size="large" color="#404040" />
            </ModalBody>
          ) : (
            <ModalBody>

              <ModalTitleContainer>
                <ModalTitleBody>
                  <ModalTitle>Acessar enquete</ModalTitle>
                </ModalTitleBody>
                <ModalIconBody>
                  <ModalIcon onPress={() => handleModalAcessPoll(false)}>
                    <Icon name='close-outline' size={30} color='#676F85' />
                  </ModalIcon>
                </ModalIconBody>
              </ModalTitleContainer>

              <ModalInfoContainer>

                <InputGray
                  title='Código da enquete'
                  value={dataLocal.codAcessPoll}
                  onChange={handleCodAcessPoll}
                  maxLength={4}
                />

                <ModalButton>
                  <Button color={true} title='Continuar' onPress={handleAccessPollWithCode} disabled={false} />
                </ModalButton>

              </ModalInfoContainer>
            </ModalBody>
          )}
        </ModalAddActionContainer>
      </Modal>

    </Container >
  )
}

export default SurveyMain;