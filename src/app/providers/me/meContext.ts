import { createContext } from 'react';

export interface Role {
  id: number;
}

interface Me {
  username: string;
  fio: string;
  id: null;
  name: string;
  menus: null;
  phone0: string;
  email0: string;
  show_success_notifications: boolean;
  roles: Role[];
  ap_user: boolean;
  outlet: boolean;
}

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
    name: '',
    menus: null,
    phone0: '',
    email0: '',
    show_success_notifications: true,
    roles: [],
    ap_user: false,
    outlet: false
  },
  setMe: () => {
  },
  tryMe: async () => {
  },
  loading: false,
  isAdmin: false
});
