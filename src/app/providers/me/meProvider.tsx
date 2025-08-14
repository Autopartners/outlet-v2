import React from 'react';
import MeContext from './meContext.ts';

interface MeProviderProps {
    children: React.ReactNode;
}

const MeProvider = ({ children }: MeProviderProps) => {
  const contextValue = {
    me: {
      username: '',
      fio: ''
    }
  };

  return (
    <MeContext.Provider value={contextValue}>
      {children}
    </MeContext.Provider>
  );
};

export default MeProvider;