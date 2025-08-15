import { useContext } from 'react';
import { AppContext } from '@/app/providers/app/appContext.ts';

export const useApp = () => useContext(AppContext);
