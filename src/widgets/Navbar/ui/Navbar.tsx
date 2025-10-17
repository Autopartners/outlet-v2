import { AppShell, Image, Group, Button, rem, Menu, Flex, ActionIcon, Box } from '@mantine/core';
import { NavLink, useLocation } from 'react-router';
import { AppRouter } from '@/app/routers/appRouter.tsx';
import { useNavigate } from 'react-router-dom';
import { NavStatus } from '@/widgets/Navbar/ui/NavStatus';
import { useMe } from '@/app/providers/me/useMe';
import { useApp } from '@/app/providers/app/useApp.ts';
import { AuthButtons } from '@/widgets/Navbar/ui/AuthButtons';
import { IconCar, IconHome, IconBaselineDensityMedium, IconSquareRotated, IconInfoCircle } from '@tabler/icons-react';
import { CustomLoader } from '@/shared/ui/CustomLoader/CustomLoader';
import { Footer } from '@/widgets/Footer/Footer';

export function Navbar() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useApp();
  const { me, loading } = useMe();
  const withoutHeaderPage = pathname !== '/' && isMobile;

  if (loading) {
    return <CustomLoader label="Загружаем информацию о пользователе..." />;
  }

  return (
    <AppShell header={{ height: withoutHeaderPage ? 0 : 70 }} footer={{ height: isMobile ? 70 : 0 }} padding="md">
      {(!isMobile || !me.id || pathname === '/') && (
        <AppShell.Header>
          <Group h="100%" px="md" w="100rem" maw="100vw" mx="auto">
            <Group pos="relative" justify="space-between" style={{ flex: 1 }}>
              <NavLink to="/">
                <Image src="/outlet_circle.png" h={35} />
              </NavLink>
              <Group
                style={{ transform: 'translate(-50%, -50%)' }}
                pos="absolute"
                left="50%"
                top="50%"
                gap={50}
                visibleFrom="md"
                fw={500}
              >
                <Button
                  variant={pathname === '/' ? 'light' : 'subtle'}
                  size="md"
                  color="black"
                  onClick={() => nav('/')}
                >
                  Главная
                </Button>
                {me.id && (
                  <Button
                    variant={pathname.includes('/lots') ? 'light' : 'subtle'}
                    size="md"
                    color="black"
                    onClick={() => nav('/lots')}
                  >
                    Лоты
                  </Button>
                )}
                <Button
                  variant={pathname === '/about' ? 'light' : 'subtle'}
                  size="md"
                  color="black"
                  onClick={() => nav('/about')}
                >
                  О компании
                </Button>
                <Button
                  variant={pathname === '/rules' ? 'light' : 'subtle'}
                  size="md"
                  color="black"
                  onClick={() => nav('/rules')}
                >
                  Правила
                </Button>
              </Group>
              {me.id && !isMobile ? <NavStatus /> : <AuthButtons isMobile={isMobile} me={me} loading={loading} />}
            </Group>
          </Group>
        </AppShell.Header>
      )}
      <AppShell.Main
        px={0}
        pt={!withoutHeaderPage ? `calc(${rem(70)}` : 0}
        pb={isMobile ? `calc(${rem(70)}` : 0}
      >
        <Box mih="75vh">
          <AppRouter />
        </Box>
        <Footer />
      </AppShell.Main>
      <AppShell.Footer>
        <Group justify="space-around" p="md" hiddenFrom="md" fw={500}>
          <ActionIcon variant={pathname === '/' ? 'light' : 'subtle'} size={40} color="black" onClick={() => nav('/')}>
            <IconHome size={30} />
          </ActionIcon>
          {me.id && (
            <ActionIcon
              variant={pathname.includes('/lots') ? 'light' : 'subtle'}
              size={40}
              color="black"
              onClick={() => nav('/lots')}
            >
              <IconCar size={30} />
            </ActionIcon>
          )}
          {me.id && <NavStatus />}
          <Menu
            position="top"
            offset={15}
            shadow="md"
            width={200}
            openDelay={100}
            closeDelay={100}
          >
            <Menu.Target>
              <ActionIcon
                size={40}
                variant="subtle"
                color="black"
              >
                <IconBaselineDensityMedium size={30} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Flex direction="column" gap="sm" p="xs">
                <Button
                  fullWidth
                  variant={pathname === '/about' ? 'filled' : 'light'}
                  color="dark"
                  onClick={() => nav('/about')}
                  leftSection={<IconSquareRotated size={20} />}
                >
                    О компании
                </Button>
                <Button
                  fullWidth
                  variant={pathname === '/rules' ? 'filled' : 'light'}
                  color="dark"
                  onClick={() => nav('/rules')}
                  leftSection={<IconInfoCircle size={20} />}
                >
                    Правила
                </Button>
              </Flex>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
