import { Alert, Flex, type FlexProps, Text } from '@mantine/core';
import type { AxiosError } from 'axios';

export const LoadError = ({ error, ...props }: { error: AxiosError } & FlexProps) => (
  <Flex mx='auto' justify="center" align="center" {...props}>
    <Alert w="fit-content" radius="md" color="red.4">
      <Text ta="center" px={20}>Ошибка {error.status}</Text>
    </Alert>
  </Flex>
)