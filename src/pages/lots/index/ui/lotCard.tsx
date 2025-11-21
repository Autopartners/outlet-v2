import { Badge, Box, Card, Flex, Text, ThemeIcon } from '@mantine/core';
import type { Lot } from '@/entities/lot';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconBuildingSkyscraper, IconCalendar, IconCrown, IconRoad } from '@tabler/icons-react';
import { ApCarousel } from '@/shared/ui/Images/apCarousel.tsx';
import { useApp } from '@/app/providers/app/useApp';
import { MakeBidPopover } from '@/shared/ui/LotOperations/MakeBid/MakeBidPopover.tsx';
import { MakeFavourite } from '@/shared/ui/LotOperations/MakeFavourite';
import { stageStrings } from '@/shared/lib/constants';
import { useMe } from '@/app/providers/me/useMe';

const StageBid = ({ stageNumber, amount }: { stageNumber: number, amount: number }) => {
  const { isMobile } = useApp();
  if (!amount) { return null; }

  return (
    <Flex direction="column" gap={4}>
      {isMobile ? (
        <Badge variant="light" px={5}>
          {stageNumber}
          {' '}
          Этап
        </Badge>
      ) : (
        <>
          <Badge variant="light" px={5}>
            {stageNumber}
            {' '}
            Этап
          </Badge>
          <Text fz={15}>
          Моя ставка
          </Text>
        </>
      )}
      <Text fz={{ base: 12, sm: 16 }} fw="bold" c="blue.7">
        {amount.toLocaleString('ru-RU')}
        {' '}
        ₽
      </Text>
    </Flex>
  );
};

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
  const { pathname } = useLocation();
  const isHistoryPage = pathname.includes('history');
  const { isMobile } = useApp();
  const isWinner = lot.is_winner;
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

        nav(isHistoryPage ? `/history/${lot.id}` : `/lots/${lot.id}`);
      }}
      styles={{
        root: {
          cursor: 'pointer',
          border: isWinner ? '3px solid transparent' : undefined,
          background: isWinner
            ? 'linear-gradient(135deg, #f0fff4, #e6fffa), linear-gradient(135deg, #00b894, #00cec9, #0984e3)'
            : undefined,
          backgroundOrigin: isWinner ? 'border-box' : undefined,
          backgroundClip: isWinner ? 'content-box, border-box' : undefined,
          boxShadow: isWinner ? '0 8px 25px rgba(0, 184, 148, 0.3)' : undefined,
        }
      }}
      withBorder
      p={0}
      mx="auto"
      maw={isMobile ? '90vw' : 475}
      w={isMobile ? '100%' : 475}
      classNames={{ root: !isMobile ? 'cardHover' : undefined }}
    >
      {isWinner && (
        <Flex align="center" justify="center" gap={10}>
          <ThemeIcon variant="light" color="cyan" size="md">
            <IconCrown size={isMobile ? 20 : 30} />
          </ThemeIcon>
          <Text
            fw={700}
            variant="gradient"
            gradient={{ from: 'green.6', to: 'cyan.5', deg: 135 }}
          >
            Вы победитель!
          </Text>
        </Flex>
      )}
      {!mobileSimplified && (
        <ApCarousel pictures={lot.sales_pictures.slice(0, maxPhotos || lot.sales_pictures.length - 1)} />
      )}
      <Box p={10} ta="left" w="100%">
        <Flex justify="space-between" align="flex-start" gap={10}>
          <Text fw="bold" fz={18} w="80%">
            {lot.definition_name}
            {(isAdmin || isRemarketing) && (
              <Text fw="bold" fz={18} c="blue.7" span>
                {' ('}
                {stageStrings[lot.stage]}
                )
              </Text>
            )}
          </Text>
          <Card shadow="xs" withBorder p={5} w="20%">
            <Text fz={14} fw="bold" ta="center">
              {isMobile ? lot.code.replace('-', '\n') : lot.code}
            </Text>
          </Card>
        </Flex>
        <Flex gap={{ base: 10, sm: 20 }} w="80%">
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

        <Flex mt={10} align="flex-end" justify="space-between">
          { ((lot.see_second_stage && lot.stage === 'second_stage') || (lot.see_second_stage && isHistoryPage)) && (
            <Flex direction="column" gap={4}>
              <Text fz={{ base: 12, sm: 15 }}>Текущая ставка</Text>
              <Text fz={{ base: 12, sm: 16 }} fw="bold" c="red.9">
                {Number(lot.second_stage_minimal_price).toLocaleString('ru-RU')}
                {' '}
              ₽
              </Text>
            </Flex>
          )}

          <StageBid
            stageNumber={1}
            amount={lot.my_first_stage_amount}
          />

          <StageBid
            stageNumber={2}
            amount={lot.my_second_stage_amount}
          />

          <Flex gap={10} align="center">
            {['first_stage', 'second_stage'].includes(lot.stage) && (
              <MakeBidPopover
                small={(!!lot.my_second_stage_amount && lot.stage === 'second_stage') ||
                (!!lot.my_first_stage_amount && lot.stage === 'first_stage')}
                {...{ lot, page, per_page, params }}
              />
            )}
            <MakeFavourite {...{ lot, page, per_page, params }} />
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};
