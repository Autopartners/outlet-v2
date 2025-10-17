import { Box, Card, Flex, Text, ThemeIcon } from '@mantine/core';
import type { Lot } from '@/entities/lot';
import { useNavigate } from 'react-router-dom';
import { IconBuildingSkyscraper, IconCalendar, IconRoad } from '@tabler/icons-react';
import { ApCarousel } from '@/shared/ui/Images/apCarousel.tsx';
import { useApp } from '@/app/providers/app/useApp';
import { MakeBidPopover } from '@/shared/ui/LotOperations/MakeBid/MakeBidPopover.tsx';
import { MakeFavourite } from '@/shared/ui/LotOperations/MakeFavourite';
import { stageStrings } from '@/shared/lib/constants';
import { useMe } from '@/app/providers/me/useMe';

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
  const { isAdmin, isRemarketing } = useMe();

  return (
    <Card
      onClick={(e) => {
        const target = e.target as HTMLElement;

        if (
          target.closest('.not-navigate') ||
          target.closest('input') ||
          target.closest('button') ||
          window.getSelection()?.toString().length
        ) { return; }

        nav(`/lots/${lot.id}`);
      }}
      style={{ cursor: 'pointer' }}
      withBorder
      p={0}
      mx="auto"
      maw={isMobile ? '90vw' : 415}
      w={isMobile ? '100%' : 415}
      classNames={{ root: !isMobile ? 'cardHover' : undefined }}
    >
      {!mobileSimplified && (
        <ApCarousel pictures={lot.sales_pictures.slice(0, maxPhotos || lot.sales_pictures.length - 1)} />
      )}
      <Box p={10} ta="left" w="100%">
        <Flex justify="space-between" align="flex-start" gap={10}>
          <Text fw="bold" fz={18} w="80%">
            {lot.definition_name}
            {(isAdmin || isRemarketing) && ` (${stageStrings[lot.stage]})`}
          </Text>
          <Card shadow="xs" withBorder p={5} w="20%">
            <Text fz={14} fw="bold" ta="center">
              {lot.code.replace('-', '\n')}
            </Text>
          </Card>
        </Flex>
        <Flex gap={10} justify="space-between" w="80%">
          <Flex align="center" mt={5}>
            <ThemeIcon variant="transparent" c="blue.7">
              <IconCalendar size={20} />
            </ThemeIcon>
            <Text fz={15}>
              {lot.vehicle_year_of_production}
            </Text>
          </Flex>
          <Flex align="center" mt={5}>
            <ThemeIcon variant="transparent" c="blue.7">
              <IconRoad size={20} />
            </ThemeIcon>
            <Text fz={15}>
              {Number(lot.return_km).toLocaleString('ru-RU')}
            </Text>
          </Flex>
          <Flex align="center" mt={5}>
            <ThemeIcon variant="transparent" c="blue.7">
              <IconBuildingSkyscraper size={20} />
            </ThemeIcon>
            <Text fz={15}>
              {lot.city_of_remarketing_name}
            </Text>
          </Flex>
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
          <MakeFavourite {...{ lot, page, per_page, params }} />
        </Flex>
      </Box>
    </Card>
  );
};