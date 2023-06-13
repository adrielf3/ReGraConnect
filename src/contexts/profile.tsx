import React, { useState, createContext, useContext } from 'react';

// services
import * as profileData from '../services/profile';
// >

interface Data {
  Departamento: string,
  StatusTrab: string,
  DtNascimento: string,
  DtContratacao: string,
  TempoCasa: string,
  NCalca: number,
  TamanhoCamisa: string,
  NCalcado: number,
  Altura: number,
  Peso: number,
  Bebe: string,
  Fuma: string,
  AtvFisica: string,
  QtdAtvFisicaSemana: number,
  DesempenhoColegas: number,
  DesempenhoLideranca: number,
  SeuDesempenho: number,
  QtdFilhos: number,
  RFeedback: string,
  PPoupanca: string,
  MoraCasa: string,
  PossuiVeiculo: string,
  DistEmpresa: number,
  MoraCom: string,
  Bairro: string,
  TempoMesmoEndereco: number,
  TempoUltEmprego: number,
  LivrosLidos: string,
  FilmesGosta: string,
  OquePrefere: string,
  SeConsidera: string,
  GostaMudancas: string,
  ResolverProblemas: string,
  TomadaDecisoes: string,
  GostaDecisoes: string,
  CarreiraEmpresa: string,
  Sobre: string
}

interface ProfileContexData {
  buttonDisable: boolean;
  callErrorScreen: boolean;
  loading: boolean;
  data: Data | any;
  profile: (cpf: number | undefined) => void;
}

interface Props {
  children: React.ReactNode;
}

const ProfileContext = createContext<ProfileContexData>({} as ProfileContexData);

export const ProfileProvider: React.FC<Props> = ({ children }) => {

  const [buttonDisable, setButtonDisable] = useState(false);
  const [callErrorScreen, setCallErrorScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);

  async function profile(cpf: number | undefined) {

    setButtonDisable(true);
    setCallErrorScreen(false);
    setLoading(true);

    const response = await profileData.profile(cpf);

    setData(response.data);

    if (!response.data) {
      setCallErrorScreen(true);
      setLoading(true);
      setButtonDisable(false);
    } else {
      setCallErrorScreen(false);
      setLoading(false);
      setButtonDisable(false);
    }

  };

  return (
    <ProfileContext.Provider value={{
      buttonDisable,
      callErrorScreen,
      loading,
      data,
      profile
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile() {
  const context = useContext(ProfileContext);

  return context
}