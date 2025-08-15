import { Box, Button, Card, Flex, Image, Stack, Text, ThemeIcon } from '@mantine/core';
import type { Lot } from '@/entities/lot/model/lot.ts';
import { ermurl } from '@/shared/lib/api.ts';
import { Carousel } from '@mantine/carousel';
import { useNavigate } from 'react-router-dom';
import { IconClockHour8 } from '@tabler/icons-react';

interface LotCardProps {
    lot: Lot
}

export const LotCard = ({ lot }: LotCardProps) => {
  const nav = useNavigate();

  return (
    <Card withBorder p={0} classNames={{ root: 'cardHover' }}>
      <Carousel withIndicators height={300}>
        {lot.sales_pictures.map(pict => (
          <Carousel.Slide key={pict.id}>
            <Image style={{ objectPosition: 'center' }} h={300} src={ermurl + pict.url} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Box p={10} ta='left' w='100%'>
        <Text fw='bold' fz={20}>{lot.short_name}, {lot.year}г., {lot.km}км</Text>
        <Flex align='center' mt={5}>
          <ThemeIcon variant='transparent' c='blue.4'><IconClockHour8 size={20} /></ThemeIcon>
          <Text fz={14}>Аукцион завершается {(new Date(lot.end_at)).toLocaleDateString()}</Text>
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