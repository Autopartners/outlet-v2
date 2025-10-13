import { Container, Flex } from '@mantine/core';
import { useLots } from '@/shared/api/useLots.ts';
import { useSearchParams } from 'react-router-dom';
import { LotPages } from '@/pages/lots/index/ui/lotPages.tsx';
import { LotsListSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsListSkeletonLoader.tsx';
import { useState } from 'react';
import { LotsTableSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsTableSkeletonLoader.tsx';
import { NoAvailableLots } from '@/shared/ui/Banners/NoAvailableLots';
import { ViewTypeCards } from '@/pages/lots/index/ui/viewTypes/ViewTypeCards';
import { ViewTypeTable } from '@/pages/lots/index/ui/viewTypes/ViewTypeTable';
import { useApp } from '@/app/providers/app/useApp';
import { ViewTypeTableMobile } from '@/pages/lots/index/ui/viewTypes/ViewTypeTableMobile';
import { LotsTableSkeletonMobileLoader } from '@/pages/lots/index/ui/skeletons/lotsTableSkeletonMobileLoader';
import { AuctionCountdown } from '@/pages/lots/index/ui/AuctionCountdown';
import { ViewTypeButtons } from '@/pages/lots/index/ui/viewTypes/ViewTypeButtons';

export const LotsList = () => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useApp();
  const [activeView, setActiveView] = useState<'table' | 'cards'>('table');
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
  const { lots, isLoading, pages } = useLots({
    page,
    per_page,
    params
  });

  if (isLoading || !lots) {
    if (activeView === 'cards') { return <LotsListSkeletonLoader />; }
    if (activeView === 'table' && !isMobile) { return <LotsTableSkeletonLoader />; }
    return <LotsTableSkeletonMobileLoader />;
  }

  if (lots.length === 0) { return <NoAvailableLots mt={isMobile ? 300 : 140} />; }

  return (
    <Container size="xl">
      <Flex align="flex-end" justify="space-between" gap={10}>
        <AuctionCountdown lots={lots} />
        <ViewTypeButtons {...{ activeView, setActiveView }} />
      </Flex>
      {activeView === 'cards' && <ViewTypeCards {...{ lots, page, per_page, params }} />}
      {activeView === 'table' && isMobile && <ViewTypeTableMobile {...{ lots, page, per_page, params }} />}
      {activeView === 'table' && !isMobile && <ViewTypeTable {...{ lots, page, per_page, params }} />}
      <LotPages pages={pages} pos="bottom" />
    </Container>
  );
};