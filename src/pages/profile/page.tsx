import { Container, Card, Flex, Button, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ProfileRouter } from '@/app/routers/profileRouter';
import { useLocation } from 'react-router';
import { useMe } from '@/app/providers/me/useMe';

export const ProfilePage = () => {
  const { pathname } = useLocation();
  const { me, setMe, loading } = useMe();
  return (
    <Container p={0} mt={50} fluid>
      <Flex gap="md" justify="center" mih={'80vh'}>
        <Card w={'15vw'} shadow="md" radius={'lg'} withBorder>
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

        <Card w="70vw" shadow="md" radius={'lg'} withBorder>
          <Box w={'70%'} mx={'auto'}>
            <ProfileRouter user={me} setUser={setMe} isUserFetching={loading} />
          </Box>
        </Card>
      </Flex>
    </Container>
  );
};
