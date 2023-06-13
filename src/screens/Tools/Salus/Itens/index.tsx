import React, { useEffect, useState } from 'react';
import { ScrollView, Switch, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
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
  RowItem,
  ContainerModal,
  BodyModal,
  TitleModal,
  IconBody,
  ItemModal,
  QtdModal,
  IconModalClose,
  ContainerTitleModal,
  ContainerIconModal,
  ContainerTitleAlert,
  TitleAlert
} from './styles';

// contexts
import { useLoading } from '../../../../contexts/loading';
import { useSalus } from '../../../../contexts/salus';
// >

// components
import HeaderStack from '../../../../components/HeaderStack';
import Dropdown from '../../../../components/Salus/Dropdown';
import Button from '../../../../components/Button';
// >

const SalusItens: React.FC = () => {

  type T = {
    buttonDisable: boolean,
    itensFilter: object | any,
    modalVisible: boolean,
    itemSelected: object | any,
    sizeSelected: object | any
  }

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { data, checkItens, checkItensData } = useSalus();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    itensFilter: [],
    modalVisible: false,
    itemSelected: null,
    sizeSelected: null
  })

  const [isEnabled, setIsEnabled] = useState(false);

  function editItem(idItem: number) {
    const result = dataLocal.itensFilter.filter((item: { id: number }) => (item.id == idItem));
    setDataLocal({
      ...dataLocal,
      modalVisible: true,
      itemSelected: result[0],
      sizeSelected: result[0].medida
    });
  }

  function remove(idItem: number) {
    const result = dataLocal.itensFilter.filter((item: { id: number }) => (item.id == idItem));
    result[0].quantidade = result[0].quantidade == 0 ? 0 : result[0].quantidade - 1
    setDataLocal({
      ...dataLocal,
      itensFilter: dataLocal.itensFilter
    });
  }

  function add(idItem: number) {
    const result = dataLocal.itensFilter.filter((item: { id: number }) => (item.id == idItem));
    result[0].quantidade = result[0].quantidade == result[0].disponivel ? result[0].quantidade : result[0].quantidade + 1
    setDataLocal({
      ...dataLocal,
      itensFilter: dataLocal.itensFilter
    });
  }

  function toggleSwitch() {
    setIsEnabled(previousState => !previousState);
    const status = isEnabled ? 'ADMISSAO' : 'TROCA'
    const result = data.itens.filter((item: { tipo: string }) => (item.tipo == status));
    setDataLocal({
      ...dataLocal,
      itensFilter: result
    });
  }

  useEffect(() => {
    function toggleSwitchUpdate() {
      const status = isEnabled ? 'TROCA' : 'ADMISSAO'
      const result = data.itens.filter((item: { tipo: string }) => (item.tipo == status));
      setDataLocal({
        ...dataLocal,
        itensFilter: result
      });
    }

    toggleSwitchUpdate()
  }, [])

  function handleSizeSelected(val: string | any, idItem: number) {
    const result = dataLocal.itensFilter.filter((item: { id: number }) => (item.id == idItem));
    result[0].medida = val.value
    result[0].medidaLabel = val.label
    setDataLocal({
      ...dataLocal,
      itensFilter: dataLocal.itensFilter
    });
  }

  function handlecontinue() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true
    });
    handleModalLoading(true);

    const result = dataLocal.itensFilter.filter((item: { quantidade: number }) => (item.quantidade != 0));

    if (result.length == 0) {
      Alert.alert('', 'Adicione um item para continuar.')
    } else {
      const resultSize = result.filter((item: { medida: number }) => (item.medida == null));
      if (resultSize.length !== 0) {
        Alert.alert('', 'Escolha o tamanho de cada item selecionado para continuar.')
      } else {
        checkItens(result)
        navigation.navigate('SalusResume');
      }
    }

    handleModalLoading(false);
    setDataLocal({
      ...dataLocal,
      buttonDisable: false
    });

  };

  return (
    <Container>

      <HeaderStack title='Itens' goBack={() => navigation.goBack()} disabled={false} />

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
          <Title>{isEnabled ? 'TROCA' : 'ADMISSAO'}</Title>
          <Switch
            trackColor={{ false: "#A3A3A3", true: "#A3A3A3" }}
            thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#A3A3A3"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </ContainerType>

        <BodyItem>
          <ScrollView showsVerticalScrollIndicator={false}>

            {dataLocal.itensFilter.map((item: { id: number, descricao: string, medida: string, medidaLabel: string, disponivel: number, quantidade: number }, index: number) => (
              <Item key={index} onPress={() => editItem(item.id)}>
                <RowItem>
                  <Title>{item.descricao}</Title>
                  {item.quantidade == 0 ? (
                    <Icon name='options-outline' size={30} color='#676F85' />
                  ) : (
                    <Icon name='create-outline' size={30} color='#97C93A' />
                  )}
                </RowItem>
                <Title><TitleSub>Medida: </TitleSub>{item.medidaLabel ? item.medidaLabel : 'Selecione o tamanho'}</Title>
                <RowItem>
                  <Title><TitleSub>Disponível: </TitleSub>{item.disponivel}</Title>
                  <Title><TitleSub>Quantidade: </TitleSub>{item.quantidade}</Title>
                </RowItem>
              </Item>
            ))}

          </ScrollView>
        </BodyItem>

        <Modal
          animationType="fade"
          transparent={true}
          visible={dataLocal.modalVisible}
          onRequestClose={() => setDataLocal({
            ...dataLocal,
            modalVisible: false
          })}
        >

          <ContainerModal>
            <BodyModal>
              <TitleModal>
                <ContainerTitleModal>
                  <Title>{dataLocal.itemSelected ? dataLocal.itemSelected.descricao : 's/n'}</Title>
                </ContainerTitleModal>
                <ContainerIconModal>
                  <IconModalClose onPress={() => setDataLocal({
                    ...dataLocal,
                    modalVisible: false
                  })}>
                    <Icon name='close-outline' size={30} color='#676F85' />
                  </IconModalClose>
                </ContainerIconModal>
              </TitleModal>

              <ItemModal>
                <Title>Quantidade</Title>
                <QtdModal>
                  <IconBody onPress={() => remove(dataLocal.itemSelected ? dataLocal.itemSelected.id : 0)}>
                    <Icon name='remove-outline' size={30} color='#676F85' />
                  </IconBody>
                  <Title>{dataLocal.itemSelected ? dataLocal.itemSelected.quantidade : 0}</Title>
                  <IconBody onPress={() => add(dataLocal.itemSelected ? dataLocal.itemSelected.id : 0)}>
                    <Icon name='add-outline' size={30} color='#676F85' />
                  </IconBody>
                </QtdModal>
              </ItemModal>

              <ContainerTitleAlert>
                <TitleAlert>Disponível: {dataLocal.itemSelected ? dataLocal.itemSelected.disponivel : 's/n'}</TitleAlert>
              </ContainerTitleAlert>

              <Dropdown
                search={false}
                title='Tamanho'
                data={data.size}
                value={dataLocal.sizeSelected}
                onChange={(val: string) => handleSizeSelected(val, dataLocal.itemSelected ? dataLocal.itemSelected.id : 0)}
              />

            </BodyModal>
          </ContainerModal>

        </Modal>

        <ButtonContainer>
          <Button color={true} title='Continuar' onPress={() => handlecontinue()} disabled={dataLocal.buttonDisable} />
        </ButtonContainer>

      </Body>



    </Container >
  )
}

export default SalusItens;