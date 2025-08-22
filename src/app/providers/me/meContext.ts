import { createContext } from 'react';
import type { Me } from '@/app/types/me';
import { initialMe } from '@/app/types/me';

interface MeContextType {
  me: Me;
  setMe: React.Dispatch<React.SetStateAction<Me>>;
  tryMe: () => Promise<boolean | void>;
  loading: boolean;
  isAdmin: boolean;
}

export const MeContext = createContext<MeContextType>({
  me: initialMe,
  setMe: () => {
  },
  tryMe: async () => {
  },
  loading: false,
  isAdmin: false
});
