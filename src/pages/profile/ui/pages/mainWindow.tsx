import { Button, Flex, Text, TextInput } from '@mantine/core';
import { api } from '@/shared/lib/api.ts';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useApp } from '@/app/providers/app/useApp';
import { CustomLoader } from '@/shared/ui/CustomLoader/CustomLoader';
import { ConfirmWithTimer } from '@/widgets/ConfirmWithTimer/ui/ConfirmWithTimer';
import type { Me } from '@/entities/me';
import { initialMe } from '@/entities/me';

interface MainWindowProps {
  user: Me;
  setUser: (user: Me) => void;
  isUserFetching: boolean;
}

export const MainWindow = ({ user, setUser, isUserFetching }: MainWindowProps) => {
  const nav = useNavigate();
  const { isMobile } = useApp();
  const [state, setState] = useState(user);
  const [changed, setChanged] = useState({});
  const { notification } = useApp();

  useEffect(() => {
    setState(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setChanged({
      ...changed,
      [e.target.name]: user[e.target.name] !== e.target.value
    });
  };

  const submit = async () => {
    const { name, email0, phone0 } = state;
    try {
      const { data } = await api.patch(`common/users/${user.id}`, {
        user: {
          name,
          email0,
          phone0
        }
      });
      setState({ ...state, ...data });
      setChanged({});
      notification.green('Сохранено!');
    } catch {
      notification.red('Ошибка!');
    }
  };

  const cancel = () => {
    setState(user);
    setChanged({});
  };

  const logout = async () => {
    try {
      await api.post(`common/users/${user.id}/logout`);
      setUser(initialMe);
      nav('/');
    } catch {
      notification.red('Ошибка!');
    }
  };

  if (isUserFetching) {
    return <CustomLoader />;
  }

  return (
    <>
      <Text ta="center" fz={28} fw={500}>
        Основные
      </Text>
      <Flex direction="column" gap={5}>
        <TextInput name="username" value={state.username} label="Имя пользователя" disabled />
        <TextInput name="name" value={state.name} label="Имя" onChange={handleChange} />
        <Flex
          gap="md"
          align={isMobile ? 'flex-start' : 'flex-end'}
          direction={isMobile ? 'column' : 'row'}
          justify="space-between"
        >
          <TextInput
            name="phone0"
            value={state.phone0}
            label={state.phone_confirmed ? 'Телефон' : 'Телефон (не подтвержден)'}
            onChange={handleChange}
            w={isMobile ? '100%' : '40%'}
          />
          <ConfirmWithTimer type="phone" label="Телефон" user={state} setUser={setState} />
        </Flex>
        <Flex
          gap="md"
          align={isMobile ? 'flex-start' : 'flex-end'}
          direction={isMobile ? 'column' : 'row'}
          justify="space-between"
        >
          <TextInput
            name="email0"
            value={state.email0}
            label={state.email_confirmed ? 'Email' : 'Email (не подтвержден)'}
            onChange={handleChange}
            w={isMobile ? '100%' : '40%'}
          />
          <ConfirmWithTimer type="email" label="Email" user={state} setUser={setState} />
        </Flex>
      </Flex>
      {Object.values(changed).some((e) => e) && (
        <Flex gap={isMobile ? 0 : 'sm'} direction={isMobile ? 'column' : 'row'}>
          <Button mt="md" size="sm" color="green" onClick={submit}>
            Сохранить
          </Button>
          <Button mt="md" size="sm" onClick={cancel}>
            Отменить
          </Button>
        </Flex>
      )}
      <Button fullWidth={isMobile} mt={isMobile ? 'xl' : 'md'} size="sm" color="red" onClick={logout}>
        Выйти
      </Button>
    </>
  );
};
