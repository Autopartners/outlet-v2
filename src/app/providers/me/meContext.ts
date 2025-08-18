import { createContext } from 'react';

interface Me {
  username: string;
  fio: string;
  id: null;
  name: string;
  menus: null;
  phone0: '';
  email0: '';
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
    email0: ''
  },
  setMe: () => {},
  tryMe: async () => {},
  loading: false
});
