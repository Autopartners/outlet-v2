import { createContext } from 'react';

interface MeContextType {
    me: { username: string; fio: string };
}

const MeContext = createContext<MeContextType>({
  me: {
    username: '',
    fio: ''
  }
});

export default MeContext;