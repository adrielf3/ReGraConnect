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
import { shirtSize, pantsSize, shoeSize, height, weight } from '../../../data/measurements';
// >

// services
import { saveProfile } from '../../../services/saveProfile';
// >

type T = {
  buttonDisable: boolean,
  shirtSize: string | any,
  pantsSize: number | any,
  shoeSize: number | any,
  height: number | any,
  weight: number | any
}

const Measure: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { data } = useProfile();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    shirtSize: data?.TamanhoCamisa,
    pantsSize: data?.NCalca,
    shoeSize: data?.NCalcado,
    height: data?.Altura,
    weight: data?.Peso
  })

  async function handlesaveProfile() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true
    });
    handleModalLoading(true);

    data.TamanhoCamisa = dataLocal.shirtSize;
    data.NCalca = dataLocal.pantsSize;
    data.NCalcado = dataLocal.shoeSize;
    data.Altura = dataLocal.height;
    data.Peso = dataLocal.weight;

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

  function handleShirtSize(val: string | any) {
    setDataLocal({
      ...dataLocal,
      shirtSize: val.value,
    })
  }

  function handlePantsSize(val: number | any) {
    setDataLocal({
      ...dataLocal,
      pantsSize: val.value,
    })
  }

  function handleShoeSize(val: number | any) {
    setDataLocal({
      ...dataLocal,
      shoeSize: val.value,
    })
  };

  function handleHeight(val: number | any) {
    setDataLocal({
      ...dataLocal,
      height: val.value,
    })
  };

  function handleWeight(val: number | any) {
    setDataLocal({
      ...dataLocal,
      weight: val.value,
    })
  };

  return (
    <Container>

      <HeaderStackWithHelp title='Medidas' informativeText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' goBack={() => navigation.goBack()} disabled={dataLocal.buttonDisable} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>

          <Dropdown
            search={false}
            title='Camisa'
            data={shirtSize}
            value={dataLocal.shirtSize}
            onChange={handleShirtSize}
          />

          <Dropdown
            search={false}
            title='Calça'
            data={pantsSize}
            value={dataLocal.pantsSize}
            onChange={handlePantsSize}
          />

          <Dropdown
            search={false}
            title='Sapato'
            data={shoeSize}
            value={dataLocal.shoeSize}
            onChange={handleShoeSize}
          />

          <Dropdown
            search={false}
            title='Altura'
            data={height}
            value={dataLocal.height}
            onChange={handleHeight}
          />

          <Dropdown
            search={false}
            title='Peso'
            data={weight}
            value={dataLocal.weight}
            onChange={handleWeight}
          />

          <ButtonContainer>
            <Button color={true} title='Salvar' onPress={() => handlesaveProfile()} disabled={dataLocal.buttonDisable} />
          </ButtonContainer>

        </Body>
      </ScrollView>
    </Container>
  )
}

export default Measure;