import React, { useCallback, useMemo } from 'react';
import { AppContext } from './appContext';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { useMe } from '../me/useMe';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const isMobile = useMediaQuery('(max-width: 800px)') || false;
  const { me } = useMe();

  const showNotification = useCallback(
    ({ color = 'green', at = '', title = '', body = '', delay = 3000 }) => {
      if (color === 'green' && !me.show_success_notifications) {
        return;
      }

      notifications.show({
        color,
        title: `${title || body} ${at}`,
        message: title && body,
        position: 'top-right',
        autoClose: delay,
        withCloseButton: false
      });
    },
    [me.show_success_notifications]
  );

  // Notification
  type Color = 'red' | 'yellow' | 'green'
  type NotificationFunction = (body: string, options?: object) => void;

  const notification = useMemo(() => {
    const t: Record<Color, NotificationFunction> = {} as Record<Color, NotificationFunction>;
    const colors: Color[] = ['red', 'yellow', 'green'];

    colors.forEach((color: Color) => {
      t[color] = (body: string, options?: object) => {
        showNotification({ color, body, ...options });
      };
    });

    return t;
  }, [showNotification]);

  const value = useMemo(
    () => ({
      notification,
      isMobile
    }),
    [notification, isMobile]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
