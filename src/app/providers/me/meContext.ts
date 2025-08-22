import { createContext } from 'react';
import type { Me } from '@/app/types/me';

interface MeContextType {
  me: Me;
  setMe: React.Dispatch<React.SetStateAction<Me>>;
  tryMe: () => Promise<boolean | void>;
  loading: boolean;
  isAdmin: boolean;
}

export const MeContext = createContext<MeContextType>({
  me: {
    username: '',
    fio: '',
    id: null,
    company: {
      company_name: '',
      address: '',
      inn: '',
      signature: '',
      buyer: '',
      buyer_base: ''
    },
    name: '',
    menus: null,
    phone0: '',
    email0: '',
    show_success_notifications: true,
    roles: [],
    ap_user: false,
    outlet: false,
    phone_confirmed: false,
    email_confirmed: false
  },
  setMe: () => {
  },
  tryMe: async () => {
  },
  loading: false,
  isAdmin: false
});
