import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  Container,
  Body, ButtonContainer
} from './styles';

// contexts
import { useLoading } from '../../../contexts/loading';
import { useAuth } from '../../../contexts/auth';
import { useProfile } from '../../../contexts/profile';
// >

// components
import HeaderStackWithHelp from '../../../components/HeaderStackWithHelp';
import Dropdown from '../../../components/Dropdown';
import DatePicker from '../../../components/DatePicker';
import Button from '../../../components/Button';
import InputMask from '../../../components/InputMask';
// >

// date
import { companies } from '../../../data/companies';
import { dataDepartments } from '../../../data/departments';
// >

// services
import { saveProfile } from '../../../services/saveProfileJob';
// >

type T = {
  buttonDisable: boolean,
  companies: number | any,
  departmentSelected: number,
  departmentFunctionSelected: Array<{}>,
  departmentFunction: string | any,
  email: string | any,
  birthDate: Date,
  hiringData: Date,
  openBirth: boolean,
  openHiring: boolean
}

const Job: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user, userUpdate } = useAuth();
  const { data } = useProfile();

  function formatDate(date: Date | any) {

    let dateX;

    if (date) {
      const dateValue = String(date);
      const [year, month, day] = dateValue.split('-');

      const d = parseInt(day);
      const m = parseInt(month);
      const y = parseInt(year);

      dateX = new Date(y, m - 1, d);
    } else {
      dateX = new Date();
    }

    return dateX;
  }

  function standardDate(date: Date) {

    var date = date;

    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + day;

    return formattedDate;
  }

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    companies: user?.IdEmpresaPadrao,
    departmentSelected: data?.Departamento,
    departmentFunctionSelected: [],
    departmentFunction: user?.Funcao,
    email: user?.Email,
    birthDate: formatDate(data?.DtNascimento),
    hiringData: formatDate(data?.DtContratacao),
    openBirth: false,
    openHiring: false
  })

  function validate() {
    const text = dataLocal.email;
    if (!text) {
      return true;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true;
    }
  }

  async function handlesaveProfile() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true
    });
    handleModalLoading(true);

    const emailValidate = validate();

    if (!dataLocal.departmentFunction) {
      handleModalLoading(false);
      setDataLocal({
        ...dataLocal,
        buttonDisable: false
      });
      return Alert.alert('', 'Selecione uma função para salvar!')
    }

    if (!emailValidate) {
      handleModalLoading(false);
      setDataLocal({
        ...dataLocal,
        buttonDisable: false
      });
      return Alert.alert('', 'E-mail inválido!')
    }

    data.Empresa = dataLocal.companies;
    data.Departamento = dataLocal.departmentSelected;
    data.DtNascimento = standardDate(dataLocal.birthDate);
    data.DtContratacao = standardDate(dataLocal.hiringData);

    let res = await saveProfile(user?.CPF, user?.IdEmpresaPadrao, dataLocal.departmentFunction, dataLocal.email, data)

    if (res.data === 200) {

      userUpdate(dataLocal.departmentFunction, dataLocal.email);

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

  useEffect(() => {

    const departments = dataDepartments.filter(item => item.label === data?.Departamento)

    if (departments.length !== 0) {

      const departmentFunction = departments[0].departmentFunction.filter(item => item.label == user?.Funcao)

      setDataLocal({
        ...dataLocal,
        departmentFunctionSelected: departments[0] ? departments[0].departmentFunction : [],
        departmentFunction: departmentFunction[0] ? departmentFunction[0].value : null
      })

    }

  }, [])

  function handleCompanies(val: string | any) {
    setDataLocal({
      ...dataLocal,
      companies: val.value,
    })
  }

  function handleDepartment(item: string | any, departmentFunction: Array<{}> | any) {
    setDataLocal({
      ...dataLocal,
      departmentFunction: null,
      departmentSelected: item,
      departmentFunctionSelected: departmentFunction
    })
  }

  function handleFunction(val: string | any) {
    setDataLocal({
      ...dataLocal,
      departmentFunction: val.label,
    })
  };

  function onDateSelectedBirthDate(event: DateTimePickerEvent, date: Date | any) {
    setDataLocal({
      ...dataLocal,
      birthDate: date,
      openBirth: false
    })
  };

  function onDateSelectedHiringDate(event: DateTimePickerEvent, date: Date | any) {
    setDataLocal({
      ...dataLocal,
      hiringData: date,
      openHiring: false
    })
  };

  function handleEmail(val: string | any) {
    setDataLocal({
      ...dataLocal,
      email: val.length < 1 ? null : val
    })
  };

  function openBirth() {
    setDataLocal({
      ...dataLocal,
      openBirth: true
    })
  }

  function openHiring() {
    setDataLocal({
      ...dataLocal,
      openHiring: true
    })
  }

  return (
    <Container>

      <HeaderStackWithHelp title='Trabalho' informativeText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' goBack={() => navigation.goBack()} disabled={dataLocal.buttonDisable} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>

          <Dropdown
            search={false}
            title='Empresa'
            data={companies}
            value={dataLocal.companies}
            onChange={handleCompanies}
          />

          <Dropdown
            search={true}
            title='Departamento'
            data={dataDepartments}
            value={dataLocal.departmentSelected}
            onChange={(item: any) => { handleDepartment(item.label, item.departmentFunction) }}
          />

          <Dropdown
            search={true}
            title='Função'
            data={dataLocal.departmentFunctionSelected}
            value={dataLocal.departmentFunction}
            onChange={handleFunction}
          />

          <InputMask
            title='E-mail'
            value={dataLocal.email}
            onChange={handleEmail}
            maxLength={100}
          />

          <DatePicker
            title='Data de nascimento'
            onChange={onDateSelectedBirthDate}
            date={dataLocal.birthDate}
            datePicker={dataLocal.openBirth}
            openDatePicker={openBirth}
          />

          <DatePicker
            title='Data de contratação'
            onChange={onDateSelectedHiringDate}
            date={dataLocal.hiringData}
            datePicker={dataLocal.openHiring}
            openDatePicker={openHiring}
          />

          <ButtonContainer>
            <Button color={true} title='Salvar' onPress={() => handlesaveProfile()} disabled={dataLocal.buttonDisable} />
          </ButtonContainer>

        </Body>
      </ScrollView>
    </Container>
  )
}

export default Job;