import React from 'react';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { api } from '@/shared/lib/api.ts';
import { MeContext } from '@/app/providers/me/meContext';

interface MeProviderProps {
  children: React.ReactNode;
}

const MeProvider = ({ children }: MeProviderProps) => {
  const [me, setMe] = useState({
    username: '',
    fio: '',
    id: null,
    name: ''
  });

  const tryMe = useCallback(async () => {
    try {
      const { data } = await api.get('/common/users/me');
      setMe((prev) => ({ ...prev, ...data }));
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (!me.id) {
      tryMe();
    }
  }, [tryMe, me.id]);

  const contextValue = useMemo(() => ({ me, setMe, tryMe }), [me, tryMe]);

  return <MeContext.Provider value={contextValue}>{children}</MeContext.Provider>;
};

export default MeProvider;
