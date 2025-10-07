import { Alert, Flex, Text } from '@mantine/core';

export const NoAvailableLots = ({ ...props }) => (
  <Flex mx='auto' justify="center" align="center" {...props}>
    <Alert w="fit-content" radius="md" color="gray">
      <Text ta="center" px={20}>Доступных лотов нет</Text>
    </Alert>
  </Flex>
)