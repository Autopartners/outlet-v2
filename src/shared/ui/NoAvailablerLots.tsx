import { Alert, Flex, Text } from '@mantine/core';
import { useApp } from '@/app/providers/app/useApp';

export const NoAvailablerLots = () => {
  const { isMobile } = useApp();

  return <Flex mx='auto' justify="center" align="center" mt={isMobile ? 300 : 140}>
    <Alert w="fit-content" radius="md" color="gray">
      <Text ta="center" px={20}>Доступных лотов нет</Text>
    </Alert>
  </Flex>
}