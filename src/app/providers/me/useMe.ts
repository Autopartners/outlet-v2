import { useContext } from 'react';
import { MeContext } from '@/app/providers/me/meContext';

export const useMe = () => useContext(MeContext);
