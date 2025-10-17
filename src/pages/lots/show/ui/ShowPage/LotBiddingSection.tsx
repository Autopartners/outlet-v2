import { Box, Card, Flex, Grid, Stack, Tooltip, Text, Badge, ThemeIcon } from '@mantine/core';
import { useApp } from '@/app/providers/app/useApp.ts';
import { MakeBidInput } from '@/shared/ui/LotOperations/MakeBid/MakeBidInput.tsx';
import type { Lot } from '@/entities/lot';
import { stageStrings } from '@/shared/lib/constants';
import { IconPercentage33 } from '@tabler/icons-react';

export const LotBiddingSection = ({ lot }: {lot: Lot}) => {
  const { isMobile } = useApp();

  const isEnd = lot.stage === 'finished' || lot.stage === 'third_stage';
  const isStarted = lot.stage && lot.stage !== 'preparing';

  return (
    <Grid.Col span={{ base: 12, md: 5 }}>
      <Box mt={20}>
        <Card radius="lg">
          <Stack>
            <Card bg="gray.2">
              <Flex justify="center" align="center" gap={10}>
                <ThemeIcon variant="transparent" c="blue.7"><IconPercentage33 size={20} /></ThemeIcon>
                <Text ta="left" fz={isMobile ? 18 : 25} c="black">
                  {stageStrings[lot.stage as keyof typeof stageStrings]}
                </Text>
              </Flex>
            </Card>
            {lot.stage === 'second_stage' && (
              <Tooltip label="Максимально предложенная сумма из первого этапа">
                <Flex justify="space-between" align="flex-end">
                  <Text fz={20}>Текущая ставка</Text>
                  <Text fz={25} fw="bold" c="red.9">
                    {lot.second_stage_minimal_price?.toLocaleString('ru-RU') || 0}
                    {' '}
                    ₽
                  </Text>
                </Flex>
              </Tooltip>
            )}
            <Box>
              {lot.my_first_stage_amount && (
                <Flex justify="space-between" align={isMobile ? 'flex-start' : 'center'} direction={isMobile ? 'column' : 'row'}>
                  <Flex align="center" gap={10}>
                    <Text fz={18}>Моя ставка</Text>
                    <Badge variant="light">1 этап</Badge>
                  </Flex>
                  <Text fz={25} fw="bold" c="blue.9">
                    {lot.my_first_stage_amount.toLocaleString('ru-RU')}
                    {' '}
                  ₽
                  </Text>
                </Flex>
              )}
            </Box>
            <Box>
              {lot.my_second_stage_amount && (
                <Flex justify="space-between" align={isMobile ? 'flex-start' : 'center'} direction={isMobile ? 'column' : 'row'}>
                  <Flex align="center" gap={10}>
                    <Text fz={18}>Моя ставка</Text>
                    <Badge variant="light">2 этап</Badge>
                  </Flex>
                  <Text fz={25} fw="bold" c="blue.9">
                    {lot.my_second_stage_amount.toLocaleString('ru-RU')}
                    {' '}
                  ₽
                  </Text>
                </Flex>
              )}
            </Box>
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
  );
};