import { AppShell, Image, Group, UnstyledButton } from '@mantine/core';
import AppRouter from '../../app/routers/appRouter.tsx';

export function Navbar() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header style={{ zIndex: 999 }}>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Image src={'public/outlet_circle.png'} h={35} />
            <Group ml="xl" gap={50} p="md" visibleFrom="sm" fw={500}>
              <UnstyledButton>Home</UnstyledButton>
              <UnstyledButton>Blog</UnstyledButton>
              <UnstyledButton>Contacts</UnstyledButton>
              <UnstyledButton>Support</UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main p={0}>
        <AppRouter />
      </AppShell.Main>
    </AppShell>
  );
}
