import React, { useState, useEffect } from 'react';
import { ScrollView, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Body,
  ButtonContainer,
  ContainerTitleAlert,
  TitleAlert
} from './styles';

// contexts
import { useLoading } from '../../../../contexts/loading';
import { useAuth } from '../../../../contexts/auth';
import { useSalus } from '../../../../contexts/salus';
// >

// components
import ToolInfo from '../../../../components/ToolInfo';
import CallError from '../../../../components/CallError';
import Skeleton from '../../../../components/Skeleton';
import HeaderStack from '../../../../components/HeaderStack';
import InputMask from '../../../../components/InputMask';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
// >

// services
import { salusCharge } from '../../../../services/Salus/salusCharge';
import { salusRecipient } from '../../../../services/Salus/salusRecipient';
// >

type T = {
  buttonDisable: boolean,
  callErrorScreen: boolean,
  loading: boolean,
  charge: object,
  badge: number | null,
  officeId: number | null,
  officeName: string | null,
  requestPromax: number | null
}

const SalusMain: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { saveData } = useSalus();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    callErrorScreen: false,
    loading: false,
    charge: [],
    badge: null,
    officeId: null,
    officeName: null,
    requestPromax: null
  })

  async function handleSalusCharge() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true,
      callErrorScreen: false,
      loading: true,
    })

    let res = await salusCharge();

    if (!res.data) {
      setDataLocal({
        ...dataLocal,
        callErrorScreen: true,
        loading: true,
        buttonDisable: false,
        charge: []
      })
    } else {
      setDataLocal({
        ...dataLocal,
        callErrorScreen: false,
        loading: false,
        buttonDisable: false,
        charge: res.data
      })
    }

  }

  useEffect(() => {
    handleSalusCharge();
  }, []);

  function handleBadge(val: number | null) {
    setDataLocal({
      ...dataLocal,
      badge: val ? val : null
    })
  }

  function handleOffice(val: { value: number | null, label: string | null }) {
    setDataLocal({
      ...dataLocal,
      officeId: val ? val.value : null,
      officeName: val ? val.label : null
    })
  }

  function handleRequestPromax(val: number | null) {
    setDataLocal({
      ...dataLocal,
      requestPromax: val ? val : null
    })
  }

  async function handleContinue() {

    if (!dataLocal.badge) { return Alert.alert('', 'Digite o crachá para continuar.') }
    if (!dataLocal.officeId) { return Alert.alert('', 'Selecione um cargo para continuar.') }

    setDataLocal({ ...dataLocal, buttonDisable: true });
    handleModalLoading(true);

    if (user) {

      let res = await salusRecipient(user?.IdEmpresaPadrao, dataLocal.badge, dataLocal.officeId)

      if (res.data) {
        saveData(dataLocal.badge, dataLocal.officeId, dataLocal.officeName, dataLocal.requestPromax, res.data.idUser, res.data.cpf, res.data.userName, res.data.itens, res.data.size)
        navigation.navigate('SalusItens');
      }

    }
    setTimeout(() => {
      handleModalLoading(false);
      setDataLocal({ ...dataLocal, buttonDisable: false });
    }, 300);
  };

  const [keyboardStatus, setKeyboardStatus] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => { setKeyboardStatus(false) })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => { setKeyboardStatus(true) })
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, []);

  const dataToolInfo = [
    { label: 'O colaborador poderá solicitar seus uniformes e epis de acordo com a matriz;', value: 1 },
    { label: 'Gente e Gestão fará aprovação e controle do prazo de entrega;', value: 2 },
    { label: 'Almoxarifado terá segurança na entrega das requisições;', value: 3 }
  ]

  return (
    <Container>

      <HeaderStack title='Salus' goBack={() => navigation.goBack()} disabled={false} />

      {dataLocal.callErrorScreen ? (
        <CallError onPress={() => handleSalusCharge()} disabled={dataLocal.buttonDisable} />
      ) : (
        <>
          {dataLocal.loading ? (
            <Body>
              <Skeleton w={'100%'} h={'20px'} r={'10px'} />
              <Skeleton w={'100%'} h={'245px'} r={'10px'} />
              <Skeleton w={'100%'} h={'20px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'20px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'20px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
            </Body>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>

              <Body>
                {keyboardStatus &&
                  <ToolInfo
                    title='Plataforma destinada a gestao de Uniformes/EPI'
                    subTitle={dataToolInfo}
                    img={1}
                  />
                }
                <InputMask
                  title='Crachá'
                  value={dataLocal.badge}
                  onChange={handleBadge}
                  maxLength={10}
                />

                <Dropdown
                  search={false}
                  title='Função'
                  data={dataLocal.charge}
                  value={dataLocal.officeId}
                  onChange={handleOffice}
                />

                <InputMask
                  title='Requisição Promax'
                  value={dataLocal.requestPromax}
                  onChange={handleRequestPromax}
                  maxLength={50}
                />

                <ContainerTitleAlert>
                  <TitleAlert>Para mais código separar por vírgula.</TitleAlert>
                </ContainerTitleAlert>

                <ButtonContainer>
                  <Button color={true} title='Continuar' onPress={() => handleContinue()} disabled={dataLocal.buttonDisable} />
                </ButtonContainer>

              </Body>
            </ScrollView>
          )}
        </>
      )}

    </Container >
  )
}

export default SalusMain;