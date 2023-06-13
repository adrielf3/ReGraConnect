import React, { useState, createContext, useContext } from 'react';


interface Projeto {
  Id: number,
  Id_Empresa: number,
  Id_Usuario_Cadastrador: number,
  Titulo_Projeto: string,
  Descricao_Projeto: string,
  Area_Negocio: string,
  Atividade_Negocio: string,
  Data_Cadastro: string,
  Data_Inicio: string,
  Data_Conclusao: string,
  NomeCompleto: string
};

interface ProjetoUsuarios {
  Id_Persona: number,
  Id_Usuario: number,
  NomeCompleto: string,
  Funcao: string,
  Tipo_Persona: string,
  Foto: string,
  length: number,
  map: any
};

interface Apontamentos {
  Id: number,
  Id_Persona: number,
  Id_Projeto: number,
  DataHora: string,
  Descricao: string,
  Tipo: string,
  Frequencia_Uso: number,
  Importancia: number,
  NomeCompleto: string,
  Foto: string,
  length: number,
  map: any,
  unshift: any,
  forEach: any
};

interface ProjetosContexData {
  projectSelected: (resultBuscaProjeto: object, resultBuscaProjetoUsuarios: object, resultApontamentos: object) => void;
  projectApontamentosRefresh: (resultApontamentos: object) => void;
  resultBuscaProjeto: Projeto
  resultBuscaProjetoUsuarios: ProjetoUsuarios
  resultApontamentos: Apontamentos
};

interface Props {
  children: React.ReactNode;
};

const ProjetosContext = createContext<ProjetosContexData>({} as ProjetosContexData);

export const ProjetosProvider: React.FC<Props> = ({ children }) => {

  const [resultBuscaProjeto, setResultBuscaProjeto] = useState(Object());
  const [resultBuscaProjetoUsuarios, setResultBuscaProjetoUsuarios] = useState(Object());
  const [resultApontamentos, setresultApontamentos] = useState(Object());

  function projectSelected(resultBuscaProjeto: object, resultBuscaProjetoUsuarios: object, resultApontamentos: object) {
    setResultBuscaProjeto(resultBuscaProjeto);
    setResultBuscaProjetoUsuarios(resultBuscaProjetoUsuarios);
    setresultApontamentos(resultApontamentos);
  };

  function projectApontamentosRefresh(resultApontamentos: object) {
    setresultApontamentos(resultApontamentos);
  };

  return (
    <ProjetosContext.Provider value={{
      projectSelected,
      projectApontamentosRefresh,
      resultBuscaProjeto,
      resultBuscaProjetoUsuarios,
      resultApontamentos
    }}>
      {children}
    </ProjetosContext.Provider>
  );
};

export function useProjetos() {
  const context = useContext(ProjetosContext);

  return context;
};