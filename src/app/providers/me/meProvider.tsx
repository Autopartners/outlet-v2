import React from 'react';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { api } from '@/shared/lib/api.ts';
import { MeContext } from '@/app/providers/me/meContext';
import { type Role } from '@/entities/me';
import { initialMe } from '@/entities/me';

interface MeProviderProps {
  children: React.ReactNode;
}

const MeProvider = ({ children }: MeProviderProps) => {
  const [me, setMe] = useState(initialMe);

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
    } catch {
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

  const isAdmin = me.roles.some((e: Role) => e.id === 18);

  const contextValue = useMemo(() => (
    { me, setMe, tryMe, loading, isAdmin }
  ), [me, tryMe, loading, isAdmin]);

  return <MeContext.Provider value={contextValue}>{children}</MeContext.Provider>;
};

export default MeProvider;
