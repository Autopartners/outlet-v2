import { AppShell, Image, Group, UnstyledButton } from '@mantine/core';
import { NavLink } from 'react-router';
import { AppRouter } from '@/app/routers/appRouter.tsx';

export function Navbar() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <NavLink to={'/'}>
              <Image src={'/outlet_circle.png'} h={35} />
            </NavLink>
            <Group ml="xl" gap={50} p="md" visibleFrom="sm" fw={500}>
              <UnstyledButton component="a" href={'/'}>
                Home
              </UnstyledButton>
              <UnstyledButton component="a" href={'/lots'}>
                Lots
              </UnstyledButton>
              <UnstyledButton component="a" href={'/about'}>
                About
              </UnstyledButton>
              <UnstyledButton component="a" href={'/rules'}>
                Rules
              </UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <AppRouter />
      </AppShell.Main>
      <AppShell.Footer>
        <Group justify={'space-around'} p="md" hiddenFrom="sm" fw={500}>
          <UnstyledButton component="a" href={'/'}>
            Home
          </UnstyledButton>
          <UnstyledButton component="a" href={'/lots'}>
            Lots
          </UnstyledButton>
          <UnstyledButton component="a" href={'/about'}>
            About
          </UnstyledButton>
          <UnstyledButton component="a" href={'/rules'}>
            Rules
          </UnstyledButton>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
