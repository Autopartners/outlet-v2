import { Box, Button, Card, Flex, Image, Stack, Text, ThemeIcon } from '@mantine/core';
import type { Lot } from '@/entities/lot/model/lot.ts';
import { ermurl } from '@/shared/lib/api.ts';
import { Carousel } from '@mantine/carousel';
import { useNavigate } from 'react-router-dom';
import { IconBuildingSkyscraper, IconHourglassHigh, IconHourglassLow, IconRoad } from '@tabler/icons-react';

interface LotCardProps {
    lot: Lot
    maxPhotos?: number;
}

export const LotCard = ({ lot, maxPhotos }: LotCardProps) => {
  const nav = useNavigate();

  return (
    <Card withBorder p={0} classNames={{ root: 'cardHover' }}>
      <Carousel withIndicators height={300}>
        {lot.sales_pictures.slice(0, maxPhotos || lot.sales_pictures.length - 1).map(pict => (
          <Carousel.Slide key={pict.id}>
            <Image style={{ objectPosition: 'center' }} h={300} src={ermurl + pict.url} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Box p={10} ta='left' w='100%'>
        <Text fw='bold' fz={20}>{lot.short_name.trim() || lot.vehicle_name.split(' ').slice(0, 2).join(' ')}, {lot.year}г.</Text>
        <Flex align='center' mt={5}>
          <ThemeIcon variant='transparent' c='blue.4'><IconHourglassHigh size={20} /></ThemeIcon>
          <Text fz={14}>Аукцион начинается <strong>{(new Date(lot.start_at)).toLocaleDateString()}</strong></Text>
        </Flex>
        <Flex align='center' mt={5}>
          <ThemeIcon variant='transparent' c='blue.4'><IconHourglassLow size={20} /></ThemeIcon>
          <Text fz={14}>Аукцион завершается <strong>{(new Date(lot.end_at)).toLocaleDateString()}</strong></Text>
        </Flex>
        <Flex align='center' mt={5}>
          <ThemeIcon variant='transparent' c='blue.4'><IconBuildingSkyscraper size={20} /></ThemeIcon>
          <Text fz={14}>Город <strong>{lot.vehicle.city_of_remarketing_name}</strong></Text>
        </Flex>
        <Flex align='center' mt={5}>
          <ThemeIcon variant='transparent' c='blue.4'><IconRoad size={20} /></ThemeIcon>
          <Text fz={14}>Пробег <strong>{lot.km.toLocaleString('ru-RU')} км</strong></Text>
        </Flex>
        <Flex mt={10} align='center' justify='space-between'>
          <Stack gap={0}>
            <Text fz={14}>Текущая ставка</Text>
            <Text fz={20} fw='bold' c='blue.4'>{lot.last_bid.toLocaleString('ru-RU')}₽</Text>
          </Stack>
          <Button variant='light' mr={20} w={150} onClick={() => nav(`/lots/${lot.id}`)}>Подробнее</Button>
        </Flex>
      </Box>
    </Card>
  )
}