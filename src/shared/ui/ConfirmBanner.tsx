import { IconInfoCircle } from '@tabler/icons-react';
import { Alert, Text } from '@mantine/core';

export const ConfirmBanner = () => (
  <Alert my={10} maw="90vw" icon={<IconInfoCircle />} title="Ограничено в доступе" color="red">
    <Text>Подтвердите телефон и почту в профиле для просмотра лотов</Text>
  </Alert>
)