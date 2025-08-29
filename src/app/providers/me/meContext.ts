import { createContext } from 'react';
import type { Me } from '@/entities/me';
import { initialMe } from '@/entities/me';

interface MeContextType {
  me: Me;
  setMe: React.Dispatch<React.SetStateAction<Me>>;
  tryMe: () => Promise<boolean | void>;
  loading: boolean;
  isAdmin: boolean;
  isAuctionConfirmed: boolean;
}

export const MeContext = createContext<MeContextType>({
  me: initialMe,
  setMe: () => {
  },
  tryMe: async () => {
  },
  loading: false,
  isAdmin: false,
  isAuctionConfirmed: false
});
