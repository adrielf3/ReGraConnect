import React, { useState, createContext, useContext } from 'react';

interface Data {
  badge: number | null,
  officeId: number | null,
  officeName: string | null,
  requestPromax: number | null,
  idUser: number | null,
  cpf: string | null,
  userName: string | null,
  itens: object | null,
  size: object | null
}

interface SalusContexData {
  data: Data | any;
  saveData: (
    badge: number | null,
    officeId: number | null,
    officeName: string | null,
    requestPromax: number | null,
    idUser: number | null,
    cpf: string | null,
    userName: string | null,
    itens: object | null,
    size: object | null
  ) => void;
  checkItens: (data: object) => void;
  checkItensData: object | any;
  salusSave: () => void;
}

interface Props {
  children: React.ReactNode;
}

const SalusContext = createContext<SalusContexData>({} as SalusContexData);

export const SalusProvider: React.FC<Props> = ({ children }) => {

  type T = {
    badge: number | null,
    officeId: number | null,
    officeName: string | null,
    requestPromax: number | null,
    idUser: number | null,
    cpf: string | null,
    userName: string | null,
    itens: object | null,
    size: object | null
  }

  const [data, setData] = useState<T>({
    badge: null,
    officeId: null,
    officeName: null,
    requestPromax: null,
    idUser: null,
    cpf: null,
    userName: null,
    itens: null,
    size: null
  })

  function saveData(badge: number | null, officeId: number | null, officeName: string | null, requestPromax: number | null, idUser: number | null, cpf: string | null, userName: string | null, itens: object | null, size: object | null) {
    setData({
      ...data,
      badge: badge,
      officeId: officeId,
      officeName: officeName,
      requestPromax: requestPromax,
      idUser: idUser,
      cpf: cpf,
      userName: userName,
      itens: itens,
      size: size
    })
  };

  const [checkItensData, setCheckItensData] = useState({})

  function checkItens(data: object) {
    setCheckItensData(data)
  };

  function salusSave() {
    
  }

  return (
    <SalusContext.Provider value={{
      data,
      saveData,
      checkItens,
      checkItensData,
      salusSave
    }}>
      {children}
    </SalusContext.Provider>
  );
};

export function useSalus() {
  const context = useContext(SalusContext);

  return context
}