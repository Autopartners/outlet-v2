import { AppShell, Image, Group, UnstyledButton } from '@mantine/core';
import { NavLink } from 'react-router';
import { AppRouter } from '@/app/routers/appRouter.tsx';
import { useNavigate } from 'react-router-dom';
import { NavStatus } from '@/widgets/Navbar/ui/NavStatus';

export function Navbar() {
  const nav = useNavigate();

  return (
    <AppShell header={{ height: 70 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <NavLink to={'/'}>
              <Image src={'/outlet_circle.png'} h={35} />
            </NavLink>
            <Group ml="xl" gap={50} p="md" visibleFrom="md" fw={500}>
              <UnstyledButton onClick={() => nav('/')}>Home</UnstyledButton>
              <UnstyledButton onClick={() => nav('/lots')}>Lots</UnstyledButton>
              <UnstyledButton onClick={() => nav('/about')}>About</UnstyledButton>
              <UnstyledButton onClick={() => nav('/rules')}>Rules</UnstyledButton>
            </Group>
            <NavStatus />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main p={0}>
        <AppRouter />
      </AppShell.Main>
      <AppShell.Footer>
        <Group justify={'space-around'} p="md" hiddenFrom="md" fw={500}>
          <UnstyledButton onClick={() => nav('/')}>Home</UnstyledButton>
          <UnstyledButton onClick={() => nav('/lots')}>Lots</UnstyledButton>
          <UnstyledButton onClick={() => nav('/about')}>About</UnstyledButton>
          <UnstyledButton onClick={() => nav('/rules')}>Rules</UnstyledButton>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
