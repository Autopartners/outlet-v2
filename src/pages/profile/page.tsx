import { Card, Flex, Button, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ProfileRouter } from '@/app/routers/profileRouter';
import { useLocation } from 'react-router';
import { useMe } from '@/app/providers/me/useMe';
import { useApp } from '@/app/providers/app/useApp.ts';

export const ProfilePage = () => {
  const { pathname } = useLocation();
  const { me, setMe, loading } = useMe();
  const { isMobile } = useApp();

  return (
    <Box mt={isMobile ? 20 : 50} mb={50}>
      <Flex
        gap="md"
        justify="center"
        direction={isMobile ? 'column' : 'row'}
        align={isMobile ? 'center' : 'stretch'}
      >
        <Card
          w={isMobile ? '90vw' : '15vw'}
          shadow="md"
          radius="lg"
          withBorder
          h="fit-content"
        >
          <Flex direction="column" gap={10}>
            <Button
              size="md"
              variant={pathname === '/profile/main' ? 'light' : 'subtle'}
              component={Link}
              to="/profile/main"
              fullWidth={isMobile}
            >
              Основное
            </Button>
            <Button
              size="md"
              variant={pathname === '/profile/company' ? 'light' : 'subtle'}
              component={Link}
              to="/profile/company"
              fullWidth={isMobile}
            >
              Компания
            </Button>
            {/* <Button*/}
            {/*  size="md"*/}
            {/*  variant={pathname === '/profile/won' ? 'light' : 'subtle'}*/}
            {/*  component={Link}*/}
            {/*  to="/profile/won"*/}
            {/*  fullWidth={isMobile}*/}
            {/* >*/}
            {/*  Выигранные*/}
            {/* </Button>*/}
            <Button
              size="md"
              variant={pathname === '/profile/documents' ? 'light' : 'subtle'}
              component={Link}
              to="/profile/documents"
              fullWidth={isMobile}
            >
              Файлы
            </Button>
          </Flex>
        </Card>
        <Card
          w={isMobile ? '90vw' : '70vw'}
          shadow="md"
          radius="lg"
          withBorder
          mih={{ base: '55vh', sm: '75vh' }}
        >
          <Box w={isMobile ? '100%' : '70%'} mx="auto">
            <ProfileRouter user={me} setUser={setMe} isUserFetching={loading} />
          </Box>
        </Card>
      </Flex>
    </Box>
  );
};
