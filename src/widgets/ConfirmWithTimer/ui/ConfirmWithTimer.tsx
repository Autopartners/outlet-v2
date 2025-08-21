import { useState, useRef, useEffect } from 'react';
import { useCallback } from 'react';
import { api } from '@/shared/lib/api.ts';
import { useMe } from '@/app/providers/me/useMe.ts';
import { useApp } from '@/app/providers/app/useApp.ts';
import { Box, Button, Flex, Loader, PinInput, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { IconCircleCheck } from '@tabler/icons-react';

export const ConfirmWithTimer = ({ type }) => {
  const { me, setMe } = useMe();
  const { notification } = useApp();
  const [passed, setPassed] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState();
  const timer = useRef();
  const last = me[`${type}_confirmation_sent_at`];

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
  }, [countdown, me]);

  const codeInput = (e) => {
    setCode(e);
    if (e.length === 4) {
      submit(e);
    }
  };

  const submit = async (e) => {
    setCode(null);
    try {
      setLoading(true);
      const { data } = await api.patch(`/external/users/${me.id}/confirm`,
        { user: { type: type, key: e, source: 'outlet' } });
      notification.green('Успех');
      setMe({ ...me, ...data });
    } catch {
      notification.red('Неверный код!');
      setMe({ ...me, [`${type}_confirmation_sent_at`]: null });
    } finally {
      setLoading(false);
    }
  };

  const codeRequest = async () => {
    try {
      const { data } = await api.patch(`/external/users/${me.id}/confirmation_request`,
        { user: { type, source: 'outlet' } });
      setMe({ ...me, ...data });
    } catch {
      notification.red('Ошибка!');
    }
  };

  const confirmed =
    <Flex gap="xs" align="center">
      <IconCircleCheck color="green" />
      <Text
        c="green"
        fw={500}
        size="sm"
      >
        Подтверждено
      </Text>
    </Flex>;

  const form =
    <Flex gap="xl" align="center">
      {loading ?
        <Flex w={180} justify="center" align="center">
          <Loader type="dots" size="md" />
        </Flex> : (
          me[`${type}_confirmation_sent_at`] &&
          <Box w={180}>
            <PinInput inputMode="numeric" onChange={codeInput} value={code} />
          </Box>
        )
      }
      {(!me[`${type}_confirmation_sent_at`] &&
        <Button color="cyan" w={230} fz="xs" size="xs" onClick={codeRequest}>Запросить код
          подтверждения</Button>)
      }
      {passed > 0 && passed < 60 &&
        <Box w={230}>
          <Text ta="center" style={{ fontSize: 12 }}>
            запросить повторно через: {60 - passed}
          </Text>
        </Box>
      }
    </Flex>;

  return (
    <>
      {me[`${type}_confirmed`] ? confirmed : form}
    </>
  );
};
