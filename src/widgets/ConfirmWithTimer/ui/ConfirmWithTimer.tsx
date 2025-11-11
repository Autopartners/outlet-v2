import { useState, useRef, useEffect } from 'react';
import { api } from '@/shared/lib/api.ts';
import { useApp } from '@/app/providers/app/useApp.ts';
import { Box, Button, Flex, Loader, PinInput, Text } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import type { Me } from '@/entities/me';
import { useMutation } from '@tanstack/react-query';

interface ConfirmWithTimerProps {
  user: Me,
  setUser: (user: Me) => void,
  type: 'phone' | 'email',
  label: string,
}

export const ConfirmWithTimer = ({ type, label, user, setUser }: ConfirmWithTimerProps) => {
  const { notification } = useApp();
  const [count, setCount] = useState(0);
  const [isCounting, setIsCount] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  const [code, setCode] = useState<string>('');

  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const codeInput = (e: string) => {
    setCode(e);
    if (e.length === 4) {
      mutationSubmit.mutate(e);
    }
  };

  useEffect(() => {
    if (isCounting) {
      timerIdRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
    return () => {
      if (timerIdRef.current) { clearInterval(timerIdRef.current); }
      timerIdRef.current = null;
    };
  }, [isCounting]);

  useEffect(() => {
    if (isCounting && count === 60) {
      setCount(0);
      setIsCount(false);
    }
  }, [count, isCounting]);

  const mutationSubmit = useMutation({
    mutationFn: async (e: string) => {
      setCode('');
      const { data } = await api.patch(
        `/external/users/${user.id}/confirm`,
        { user: { type: type, key: e, source: 'outlet' } }
      );
      return data;
    },
    onSuccess: data => {
      notification.green('Успех');
      setUser({ ...user, ...data });
    },
    onError: () => {
      notification.red('Неверный код!');
    }
  });

  const mutateCodeRequest = useMutation({
    mutationFn: async () => {
      setAlreadySent(false);
      const { data } = await api.patch(
        `/external/users/${user.id}/confirmation_request`,
        { user: { type, source: 'outlet' } }
      );
      return data;
    },
    onSuccess: data => {
      if (data.status === 'code_already_sent') {
        setAlreadySent(true);
        setCount(60 - data.count);
      } else { setCount(0); }
      setIsCount(true);
    },
    onError: () => {
      notification.red('Ошибка!');
    }
  });

  const confirmed = (
    <Box w={{ base: '100%', sm: 200 }} mb={7}>
      <Flex gap="xs" align="center" justify={{ base: 'center', sm: 'flex-start' }}>
        <IconCircleCheck color="green" />
        <Text
          c="green.9"
          fw={500}
          size="sm"
        >
          {`${label} подтвержден`}
        </Text>
      </Flex>
    </Box>
  );

  const form = (
    <Flex
      gap="md"
      align="flex-start"
      direction="column"
      mx={{ base: 'auto', sm: 0 }}
    >
      {mutationSubmit.isPending
        ? (
          <Flex w={180} justify="center" align="center">
            <Loader type="dots" size="md" />
          </Flex>
        ) : (
          !user[`${type}_confirmed`] && (
            <PinInput inputMode="numeric" size="md" onChange={codeInput} value={code} />
          )
        )
      }
      {(!(count > 0 && count < 60) && (
        <Button color="blue" w={204} fz="xs" size="sm" onClick={() => mutateCodeRequest.mutate()}>
          Запросить подтверждение
        </Button>
      ))
      }
      {alreadySent && <Text fz={12} w={235} mt={5}>Вы уже недавно запросили код, пожалуйста подождите</Text>}
      {count > 0 && count < 60 && (
        <Box w={230}>
          <Text ta={{ base: 'center', sm: 'left' }} style={{ fontSize: 12 }}>
            Запросить повторно через:
            {' '}
            {60 - count}
          </Text>
        </Box>
      )}
    </Flex>
  );

  return (
    <>
      {user[`${type}_confirmed`] ? confirmed : form}
    </>
  );
};
