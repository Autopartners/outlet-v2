import { Container, Card, Flex, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ProfileRouter } from '@/app/routers/profileRouter';
import { useLocation } from 'react-router';
import { useMe } from '@/app/providers/me/useMe';

export const ProfilePage = () => {
  const { pathname } = useLocation();
  const { me, setMe } = useMe();
  return (
    <Container p={0} mt={100} fluid>
      <Flex gap="md" justify="center">
        <Card w={200} shadow="sm" radius={'lg'} withBorder>
          <Flex direction="column" gap={10}>
            <Button size={'md'} variant={pathname === '/profile/main' ? 'light' : 'subtle'} component={Link} to="/profile/main">
              Основные
            </Button>
            <Button size={'md'} variant={pathname === '/profile/company' ? 'light' : 'subtle'} component={Link} to="/profile/company">
              Компания
            </Button>
            <Button size={'md'} variant={pathname === '/profile/won' ? 'light' : 'subtle'} component={Link} to="/profile/won">
              Выйгранные
            </Button>
            <Button size={'md'} variant={pathname === '/profile/documents' ? 'light' : 'subtle'} component={Link} to="/profile/documents">
              Файлы
            </Button>
          </Flex>
        </Card>

        <Card w="70vw" h="80vh" shadow="md" radius={'lg'} withBorder>
          <ProfileRouter user={me} setUser={setMe} />
        </Card>
      </Flex>
    </Container>
  );
};
