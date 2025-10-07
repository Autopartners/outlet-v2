import { Container, Flex, ThemeIcon, Text, Alert, ActionIcon } from '@mantine/core';
import { useLots } from '@/pages/lots/index/api/useLots.ts';
import { useSearchParams } from 'react-router-dom';
import { LotPages } from '@/pages/lots/index/ui/lotPages.tsx';
import { LotsListSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsListSkeletonLoader.tsx';
import { IconHourglassHigh, IconHourglassLow, IconList } from '@tabler/icons-react';
import { useState } from 'react';
import { IconLayoutGridFilled } from '@tabler/icons-react';
import { LotsTableSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsTableSkeletonLoader.tsx';
import { NoAvailablerLots } from '@/shared/ui/NoAvailablerLots';
import { ViewTypeCards } from '@/pages/lots/index/ui/viewTypes/ViewTypeCards';
import { ViewTypeTable } from '@/pages/lots/index/ui/viewTypes/viewTypeTable';

export const LotsList = () => {
  const [searchParams] = useSearchParams();

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

  if (lots.length === 0) { return <NoAvailablerLots /> }

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
            <Text fz={14}>Аукцион завершается <strong>{(new Date(lots[0]?.end_at)).toLocaleString()}</strong></Text>
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
      {activeView === 'cards' && <ViewTypeCards {...{ lots, page, per_page, params, refetch }} />}
      {activeView === 'table' && <ViewTypeTable {...{ lots }} /> }
      <LotPages pages={pages} pos="bottom" />
    </Container>);
};