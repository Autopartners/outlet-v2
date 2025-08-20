import { ActionIcon, Box, Button, Card, Flex, NumberInput, Popover, Stack, Text, ThemeIcon, Loader as MantineLoader } from '@mantine/core';
import type { Lot } from '@/entities/lot/lot.ts';
import { useNavigate } from 'react-router-dom';
import { IconBuildingSkyscraper, IconHourglassHigh, IconHourglassLow, IconRoad, IconStar } from '@tabler/icons-react';
import { ApCarousel } from '@/shared/ui/apCarousel.tsx';
import { useState } from 'react';
import { useBid } from '@/pages/lots/show/api/useBid.ts';

interface LotCardProps {
    lot: Lot
    maxPhotos?: number;
    refetchLots: () => void;
}

export const LotCard = ({ lot, maxPhotos, refetchLots }: LotCardProps) => {
  const nav = useNavigate();
  const [bid, setBid] = useState<string | number | undefined>('');
  const { bidMutation } = useBid()

  return (
    <Card withBorder p={0} classNames={{ root: 'cardHover' }}>
      <ApCarousel pictures={lot.sales_pictures.slice(0, maxPhotos || lot.sales_pictures.length - 1)} />
      <Box p={10} ta='left' w='100%'>
        <Flex justify='space-between'>
          <Text fw='bold' fz={20}>
            {lot.short_name.trim() || lot.vehicle_name.split(' ').slice(0, 2).join(' ')}, {lot.year} г.
          </Text>
          <Card shadow={'xs'} withBorder p={5}><Text fz={14} fw={'bold'}>{lot.code}</Text></Card>
        </Flex>
        <Flex align='center' mt={5}>
          <ThemeIcon variant='transparent' c='blue.7'><IconHourglassHigh size={20} /></ThemeIcon>
          <Text fz={14}>Аукцион начинается <strong>{(new Date(lot.start_at)).toLocaleDateString()}</strong></Text>
        </Flex>
        <Flex align='center' mt={5}>
          <ThemeIcon variant='transparent' c='blue.7'><IconHourglassLow size={20} /></ThemeIcon>
          <Text fz={14}>Аукцион завершается <strong>{(new Date(lot.end_at)).toLocaleDateString()}</strong></Text>
        </Flex>
        <Flex align='center' mt={5}>
          <ThemeIcon variant='transparent' c='blue.7'><IconBuildingSkyscraper size={20} /></ThemeIcon>
          <Text fz={14}>Город <strong>{lot.vehicle.city_of_remarketing_name}</strong></Text>
        </Flex>
        <Flex align='center' mt={5}>
          <ThemeIcon variant='transparent' c='blue.7'><IconRoad size={20} /></ThemeIcon>
          <Text fz={14}>Пробег <strong>{lot.km.toLocaleString('ru-RU')} км</strong></Text>
        </Flex>
        <Flex mt={10} align='center' justify='space-between'>
          {lot.my_last_bid ? (
            <Stack gap={0}>
              <Text fz={14}>Ваша ставка</Text>
              <Text fz={20} fw='bold' c={'blue.7'}>{lot.my_last_bid.toLocaleString('ru-RU')}₽</Text>
            </Stack>
          ) : (
            <Stack gap={0}>
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Button variant={'default'}>Сделать ставку</Button>
                </Popover.Target>
                <Popover.Dropdown w={250}>
                  <NumberInput
                    max={100000000}
                    size={'md'}
                    placeholder={'Ставка'}
                    allowDecimal={false}
                    allowNegative={false}
                    thousandSeparator={' '}
                    value={bid}
                    step={100000}
                    onChange={setBid}
                  />
                  <Button
                    mt={10}
                    w={'100%'}
                    onClick={() => {
                      bidMutation.mutate({ value: bid, lot_id: String(lot.id) });
                      refetchLots();
                    }}
                    color='green.7'
                    disabled={!bid}
                    leftSection={bidMutation.status === 'pending' && <MantineLoader type='dots' color='white' />}
                  >
                      Сохранить
                  </Button>
                </Popover.Dropdown>
              </Popover>
            </Stack>
          )}
          <Flex gap={10}>
            <Button variant='light' color={'blue.7'} w={150} onClick={() => nav(`/lots/${lot.id}`)}>Подробнее</Button>
            <ActionIcon size={'lg'} color={'yellow.3'} variant={'transparent'} >
              <IconStar />
            </ActionIcon>
          </Flex>
        </Flex>
      </Box>
    </Card>
  )
}