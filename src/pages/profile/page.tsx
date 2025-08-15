import { Container, Button } from '@mantine/core';
import { useMe } from '@/app/providers/me/useMe';
import { api } from '@/shared/lib/api';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { me, setMe } = useMe();
  const nav = useNavigate();
  const logout = async () => {
    try {
      await api.post(`common/users/${me.id}/logout`);
      setMe({
        id: null,
        name: '',
        username: '',
        fio: '',
        menus: null
      });
      nav('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container p={0} mt={100} fluid>
      {me && (
        <Button color={'red'} onClick={logout}>
          Выйти
        </Button>
      )}
    </Container>
  );
};
