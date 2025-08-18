import { IconHammer } from '@tabler/icons-react';
import { Anchor, Flex, Text } from '@mantine/core';

export const ServerUnavailable = () => (
  <Flex align="center" direction="column" mt="20%" gap={10}>
    <IconHammer size={80} />
    <Text ta={'center'} fz={20} c="black">
      Ведутся технические работы, попробуйте зайти позже
    </Text>
    <Text fz={18} c="gray">
      Technical work is underway, try to go later
    </Text>
    <Text fz={16} c="gray">
      По всем вопросам пишите: <Anchor href="mailto:help@ap-ru.com">help@ap-ru.com</Anchor>
    </Text>
  </Flex>
);
