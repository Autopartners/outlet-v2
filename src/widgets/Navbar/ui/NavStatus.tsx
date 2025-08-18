import { Avatar, UnstyledButton, Text, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useMe } from '@/app/providers/me/useMe';
import { useApp } from '@/app/providers/app/useApp.ts';

export const NavStatus = () => {
  const { me } = useMe();
  const { isMobile } = useApp();
  return (
    <UnstyledButton component={Link} to="/profile/main">
      <Flex px="sm" gap="sm" align="center">
        <Avatar radius="xl" color="blue" />
        {!isMobile && <Text size="md">{me.name || me.username}</Text>}
      </Flex>
    </UnstyledButton>
  );
};
