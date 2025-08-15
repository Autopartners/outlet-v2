import { Avatar, UnstyledButton, Text, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useMe } from '@/app/providers/me/useMe';

export const NavStatus = () => {
  const { me } = useMe();
  return (
    <UnstyledButton component={Link} to='/profile'>
      <Flex px='sm' gap='sm' align='center'>
        <Avatar radius='xl' color='blue' />
        <Text size='md'>{me.name}</Text>
      </Flex>
    </UnstyledButton>
  );
};
