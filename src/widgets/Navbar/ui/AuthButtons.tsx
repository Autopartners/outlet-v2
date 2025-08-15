import { Modal, Button, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { connecturl } from '@/shared/lib/api';

type Me = {
  id?: number | null;
};

interface AuthButtonsProps {
  isMobile: boolean;
  me: Me;
  loading: boolean;
}

export const AuthButtons = ({ isMobile, me, loading }: AuthButtonsProps) => {
  const [opened, setOpened] = useState(false);
  const open = () => setOpened(true);
  const close = () => setOpened(false);

  if (loading || me.id) {
    return null;
  }

  if (isMobile) {
    return (
      <>
        <Modal opened={opened} onClose={close} title="Вход и регистрация">
          <Flex gap="md" direction="column">
            <Button component={Link} variant="outline" to={`${connecturl}login`}>
              Войти
            </Button>
            <Button component={Link} to={`${connecturl}signup#outlet`}>
              Зарегистрироваться
            </Button>
          </Flex>
        </Modal>
        <Button size="md" variant="default" onClick={open}>
          Войти
        </Button>
      </>
    );
  }

  // Desktop
  return (
    <Flex gap="md">
      <Button component={Link} variant="outline" to={`${connecturl}/login`}>
        Войти
      </Button>
      <Button component={Link} to={`${connecturl}/signup#outlet`}>
        Зарегистрироваться
      </Button>
    </Flex>
  );
};
