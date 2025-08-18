import { createContext } from 'react';

interface AppContextType {
  isMobile: boolean;
  notification: object;
}

export const AppContext = createContext<AppContextType>({
  isMobile: true,
  notification: {}
});
