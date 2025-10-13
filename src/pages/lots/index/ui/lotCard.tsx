import { Box, Button, Card, Flex, Text, ThemeIcon } from '@mantine/core';
import type { Lot } from '@/entities/lot';
import { useNavigate } from 'react-router-dom';
import { IconBuildingSkyscraper, IconRoad } from '@tabler/icons-react';
import { ApCarousel } from '@/shared/ui/Images/apCarousel.tsx';
import { useApp } from '@/app/providers/app/useApp';
import { MakeBidPopover } from '@/shared/ui/LotOperations/MakeBid/MakeBidPopover.tsx';
import { MakeFavourite } from '@/shared/ui/LotOperations/MakeFavourite';

interface LotCardProps {
  lot: Lot;
  maxPhotos?: number;
  page: string;
  per_page: string;
  params: object;
  mobileSimplified?: boolean;
}

export const LotCard = ({ lot, maxPhotos, page, per_page, params, mobileSimplified = false }: LotCardProps) => {
  const nav = useNavigate();
  const { isMobile } = useApp();

  return (
    <Card withBorder p={0} mx="auto" classNames={{ root: !isMobile ? 'cardHover' : undefined }}>
      {!mobileSimplified && (
        <ApCarousel
          pictures={lot.sales_pictures_limited
            .sort((a, b) => Number(a.is_avatar) + Number(b.is_avatar))
            .slice(0, maxPhotos || lot.sales_pictures_limited.length - 1)}
        />
      )}
      <Box p={10} ta="left" w="100%">
        <Flex justify="space-between" align="flex-start" gap={10}>
          <Text fw="bold" fz={18} w="80%">
            {lot.definition_name}
            ,
            {' '}
            {lot.vehicle_year_of_production}
            {' '}
            г.
          </Text>
          <Card shadow="xs" withBorder p={5} w="20%">
            <Text fz={14} fw="bold" ta="center">
              {lot.code.replace('-', '\n')}
            </Text>
          </Card>
        </Flex>
        <Flex align="center" mt={5}>
          <ThemeIcon variant="transparent" c="blue.7">
            <IconBuildingSkyscraper size={20} />
          </ThemeIcon>
          <Text fz={14}>
            Город
            {' '}
            <strong>{lot.city_of_remarketing_name}</strong>
          </Text>
        </Flex>
        <Flex align="center" mt={5}>
          <ThemeIcon variant="transparent" c="blue.7">
            <IconRoad size={20} />
          </ThemeIcon>
          <Text fz={14}>
            Пробег
            {' '}
            <strong>
              {Number(lot.return_km).toLocaleString('ru-RU')}
              {' '}
              км
            </strong>
          </Text>
        </Flex>
        <Flex mt={10} h={50} align="center" justify="space-between">
          {lot.my_bid ? (
            <Flex direction="column">
              <Text fz={14}>Ваша ставка</Text>
              <Text fz={20} fw="bold" c="blue.7">
                {lot.my_bid.toLocaleString('ru-RU')}
                {' '}
                ₽
              </Text>
            </Flex>
          ) : (
            (lot.stage === 'first_stage' || lot.stage === 'second_stage') &&
            <MakeBidPopover {...{ lot, page, per_page, params }} />
          )}
          <Flex gap={10}>
            <Button variant="light" color="blue.7" w={150} onClick={() => nav(`/lots/${lot.id}`)}>
              Подробнее
            </Button>
            <MakeFavourite {...{ lot, page, per_page, params }} />
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};