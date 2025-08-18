import { createContext } from 'react';

export interface Role {
    id: number
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
}

interface MeContextType {
  me: Me;
  setMe: React.Dispatch<React.SetStateAction<Me>>;
  tryMe: () => Promise<boolean | void>;
  loading: boolean;
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
    roles: []
  },
  setMe: () => {},
  tryMe: async () => {},
  loading: false
});
