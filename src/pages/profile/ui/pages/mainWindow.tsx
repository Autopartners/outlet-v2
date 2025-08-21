import { Button, Flex, Text, TextInput } from '@mantine/core';
import { api } from '@/shared/lib/api.ts';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useApp } from '@/app/providers/app/useApp';
import { CustomLoader } from '@/shared/ui/Loader/Loader';
import { ConfirmWithTimer } from '@/widgets/ConfirmWithTimer/ui/ConfirmWithTimer';

export const MainWindow = ({ user, setUser, isUserFetching }) => {
  const nav = useNavigate();
  const [state, setState] = useState(user);
  const [changed, setChanged] = useState({});
  const { notification } = useApp();

  useEffect(() => {
    setState(user);
  }, [user]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setChanged({
      ...changed,
      [e.target.name]: user[e.target.name] !== e.target.value
    });
  };

  const submit = async () => {
    const { name, email0, phone0 } = state;
    try {
      await api.patch(`outlet/users/${user.id}`, {
        user: {
          name,
          email0,
          phone0
        }
      });
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
      setUser({
        username: '',
        fio: '',
        id: null,
        name: '',
        menus: null,
        phone0: '',
        email0: ''
      });
      nav('/');
    } catch (error) {
      console.log(error);
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
        <Flex gap="md" align="flex-end" justify="space-between">
          <TextInput
            name="phone0"
            value={state.phone0}
            label={state.phone_confirmed ? 'Телефон' : 'Телефон (не подтвержден)'}
            onChange={handleChange}
            w="40%"
          />
          <ConfirmWithTimer type="phone" label="Телефон" />
        </Flex>
        <Flex gap="md" align="flex-end" justify="space-between">
          <TextInput
            name="email0"
            value={state.email0}
            label={state.email_confirmed ? 'Email' : 'Email (не подтвержден)'}
            onChange={handleChange}
            w="40%"
          />
          <ConfirmWithTimer type="email" label="Email" />
        </Flex>
      </Flex>
      <Flex gap="sm">
        {Object.values(changed).some((e) => e) && (
          <>
            <Button mt="md" size="sm" color="green" onClick={submit}>
              Сохранить
            </Button>
            <Button mt="md" size="sm" onClick={cancel}>
              Отменить
            </Button>
          </>
        )}
      </Flex>
      <Button mt="md" size="md" color="red" onClick={logout}>
        Выйти
      </Button>
    </>
  );
};
