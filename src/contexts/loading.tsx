import React, { useState, createContext, useContext } from 'react';

interface LoadingContexData {
  modalLoading: boolean;
  handleModalLoading: (name: boolean) => void;
}

interface Props {
  children: React.ReactNode;
}

const LoadingContext = createContext<LoadingContexData>({} as LoadingContexData);

export const LoadingProvider: React.FC<Props> = ({ children }) => {

  const [modalLoading, setModalLoading] = useState(false);

  async function handleModalLoading(value: boolean) {
    await setModalLoading(value)
  }

  return (
    <LoadingContext.Provider value={{ modalLoading, handleModalLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export function useLoading() {
  const context = useContext(LoadingContext);

  return context
}