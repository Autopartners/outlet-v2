import { Alert, Divider, Flex, Text, ThemeIcon } from '@mantine/core';
import { IconClockX, IconHourglassHigh, IconHourglassLow } from '@tabler/icons-react';
import type { Lot } from '@/entities/lot';
import Countdown from 'react-countdown';
import { useApp } from '@/app/providers/app/useApp';
import dayjs from 'dayjs';


export const AuctionCountdown = ({ lots }: {lots: Lot[]}) => {
  const { isMobile } = useApp();
  const started = lots[0].stage === 'preparing' && dayjs().isBefore(dayjs(lots[0].start_at));
  const date = started ? lots[0].start_at : lots[0]?.end_at;

  return (
    <Alert variant="light" color="blue" radius="md" mt={50} px={10}>
      <Flex direction="column">
        <Flex align="center" justify="flex-start" gap={5}>
          <ThemeIcon variant="transparent" c="blue.7"><IconHourglassHigh size={20} /></ThemeIcon>
          <Text fz={14}>
            Аукцион начинается:
            {isMobile ? <br /> : ' '}
            <strong>{(new Date(lots[0]?.start_at)).toLocaleString()}</strong>
          </Text>
        </Flex>
        <Divider mt={10} color="blue.3" />
        <Flex align="center" justify="flex-start" mt={5} gap={5}>
          <ThemeIcon variant="transparent" c="blue.7"><IconHourglassLow size={20} /></ThemeIcon>
          <Text fz={14}>
            Аукцион завершается:
            {isMobile ? <br /> : ' '}
            <strong>{(new Date(lots[0]?.end_at)).toLocaleString()}</strong>
          </Text>
        </Flex>
        <Flex align="center" justify="flex-start" mt={5} gap={5}>
          <ThemeIcon variant="transparent" c="blue.7"><IconClockX size={20} /></ThemeIcon>
          <Text fz={14}>
            {started ? 'До начала:' : 'До завершения:'}
            {isMobile ? <br /> : ' '}
            <Countdown
              date={date || ''}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) { return <strong>завершён</strong>; }
                if (days > 0) { return <strong>{`${days}д ${hours}ч ${minutes}м`}</strong>; }
                return (
                  <strong>
                    {hours.toString().padStart(2, '0') +
                    ':' + minutes.toString().padStart(2, '0') +
                    ':' + seconds.toString().padStart(2, '0')}
                  </strong>
                );
              }}
            />
          </Text>
        </Flex>
      </Flex>
    </Alert>
  );
};