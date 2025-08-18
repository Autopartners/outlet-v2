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
    name: '',
    menus: null
  });

  const [loading, setLoading] = useState(false);

  const tryMe = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/common/users/me', {
        params: {
          method: 'outlet_me'
        }
      });
      setMe((prev) => ({ ...prev, ...data }));
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!me.id) {
      tryMe();
    }
  }, [tryMe, me.id]);

  const contextValue = useMemo(() => ({ me, setMe, tryMe, loading }), [me, tryMe, loading]);

  return <MeContext.Provider value={contextValue}>{children}</MeContext.Provider>;
};

export default MeProvider;
