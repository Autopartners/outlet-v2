import { Alert, Divider, Flex, Text, ThemeIcon } from '@mantine/core';
import { IconHourglassHigh, IconHourglassLow, IconPercentage33 } from '@tabler/icons-react';
import type { Lot } from '@/entities/lot';
import { useApp } from '@/app/providers/app/useApp';
import { stageStrings } from '@/shared/lib/constants';


export const AuctionCountdown = ({ lots }: { lots: Lot[] }) => {
  const { isMobile } = useApp();

  return (
    <Alert variant="light" color="blue" radius="md" mt={20} px={{ base: 0, sm: 30 }}>
      <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 0, sm: 20 }}>
        <Flex align="center" justify="flex-start" gap={5}>
          <ThemeIcon variant="transparent" c="blue.7"><IconHourglassHigh size={20} /></ThemeIcon>
          <Text fz={14}>
            Аукцион начинается:
            {isMobile ? <br /> : ' '}
            <strong>{(new Date(lots[0]?.start_at)).toLocaleString()}</strong>
          </Text>
        </Flex>
        <Divider mt={10} color="blue.3" />
        <Flex align="center" justify="flex-start" mt={{ base: 10, sm: 0 }} gap={5}>
          <ThemeIcon variant="transparent" c="blue.7"><IconHourglassLow size={20} /></ThemeIcon>
          <Text fz={14}>
            Аукцион завершается:
            {isMobile ? <br /> : ' '}
            <strong>{(new Date(lots[0]?.end_at)).toLocaleString()}</strong>
          </Text>
        </Flex>
        <Divider mt={10} color="blue.3" />
        <Flex align="center" justify="flex-start" mt={{ base: 10, sm: 0 }} gap={5}>
          <ThemeIcon variant="transparent" c="blue.7"><IconPercentage33 size={20} /></ThemeIcon>
          <Text fz={14}>
            <strong>{stageStrings[lots[0].stage]}</strong>
          </Text>
        </Flex>
      </Flex>
    </Alert>
  );
};