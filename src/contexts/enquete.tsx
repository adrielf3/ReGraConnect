import React, { useState, createContext, useContext } from 'react';

interface Data {
  buttonDisable: boolean
};

interface PollSelected {
  Id: number,
  CodigoAcesso: number,
  Id_Empresa: number,
  Id_Usuario: number,
  Apelido: string,
  Enquete: string,
  Dt_Operacao: string
};

interface OptionsData {
  Id: number,
  Id_Enquete: number,
  Opcao: string,
  Votos: number,
  map: any,
  filter: any
};

interface EnqueteContexData {
  data: Data,
  handleButtonDisable: (value: boolean) => void;
  pollSelected: (value: object, options: object) => void;
  pollSelectedData: PollSelected;
  pollOptionsData: OptionsData;
  updatePoll: (options: object) => void;
};

interface Props {
  children: React.ReactNode;
};

const EnqueteContext = createContext<EnqueteContexData>({} as EnqueteContexData);

export const EnqueteProvider: React.FC<Props> = ({ children }) => {

  const [data, setData] = useState({
    buttonDisable: false
  })

  const [pollSelectedData, setPollSelectedData] = useState(Object());
  const [pollOptionsData, setPollOptionsData] = useState(Object());

  function handleButtonDisable(value: boolean) {
    setData({ ...data, buttonDisable: value });
  };

  function pollSelected(value: object, options: object) {
    setPollSelectedData(value);
    setPollOptionsData(options);
  };

  function updatePoll(options: object) {
    setPollOptionsData(options);
  };

  return (
    <EnqueteContext.Provider value={{
      data,
      handleButtonDisable,
      pollSelected,
      pollSelectedData,
      pollOptionsData,
      updatePoll
    }}>
      {children}
    </EnqueteContext.Provider>
  );
};

export function useEnquete() {
  const context = useContext(EnqueteContext);

  return context;
};