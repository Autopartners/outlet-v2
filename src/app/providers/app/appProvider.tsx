import React from 'react';
import { AppContext } from './appContext';
import { useMediaQuery } from '@mantine/hooks';

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const isMobile = useMediaQuery('(max-width: 800px)') || false;

  return (
    <AppContext.Provider value={{ isMobile }}>
      {children}
    </AppContext.Provider>
  );
};