import { createContext } from 'react';

interface AppContextType {
  isMobile: boolean;
  notification: {
      red: (body: string, options?: object) => void,
      green: (body: string, options?: object) => void,
      yellow: (body: string, options?: object) => void
  };
}

export const AppContext = createContext<AppContextType>({
  isMobile: true,
  notification: { red: () => {}, green: () => {}, yellow: () => {} }
});
