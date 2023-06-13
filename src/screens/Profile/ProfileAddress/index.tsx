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
import InputMask from '../../../components/InputMask';
// >

// date
import { residence, liveWith, distance, time } from '../../../data/address';
// >

// services
import { saveProfile } from '../../../services/saveProfile';
// >

type T = {
  buttonDisable: boolean,
  district: string | any,
  residence: string | any,
  liveWith: string | any,
  distance: number | any,
  timeAddress: number | any,
  employmentTime: number | any,
}

const Performance: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { data } = useProfile();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    district: data.Bairro,
    residence: data.MoraCasa,
    liveWith: data?.MoraCom,
    distance: data?.DistEmpresa,
    timeAddress: data?.TempoMesmoEndereco,
    employmentTime: data?.TempoUltEmprego
  })

  async function handlesaveProfile() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true
    });
    handleModalLoading(true);

    data.Bairro = dataLocal.district;
    data.MoraCasa = dataLocal.residence;
    data.MoraCom = dataLocal.liveWith;
    data.DistEmpresa = dataLocal.distance;
    data.TempoMesmoEndereco = dataLocal.timeAddress;
    data.TempoUltEmprego = dataLocal.employmentTime;

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

  function handleDistrict(val: string | any) {
    setDataLocal({
      ...dataLocal,
      district: val.length < 1 ? null : val
    })
  }

  function handleResidence(val: string | any) {
    setDataLocal({
      ...dataLocal,
      residence: val.value,
    })
  }

  function handleLiveWith(val: number | any) {
    setDataLocal({
      ...dataLocal,
      liveWith: val.value,
    })
  }

  function handleDistance(val: number | any) {
    setDataLocal({
      ...dataLocal,
      distance: val.value,
    })
  };

  function handleTimeAddress(val: number | any) {
    setDataLocal({
      ...dataLocal,
      timeAddress: val.value,
    })
  };

  function handleEmploymentTime(val: number | any) {
    setDataLocal({
      ...dataLocal,
      employmentTime: val.value,
    })
  };

  return (
    <Container>

      <HeaderStackWithHelp title='Endereço' informativeText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' goBack={() => navigation.goBack()} disabled={dataLocal.buttonDisable} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>

          <InputMask
            title='Bairro'
            value={dataLocal.district}
            onChange={handleDistrict}
            maxLength={100}
          />

          <Dropdown
            search={false}
            title='Residência'
            data={residence}
            value={dataLocal.residence}
            onChange={handleResidence}
          />

          <Dropdown
            search={false}
            title='Mora com'
            data={liveWith}
            value={dataLocal.liveWith}
            onChange={handleLiveWith}
          />

          <Dropdown
            search={false}
            title='Distância da empresa'
            data={distance}
            value={dataLocal.distance}
            onChange={handleDistance}
          />

          <Dropdown
            search={false}
            title='Quantos anos no mesmo endereço'
            data={time}
            value={dataLocal.timeAddress}
            onChange={handleTimeAddress}
          />

          <Dropdown
            search={false}
            title='Quanto tempo ficou no último emprego'
            data={time}
            value={dataLocal.employmentTime}
            onChange={handleEmploymentTime}
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