import { Avatar, Text, ActionIcon, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useMe } from '@/app/providers/me/useMe';
import { useApp } from '@/app/providers/app/useApp.ts';
import { authurl } from '@/shared/lib/api.ts';
import { useLocation } from 'react-router';

export const NavStatus = () => {
  const { me } = useMe();
  const { isMobile } = useApp();
  const { pathname } = useLocation();

  if (isMobile) { return (
    <ActionIcon
      component={Link}
      to="/profile/main"
      color="blue.7"
      variant={pathname.includes('/profile') ? 'outline' : 'white'}
      style={{ borderWidth: 2 }}
      size={40}
      radius="xl"
    >
      <Avatar name={me.name || me.username} src={authurl + me.avatar_url} radius="xl" color="initials" />
    </ActionIcon>
  ); }

  return (
    <Button
      component={Link}
      to="/profile/main"
      size="lg"
      leftSection={<Avatar
        name={me.name || me.username}
        src={authurl + me.avatar_url}
        radius="xl"
        color="initials"
      />}
      radius="xl"
      color="black"
      variant={pathname.includes('/profile') ? 'default' : 'white'}
    >
      <Text c="black" size="md">{me.name || me.username}</Text>
    </Button>
  )
};
