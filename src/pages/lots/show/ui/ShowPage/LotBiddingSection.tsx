import { Box, Card, Flex, Grid, Stack, Tooltip, Text } from '@mantine/core';
import { useApp } from '@/app/providers/app/useApp.ts';
import { MakeBidInput } from '@/shared/ui/LotOperations/MakeBid/MakeBidInput.tsx';
import { IconMoodSad } from '@tabler/icons-react';
import type { Lot } from '@/entities/lot';

const stageStrings = {
  'preparing': 'Подготовка',
  'first_stage': 'Этап 1',
  'second_stage': 'Этап 2',
  'third_stage': 'Этап 3',
  'finished': 'Закончен'
};

export const LotBiddingSection = ({ lot }: {lot: Lot}) => {
  const { isMobile } = useApp();

  const isEnd = lot.stage === 'finished' || lot.stage === 'third_stage';
  const isStarted = lot.stage && lot.stage !== 'preparing';

  return (
    <Grid.Col span={{ base: 12, md: 5 }}>
      <Card radius="lg" bg="blue.9">
        <Tooltip label="Тут скоро будет инструкция">
          <Text ta="center" fz={isMobile ? 18 : 25} c="white">
            {stageStrings[lot.stage as keyof typeof stageStrings]}
          </Text>
        </Tooltip>
      </Card>
      <Box mt={20}>
        <Card radius="lg">
          <Stack>
            {lot.stage === 'second_stage' && (
              <Tooltip label="Максимально предложенная сумма из первого этапа">
                <Flex justify="space-between" align="flex-end">
                  <Text fz={20}>Текущая ставка</Text>
                  <Text fz={25} fw="bold" c="red.9">
                    {lot.second_stage_minimal_price?.toLocaleString('ru-RU') || 0} ₽
                  </Text>
                </Flex>
              </Tooltip>
            )}
            {lot.my_bid ? (
              <Flex justify="space-between" align="flex-end">
                <Text fz={20}>Ваша ставка</Text>
                <Text fz={25} fw="bold" c="blue.9">
                  {lot.my_bid.toLocaleString('ru-RU')} ₽
                </Text>
              </Flex>
            ) : (
              (isStarted || isEnd) && (
                <Flex gap={10} align="flex-end">
                  <Text fz={20}>Вы не сделали ставку</Text>
                  <IconMoodSad stroke={1.5} size={30} />
                </Flex>
              )
            )}
            {isEnd ? (
              <Card bg="red.1" radius="lg" p={10}>
                <Text c="red.9" ta="center" fw="bold" fz={20}>
                Второй этап завершен, ставку поставить нельзя
                </Text>
              </Card>
            ) : isStarted ? (
              <Stack>
                <Flex justify="space-between" align="flex-end" direction={{ base: 'column', sm: 'row' }} gap={10}>
                  <MakeBidInput lot={lot} bidMutationParams={{ variant: 'show' }} size="lg" />
                </Flex>
              </Stack>
            ) : (
              <Card bg="blue.1" radius="lg" p={10}>
                <Text c="blue.9" ta="center" fw="bold" fz={20}>
                Аукцион еще не начался
                </Text>
              </Card>
            )}
          </Stack>
        </Card>
      </Box>
    </Grid.Col>
  )
}