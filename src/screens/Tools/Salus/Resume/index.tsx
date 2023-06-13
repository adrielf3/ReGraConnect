import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Body,
  ButtonContainer,
  BodyInfo,
  HeaderInfo,
  Title,
  TitleSub,
  ContainerType,
  BodyItem,
  Item,
  RowItem
} from './styles';

// contexts
import { useLoading } from '../../../../contexts/loading';
import { useAuth } from '../../../../contexts/auth';
import { useSalus } from '../../../../contexts/salus';
// >

// components
import HeaderStack from '../../../../components/HeaderStack';
import Button from '../../../../components/Button';
// >

// services
import { salusSave } from '../../../../services/Salus/salusSave';
// >

type T = {
  buttonDisable: boolean;
}

const SalusResume: React.FC = () => {

  type T2 = {
    goBack: any;
    pop: any;
  }

  const navigation = useNavigation<T2>();

  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { data, checkItensData } = useSalus();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false
  })

  async function handlecontinue() {

    if (!checkItensData) { return Alert.alert('', 'Não foi possível salvar.') }

    setDataLocal({
      ...dataLocal,
      buttonDisable: true
    });
    handleModalLoading(true);

    if (user) {

      let res = await salusSave(user?.IdEmpresaPadrao, user?.Id, data.idUser, data.officeId, data.requestPromax, checkItensData);

      if (res.data === 200) {
        navigation.pop(2);
        Alert.alert('', 'Requisição feita com sucesso!');
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

  };

  return (
    <Container>

      <HeaderStack title='Resumo' goBack={() => navigation.goBack()} disabled={false} />

      <Body>

        <BodyInfo>
          <Title><TitleSub>Nome: </TitleSub>{data?.userName}</Title>
          {data?.requestPromax ? (
            data?.requestPromax.length <= 14 ? (
              <HeaderInfo>
                <Title><TitleSub>Crachá: </TitleSub>{data?.badge}</Title>
                <Title><TitleSub>Requisição: </TitleSub>{data?.requestPromax}</Title>
              </HeaderInfo>
            ) : (
              <>
                <Title><TitleSub>Crachá: </TitleSub>{data?.badge}</Title>
                <Title><TitleSub>Requisição: </TitleSub>{data?.requestPromax}</Title>
              </>
            )
          ) : (
            <Title><TitleSub>Crachá: </TitleSub>{data?.badge}</Title>
          )}
          <Title><TitleSub>Função: </TitleSub>{data?.officeName}</Title>
        </BodyInfo>

        <ContainerType>
          <TitleSub>Itens selecionados:</TitleSub>
        </ContainerType>

        <BodyItem>
          <ScrollView showsVerticalScrollIndicator={false}>

            {checkItensData.map((item: { id: number, descricao: string, tipo: string, medidaLabel: string, quantidade: number }, index: number) => (
              <Item key={index}>
                <RowItem>
                  <Title>{item.descricao}</Title>
                  <Title><TitleSub>Medida: </TitleSub>{item.medidaLabel}</Title>
                </RowItem>
                <RowItem>
                  <Title><TitleSub>Tipo: </TitleSub>{item.tipo}</Title>
                  <Title><TitleSub>Quantidade: </TitleSub>{item.quantidade}</Title>
                </RowItem>
              </Item>
            ))}

          </ScrollView>
        </BodyItem>

        <ButtonContainer>
          <Button color={true} title='Salvar' onPress={() => handlecontinue()} disabled={dataLocal.buttonDisable} />
        </ButtonContainer>

      </Body>



    </Container >
  )
}

export default SalusResume;