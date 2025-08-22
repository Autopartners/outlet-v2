import { useState, useRef, useEffect } from 'react';
import { useCallback } from 'react';
import { api } from '@/shared/lib/api.ts';
import { useApp } from '@/app/providers/app/useApp.ts';
import { Box, Button, Flex, Loader, PinInput, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { IconCircleCheck } from '@tabler/icons-react';
import type { Me } from '@/app/types/me';

interface ConfirmWithTimerProps {
  user: Me,
  setUser: (user: Me) => void,
  type: 'phone' | 'email',
  label: string,
}

export const ConfirmWithTimer = ({ type, label, user, setUser }: ConfirmWithTimerProps) => {
  const { notification } = useApp();
  const [passed, setPassed] = useState(-1);
  const [loading, setLoading] = useState(false);
  const { isMobile } = useApp();
  const [code, setCode] = useState<string>('');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const last = user[`${type}_confirmation_sent_at`];

  const countdown = useCallback(() => {
    if (!last) {
      setPassed(-1);
      return;
    }

    const diff = dayjs().diff(dayjs(last), 'second');
    setPassed(diff);
  }, [last]);

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    countdown();
    timer.current = setInterval(countdown, 1000);
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [countdown, user]);

  const codeInput = (e: string) => {
    setCode(e);
    if (e.length === 4) {
      submit(e);
    }
  };

  const submit = async (e: string) => {
    setCode('');
    try {
      setLoading(true);
      const { data } = await api.patch(`/external/users/${user.id}/confirm`,
        { user: { type: type, key: e, source: 'outlet' } });
      notification.green('Успех');
      setUser({ ...user, ...data });
    } catch {
      notification.red('Неверный код!');
      setUser({ ...user, [`${type}_confirmation_sent_at`]: null });
    } finally {
      setLoading(false);
    }
  };

  const codeRequest = async () => {
    try {
      const { data } = await api.patch(`/external/users/${user.id}/confirmation_request`,
        { user: { type, source: 'outlet' } });
      setUser({ ...user, ...data });
    } catch {
      notification.red('Ошибка!');
    }
  };

  const confirmed =
    <Box w={200}>
      <Flex gap="xs">
        <IconCircleCheck color="green" />
        <Text
          c="green"
          fw={500}
          size="sm"
        >
          {`${label} подтвержден`}
        </Text>
      </Flex>
    </Box>;

  const form =
    <Flex
      gap={isMobile ? 'xs' : 'xl'}
      align={isMobile ? 'flex-start' : 'center'}
      direction={isMobile ? 'column' : 'row'}
    >
      {loading ?
        <Flex w={180} justify="center" align="center">
          <Loader type="dots" size="md" />
        </Flex> : (
          user[`${type}_confirmation_sent_at`] &&
          <Box w={180}>
            <PinInput inputMode="numeric" onChange={codeInput} value={code} />
          </Box>
        )
      }
      {((!user[`${type}_confirmation_sent_at`] || (passed > 60)) &&
        <Button color="cyan" w={230} fz="xs" size="sm" onClick={codeRequest}>Запросить код
          подтверждения</Button>)
      }
      {passed > 0 && passed < 60 &&
        <Box w={230}>
          <Text ta={isMobile ? 'left' : 'start'} style={{ fontSize: 12 }}>
            запросить повторно через: {60 - passed}
          </Text>
        </Box>
      }
    </Flex>;

  return (
    <>
      {user[`${type}_confirmed`] ? confirmed : form}
    </>
  );
};
