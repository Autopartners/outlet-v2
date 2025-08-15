import { AppShell, Image, Group, Button } from '@mantine/core';
import { NavLink, useLocation } from 'react-router';
import { AppRouter } from '@/app/routers/appRouter.tsx';
import { useNavigate } from 'react-router-dom';
import { NavStatus } from '@/widgets/Navbar/ui/NavStatus';
import { useMe } from '@/app/providers/me/useMe';
import { useApp } from '@/app/providers/app/useApp.ts';
import { AuthButtons } from '@/widgets/Navbar/ui/AuthButtons';

export function Navbar() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useApp();
  const { me, loading } = useMe();

  return (
    <AppShell header={{ height: 70 }} padding="md">
      {(!isMobile || !me.id || pathname === '/') && (
        <AppShell.Header>
          <Group h="100%" px="md">
            <Group pos="relative" justify="space-between" style={{ flex: 1 }}>
              <NavLink to="/">
                <Image src="/outlet_circle.png" h={35} />
              </NavLink>
              <Group style={{ transform: 'translate(-50%, -50%)' }} pos="absolute" left="50%" top="50%" gap={50} visibleFrom="md" fw={500}>
                <Button variant={pathname === '/' ? 'light' : 'subtle'} size="md" color="black" onClick={() => nav('/')}>
                  Home
                </Button>
                {me.id && (
                  <Button variant={pathname === '/lots' ? 'light' : 'subtle'} size="md" color="black" onClick={() => nav('/lots')}>
                    Lots
                  </Button>
                )}
                <Button variant={pathname === '/about' ? 'light' : 'subtle'} size="md" color="black" onClick={() => nav('/about')}>
                  About
                </Button>
                <Button variant={pathname === '/rules' ? 'light' : 'subtle'} size="md" color="black" onClick={() => nav('/rules')}>
                  Rules
                </Button>
              </Group>
              {me.id && !isMobile ? <NavStatus /> : <AuthButtons isMobile={isMobile} me={me} loading={loading} />}
            </Group>
          </Group>
        </AppShell.Header>
      )}
      <AppShell.Main p={0}>
        <AppRouter />
      </AppShell.Main>
      <AppShell.Footer>
        <Group justify="space-around" p="md" hiddenFrom="md" fw={500}>
          <Button variant={pathname === '/' ? 'light' : 'subtle'} size="sm" color="black" onClick={() => nav('/')}>
            Home
          </Button>
          {me.id && (
            <Button variant={pathname === '/lots' ? 'light' : 'subtle'} size="md" color="black" onClick={() => nav('/lots')}>
              Lots
            </Button>
          )}
          <Button variant={pathname === '/about' ? 'light' : 'subtle'} size="sm" color="black" onClick={() => nav('/about')}>
            About
          </Button>
          {me.id && <NavStatus />}
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
