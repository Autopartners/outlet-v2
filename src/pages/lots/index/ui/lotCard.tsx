import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  NumberInput,
  Popover,
  Text,
  ThemeIcon,
  Loader as MantineLoader, Tooltip
} from '@mantine/core';
import type { Lot } from '@/entities/lot';
import { useNavigate } from 'react-router-dom';
import { IconBuildingSkyscraper, IconRoad, IconStar } from '@tabler/icons-react';
import { ApCarousel } from '@/shared/ui/apCarousel.tsx';
import { useState } from 'react';
import { useBid } from '@/pages/lots/show/api/useBid.ts';

interface LotCardProps {
  lot: Lot;
  maxPhotos?: number;
  refetchLots: () => void;
}

export const LotCard = ({ lot, maxPhotos, refetchLots }: LotCardProps) => {
  const nav = useNavigate();
  const [opened, setOpened] = useState(false);
  const [bid, setBid] = useState<string | number | undefined>('');
  const { bidMutation } = useBid();

  return (
    <Card h={490} withBorder p={0} classNames={{ root: 'cardHover' }}>
      <ApCarousel pictures={lot.sales_pictures_limited.slice(0, maxPhotos || lot.sales_pictures_limited.length - 1)} />
      <Box p={10} ta="left" w="100%">
        <Flex justify="space-between">
          <Text fw="bold" fz={20}>
            {lot.definition_short_name.trim() || lot.definition_name.split(' ').slice(0, 2).join(' ')}, {lot.vehicle_year_of_production} г.
          </Text>
          <Card shadow="xs" withBorder p={5}><Text fz={14} fw="bold">{lot.code}</Text></Card>
        </Flex>
        <Flex align="center" mt={5}>
          <ThemeIcon variant="transparent" c="blue.7"><IconBuildingSkyscraper size={20} /></ThemeIcon>
          <Text fz={14}>Город <strong>{lot.city_of_remarketing_name}</strong></Text>
        </Flex>
        <Flex align="center" mt={5}>
          <ThemeIcon variant="transparent" c="blue.7"><IconRoad size={20} /></ThemeIcon>
          <Text fz={14}>Пробег <strong>{Number(lot.return_km).toLocaleString('ru-RU')} км</strong></Text>
        </Flex>
        <Flex mt={20} h={50} align="center" justify="space-between">
          {lot.my_bid ? (
            <Flex direction="column">
              <Text fz={14}>Ваша ставка</Text>
              <Text fz={20} fw="bold" c="blue.7">{lot.my_bid.toLocaleString('ru-RU')} ₽</Text>
            </Flex>
          ) : ((lot.stage === 'first_stage' || lot.stage === 'second_stage') && (
            <Flex direction="column">
              <Popover width={200} position="bottom" opened={opened} onChange={setOpened} withArrow shadow="md">
                <Popover.Target>
                  <Button variant="default" onClick={() => setOpened(!opened)}>Сделать ставку</Button>
                </Popover.Target>
                <Popover.Dropdown w={250}>
                  {lot.stage === 'second_stage' && (
                    <Tooltip label="Максимально предложенная сумма из первого этапа">
                      <Flex direction="column" align="flex-start">
                        <Text fz={16}>Текущая ставка</Text>
                        <Text fz={18} fw="bold" c="red.9">
                          {lot.second_stage_minimal_price?.toLocaleString('ru-RU') || 0} ₽
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
                    thousandSeparator={' '}
                    value={bid}
                    step={100000}
                    onChange={setBid}
                  />
                  <Button
                    mt={10}
                    w="100%"
                    onClick={() => {
                      bidMutation.mutate({ value: bid, lot_id: String(lot.id) });
                      refetchLots();
                      setOpened(false);
                    }}
                    color="green.7"
                    disabled={!bid || Number(bid) < (lot.second_stage_minimal_price ?? 0)}
                    leftSection={bidMutation.status === 'pending' && <MantineLoader type="dots" color="white" />}
                  >
                    Сохранить
                  </Button>
                </Popover.Dropdown>
              </Popover>
            </Flex>
          ))}
          <Flex gap={10}>
            <Button variant="light" color="blue.7" w={150} onClick={() => nav(`/lots/${lot.id}`)}>Подробнее</Button>
            <ActionIcon size="lg" color="yellow.3" variant="transparent">
              <IconStar />
            </ActionIcon>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};