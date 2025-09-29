import { Box, Container, Flex, SimpleGrid, ThemeIcon, Text, Alert } from '@mantine/core';
import { useLots } from '@/pages/lots/index/api/useLots.ts';
import type { Lot } from '@/entities/lot';
import { useSearchParams } from 'react-router-dom';
import { LotCard } from '@/pages/lots/index/ui/lotCard.tsx';
import { LotPages } from '@/pages/lots/index/ui/lotPages.tsx';
import { LotsListSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsListSkeletonLoader.tsx';
import { IconHourglassHigh, IconHourglassLow } from '@tabler/icons-react';
import { useApp } from '@/app/providers/app/useApp';

export const LotsList = () => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useApp();
  const { lots, isLoading, pages, refetch } = useLots({
    page: searchParams.get('page') || '1',
    per_page: '12',
    params: {
      started: 'true',
      q: {
        vehicle_vehicle_model_id_eq: searchParams.get('vehicle_model_id'),
        vehicle_vehicle_brand_id_eq: searchParams.get('vehicle_brand_id'),
        vehicle_city_of_remarketing_id_eq: searchParams.get('city_id')
      }
    }
  });

  if (isLoading || !lots) {
    return <LotsListSkeletonLoader />;
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
      <SimpleGrid spacing={30} mt={20} cols={{ lg: 3, sm: 1 }}>
        {lots.map((lot: Lot) => (
          <Box key={lot.id}>
            <LotCard lot={lot} maxPhotos={5} refetchLots={refetch} />
          </Box>
        ))}
      </SimpleGrid>
      <LotPages pages={pages} pos="bottom" />
    </Container>);
};