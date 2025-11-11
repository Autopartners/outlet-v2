import { Alert, Anchor, Flex, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { ApCopyButton } from '@/shared/ui/Buttons/copyButton/copyButton';

interface ErrorAlertProps {
  error: string;
}

export const ErrorAlert = ({ error }: ErrorAlertProps) => {
  if (!error) { return <div />; }
  return (
    <>
      <Alert
        mt="xs"
        mb="xs"
        icon={<IconAlertCircle size="2rem" />}
        color="red"
        variant="outline"
      >
        {error}
      </Alert>
      <Text ta="center" fz={14} fw={600}>
        Если у вас возникли проблемы со входом, сообщите нам
      </Text>
      <Flex align="center" justify="center" gap={5} mb={20}>
        <Anchor fw={600} fz={14}>help@ap-ru.com</Anchor>
        <ApCopyButton value="help@ap-ru.com" variant="subtle"/>
      </Flex>
    </>
  );
};
