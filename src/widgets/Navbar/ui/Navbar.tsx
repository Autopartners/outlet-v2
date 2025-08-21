import { AppShell, Image, Group, Button, rem } from '@mantine/core';
import { NavLink, useLocation } from 'react-router';
import { AppRouter } from '@/app/routers/appRouter.tsx';
import { useNavigate } from 'react-router-dom';
import { NavStatus } from '@/widgets/Navbar/ui/NavStatus';
import { useMe } from '@/app/providers/me/useMe';
import { useApp } from '@/app/providers/app/useApp.ts';
import { AuthButtons } from '@/widgets/Navbar/ui/AuthButtons';
import { IconCar, IconHome, IconInfoCircle } from '@tabler/icons-react';

export function Navbar() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useApp();
  const { me, loading } = useMe();
  const lotsMobilePage = pathname === '/lots' && isMobile;

  return (
    <AppShell header={{ height: lotsMobilePage ? 0 : 70 }} footer={{ height: isMobile ? 70 : 0 }} padding="md">
      {(!isMobile || !me.id || pathname === '/') && (
        <AppShell.Header>
          <Group h="100%" px="md">
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
        pt={!lotsMobilePage ? `calc(${rem(70)}` : 0}
        pb={isMobile ? `calc(${rem(70)}` : 0}
      >
        <AppRouter />
      </AppShell.Main>
      <AppShell.Footer>
        <Group justify="space-around" p="md" hiddenFrom="md" fw={500}>
          <Button variant={pathname === '/' ? 'light' : 'subtle'} size="md" color="black" onClick={() => nav('/')}>
            <IconHome size={30} />
          </Button>
          {me.id && (
            <Button
              variant={pathname.includes('/lots') ? 'light' : 'subtle'}
              size="md"
              color="black"
              onClick={() => nav('/lots')}
            >
              <IconCar size={30} />
            </Button>
          )}
          <Button
            variant={pathname === '/about' ? 'light' : 'subtle'}
            size="md"
            color="black"
            onClick={() => nav('/about')}
          >
            <IconInfoCircle size={30} />
          </Button>
          {me.id && <NavStatus />}
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
