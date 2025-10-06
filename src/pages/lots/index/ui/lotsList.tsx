import { Box, Container, Flex, SimpleGrid, ThemeIcon, Text, Alert, ActionIcon, Button, Popover, Tooltip, NumberInput,
  Loader as MantineLoader, Table } from '@mantine/core';
import { useLots } from '@/pages/lots/index/api/useLots.ts';
import type { Lot } from '@/entities/lot';
import { useSearchParams } from 'react-router-dom';
import { LotCard } from '@/pages/lots/index/ui/lotCard.tsx';
import { LotPages } from '@/pages/lots/index/ui/lotPages.tsx';
import { LotsListSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsListSkeletonLoader.tsx';
import { IconCurrencyRubel, IconHourglassHigh, IconHourglassLow, IconList } from '@tabler/icons-react';
import { useApp } from '@/app/providers/app/useApp';
import { useState } from 'react';
import { IconLayoutGridFilled } from '@tabler/icons-react';
import { useBid } from '@/pages/lots/show/api/useBid.ts';
import { LotsTableSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsTableSkeletonLoader.tsx';
import { useNavigate } from 'react-router';

export const LotsList = () => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useApp();
  const [openedLotId, setOpenedLotId] = useState<number | null>(null);
  const [bid, setBid] = useState<string | number | undefined>('');
  const { bidMutation } = useBid();
  const nav = useNavigate();
  const [activeView, setActiveView] = useState('table');
  const page = searchParams.get('page') || '1';
  const per_page = '12';
  const params = {
    started: 'true',
    liked: searchParams.get('liked'),
    q: {
      vehicle_vehicle_model_id_eq: searchParams.get('vehicle_model_id'),
      vehicle_vehicle_brand_id_eq: searchParams.get('vehicle_brand_id'),
      vehicle_city_of_remarketing_id_eq: searchParams.get('city_id')
    }
  };
  const { lots, isLoading, pages, refetch } = useLots({
    page,
    per_page,
    params
  });

  if (isLoading || !lots) {
    return activeView === 'cards'
      ? <LotsListSkeletonLoader />
      : <LotsTableSkeletonLoader />;
  }

  if (lots.length === 0) {
    return (
      <Container size="xl">
        <Flex justify="center" align="center" mt={isMobile ? 300 : 140}>
          <Alert w="fit-content" radius="md" color="gray">
            <Text ta="center" px={20}>Доступных лотов нет</Text>
          </Alert>
        </Flex>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <LotPages pages={pages} pos="top" />
      <Alert variant="light" color="blue" radius="md" mt={50}>
        <Flex direction="column">
          <Flex align="center" justify="flex-start">
            <ThemeIcon variant="transparent" c="blue.7"><IconHourglassHigh size={20} /></ThemeIcon>
            <Text fz={14}>Аукцион начинается <strong>{(new Date(lots[0]?.start_at)).toLocaleString()}</strong></Text>
          </Flex>
          <Flex align="center" justify="flex-start" mt={5}>
            <ThemeIcon variant="transparent" c="blue.7"><IconHourglassLow size={20} /></ThemeIcon>
            <Text fz={14}>Аукцион
              завершается <strong>{(new Date(lots[0]?.end_at)).toLocaleString()}</strong></Text>
          </Flex>
        </Flex>
      </Alert>
      <Flex justify="flex-end" gap={5} mt={10}>
        <ActionIcon
          onClick={() => setActiveView('table')}
          variant={activeView === 'table' ? 'filled' : 'subtle'}
          size="xl"
          c={activeView === 'table' ? 'white' : 'dark'}
        >
          <IconList size={32} />
        </ActionIcon>
        <ActionIcon
          onClick={() => setActiveView('cards')}
          variant={activeView === 'cards' ? 'filled' : 'subtle'}
          size="xl"
          c={activeView === 'cards' ? 'white' : 'dark'}
        >
          <IconLayoutGridFilled size={32} />
        </ActionIcon>
      </Flex>
      {activeView === 'cards' &&
        <SimpleGrid spacing={30} mt={20} cols={{ lg: 3, sm: 1 }}>
          {lots.map((lot: Lot) => (
            <Box key={lot.id}>
              <LotCard
                lot={lot}
                maxPhotos={5}
                page={page}
                per_page={per_page}
                params={params}
                refetchLots={refetch}
              />
            </Box>
          ))}
        </SimpleGrid>
      }
      {activeView === 'table' &&
        <Table
          mt={50}
          highlightOnHover
          verticalSpacing="sm"
        >
          <Table.Thead>
            <Table.Tr fz={16}>
              <Table.Th>Код</Table.Th>
              <Table.Th>Описание</Table.Th>
              <Table.Th>Год</Table.Th>
              <Table.Th>Город</Table.Th>
              <Table.Th>Пробег</Table.Th>
              <Table.Th>Моя ставка</Table.Th>
              <Table.Th>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {lots.map((lot: Lot) => (
              <Table.Tr key={lot.id}>
                <Table.Td>
                  <Button
                    onClick={() => nav(`${lot.id}`)}
                    variant="light"
                    color="dark"
                  >
                    <Text fz={14} fw="bold">{lot.code}</Text>
                  </Button>
                </Table.Td>

                <Table.Td>
                  <Button
                    onClick={() => nav(`${lot.id}`)}
                    variant="subtle"
                    color="blue.7"
                  >
                    <Text fz={16} fw="bold">{lot.definition_name}</Text>
                  </Button>
                </Table.Td>

                <Table.Td>
                  <Text>{lot.vehicle_year_of_production}</Text>
                </Table.Td>

                <Table.Td>
                  <Text>{lot.city_of_remarketing_name}</Text>
                </Table.Td>

                <Table.Td>
                  <Text>{Number(lot.return_km).toLocaleString('ru-RU')} км</Text>
                </Table.Td>

                <Table.Td>
                  <Tooltip label="Моя ставка">
                    <Flex align="center" justify="start">
                      {lot.my_bid && <IconCurrencyRubel stroke={2} size={20} />}
                      <Text fz={20} fw="bold">
                        {lot.my_bid?.toLocaleString('ru-RU')}
                      </Text>
                    </Flex>
                  </Tooltip>
                </Table.Td>

                <Table.Td>
                  <Popover
                    width={200}
                    position="bottom"
                    opened={openedLotId === lot.id}
                    onChange={(o) => setOpenedLotId(o ? lot.id : null)}
                    withArrow
                    shadow="md"
                  >
                    <Popover.Target>
                      <Button
                        color="green.7"
                        onClick={() => setOpenedLotId(openedLotId === lot.id ? null : lot.id)}
                      >
                        Сделать ставку
                      </Button>
                    </Popover.Target>

                    <Popover.Dropdown w={250}>
                      {lot.stage === 'second_stage' && (
                        <Tooltip label="Максимально предложенная сумма из первого этапа">
                          <Flex direction="column" align="flex-start">
                            <Text fz={16}>Текущая ставка</Text>
                            <Text fz={18} fw="bold" c="red.9">
                              {lot.second_stage_minimal_price?.toLocaleString('ru-RU') || 0}
                              {' '}
                              ₽
                            </Text>
                          </Flex>
                        </Tooltip>
                      )}

                      <NumberInput
                        max={100000000}
                        mt="xs"
                        size="md"
                        placeholder="Ставка"
                        allowDecimal={false}
                        allowNegative={false}
                        thousandSeparator=" "
                        value={bid}
                        step={100000}
                        onChange={setBid}
                      />

                      <Button
                        mt={10}
                        w="100%"
                        onClick={() => {
                          bidMutation.mutate({
                            value: bid,
                            lot_id: String(lot.id),
                          });
                          setOpenedLotId(null);
                        }}
                        color="green.7"
                        disabled={!bid || Number(bid) < (lot.second_stage_minimal_price ?? 0)}
                        leftSection={bidMutation.status === 'pending' && <MantineLoader type="dots" color="white" />}
                      >
                        Сохранить
                      </Button>
                    </Popover.Dropdown>
                  </Popover>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      }
      <LotPages pages={pages} pos="bottom" />
    </Container>);
};