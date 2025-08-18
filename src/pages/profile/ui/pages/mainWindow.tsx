import { Box, Button, Flex, Text, TextInput } from '@mantine/core';
import { api } from '@/shared/lib/api.ts';
import { useNavigate } from 'react-router';
export const MainWindow = ({ user, setUser }) => {
  const nav = useNavigate();
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
  return (
    <Box w={'70%'} mx={'auto'}>
      <Text ta={'center'} fz={28} fw={500}>
        Основные
      </Text>
      <Flex direction={'column'}>
        <TextInput value={user?.username} label={'Имя пользователя'} disabled />
        <TextInput value={user?.name} label={'Имя'} />
        <TextInput value={user?.phone0} label={'Телефон'} />
        <TextInput value={user?.email0} label={'Email'} />
      </Flex>
      <Button mt={'md'} size={'md'} color={'red'} onClick={logout}>
        Выйти
      </Button>
    </Box>
  );
};
