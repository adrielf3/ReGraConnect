import React, { useState, createContext, useEffect, useContext } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import * as auth from '../services/auth';

interface User {
  Id: number,
  IdEmpresaPadrao: number,
  Cracha: number,
  CPF: number,
  NomeCompleto: string,
  Apelido: string,
  Departamento: string,
  Funcao: string,
  Tipo: string,
  Nivel: number,
  Dt_Nascimento: string,
  Dt_Contrato: string,
  Telefone: number,
  Email: string,
  EmailPessoal: string,
  Id_Grupo: number,
  Foto: string,
  Status: string
}

interface AuthContexData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  buttonDisable: boolean;
  userUpdate: (departmentFunction: string, email: string) => void;
  signIn: (cpf: string, password: string) => void;
  signOut(): void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContexData>({} as AuthContexData);

import { useLoading } from './loading';

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const { handleModalLoading } = useLoading()

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {

    async function loadStorageData() {

      const storageUser = await AsyncStorage.getItem('@auth:user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      } else {
        AsyncStorage.clear().then(() => {
          setUser(null);
        });
      }

      setLoading(false);

    };

    loadStorageData();

  }, []);

  async function userUpdate(departmentFunction: string, email: string) {

    const storageUser = await AsyncStorage.getItem('@auth:user');

    if (storageUser) {

      const user = await JSON.parse(storageUser);
      user.Funcao = departmentFunction;
      user.Email = email ? email.toLocaleLowerCase() : null;
      await AsyncStorage.setItem('@auth:user', JSON.stringify(user));
      setUser(user);
    }

  };

  async function signIn(cpf: string, password: string) {

    const cpfValidation = cpf.length === 14 ? true : false;
    const passwordValidation = password.length >= 3 ? true : false;

    if (!cpf && !password) return Alert.alert('', 'É necessário CPF e senha para proseguir.');
    if (!cpfValidation) return Alert.alert('', 'CPF inválido.');
    if (!passwordValidation) return Alert.alert('', 'Senha inválida.');


    if (Platform.OS !== 'ios') {
      messaging()
        .getToken()
        .then(async token => {
          setButtonDisable(true);
          handleModalLoading(true);

          const response = await auth.signIn(cpf, password, token);

          if (response) {
            setUser(response.user);
            await AsyncStorage.setItem('@auth:user', JSON.stringify(response.user));
          }

          handleModalLoading(false);
          setButtonDisable(false);
        });
    } else {
      setButtonDisable(true);
      handleModalLoading(true);

      const response = await auth.signIn(cpf, password, 'ios');

      if (response) {
        setUser(response.user);
        await AsyncStorage.setItem('@auth:user', JSON.stringify(response.user));
      }

      handleModalLoading(false);
      setButtonDisable(false);
    }

  };

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      loading,
      buttonDisable,
      userUpdate,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context
}