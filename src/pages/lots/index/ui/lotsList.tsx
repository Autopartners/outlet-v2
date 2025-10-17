import { Container, Flex } from '@mantine/core';
import { useLots } from '@/shared/api/useLots.ts';
import { useSearchParams } from 'react-router-dom';
import { LotPages } from '@/pages/lots/index/ui/lotPages.tsx';
import { LotsListSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsListSkeletonLoader.tsx';
import { useEffect, useState } from 'react';
import { LotsTableSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsTableSkeletonLoader.tsx';
import { CustomBanner } from '@/shared/ui/Banners/CustomBanner';
import { ViewTypeCards } from '@/pages/lots/index/ui/viewTypes/ViewTypeCards';
import { ViewTypeTable } from '@/pages/lots/index/ui/viewTypes/ViewTypeTable';
import { useApp } from '@/app/providers/app/useApp';
import { ViewTypeTableMobile } from '@/pages/lots/index/ui/viewTypes/ViewTypeTableMobile';
import { LotsTableSkeletonMobileLoader } from '@/pages/lots/index/ui/skeletons/lotsTableSkeletonMobileLoader';
import { AuctionCountdown } from '@/pages/lots/index/ui/AuctionCountdown';
import { ViewTypeButtons } from '@/pages/lots/index/ui/viewTypes/ViewTypeButtons';
import { useMe } from '@/app/providers/me/useMe';
import type { Lot } from '@/entities/lot';
import { LotsFilters } from '@/pages/lots/index/ui/lotsFilters';

const LoadingView = () => {
  const { me } = useMe();
  const { isMobile } = useApp();

  if (me.outlet_user_setting.view_type === 'cards_view') { return <LotsListSkeletonLoader />; }
  if (me.outlet_user_setting.view_type === 'table_view' && !isMobile) { return <LotsTableSkeletonLoader />; }
  return <LotsTableSkeletonMobileLoader />;
};

interface LotsListHeadProps {
  lots: Lot[],
  showFilters: boolean,
  setShowFilters: (showFilters: boolean) => void,
  activeView: 'table_view' | 'cards_view',
  setActiveView: (activeView: 'table_view' | 'cards_view') => void,
}

const LotsListHead = ({ lots, showFilters, setShowFilters, activeView, setActiveView }:LotsListHeadProps) => {
  return (
    <Flex align="flex-end" justify="space-between" gap={5}>
      <AuctionCountdown lots={lots} />
      <Flex gap={{ base: 10, sm: 30 }} align="flex-end">
        <LotsFilters hasLots isLoading={false} {...{ showFilters, setShowFilters }} />
        <ViewTypeButtons {...{ activeView, setActiveView }} />
      </Flex>
    </Flex>
  );
};

export const LotsList = () => {
  const { isMobile } = useApp();
  const { isAdmin, isRemarketing, me } = useMe();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeView, setActiveView] = useState<'table_view' | 'cards_view'>(me.outlet_user_setting.view_type || 'table_view');
  const [showFilters, setShowFilters] = useState<boolean>(me.outlet_user_setting.filters_enabled || false);

  const page = searchParams.get('page') || '1';
  const per_page = '12';

  const {
    liked,
    q: {
      vehicle_city_of_remarketing_id_eq: city_id,
      vehicle_vehicle_brand_id_eq: brand_id,
      vehicle_vehicle_model_id_eq: model_id
    } = {}
  } = me.outlet_user_setting.filters || {};

  const params = {
    started: 'true',
    liked: liked || searchParams.get('liked') || 'false',
    q: {
      vehicle_vehicle_model_id_eq: model_id || searchParams.get('vehicle_model_id'),
      vehicle_vehicle_brand_id_eq: brand_id || searchParams.get('vehicle_brand_id'),
      vehicle_city_of_remarketing_id_eq: city_id || searchParams.get('city_id')
    }
  };

  useEffect(() => {
    if (params.liked) { searchParams.set('liked', String(params.liked)); }
    if (params.q.vehicle_city_of_remarketing_id_eq) { searchParams.set('city_id', params.q.vehicle_city_of_remarketing_id_eq); }
    if (params.q.vehicle_vehicle_brand_id_eq) { searchParams.set('vehicle_brand_id', params.q.vehicle_vehicle_brand_id_eq); }
    if (params.q.vehicle_vehicle_model_id_eq) { searchParams.set('vehicle_model_id', params.q.vehicle_vehicle_model_id_eq); }
    setSearchParams(searchParams);
  }, []);

  const { lots: allLots, isLoading, pages } = useLots({
    page,
    per_page,
    params
  });

  if (isLoading) {
    return (
      <>
        <LotsFilters hasLots={false} {...{ isLoading, showFilters, setShowFilters }} />
        <LoadingView />
      </>
    );
  }

  const lots = (isAdmin || isRemarketing) ? allLots : allLots.filter((lot: Lot) => lot.stage !== 'preparing');

  if (lots.length === 0) {
    return (
      <>
        <LotsFilters hasLots={false} {...{ isLoading, showFilters, setShowFilters }} />
        <CustomBanner label="Нет доступных лотов, попробуйте изменить фильтры" mt={140} />
      </>
    );
  }

  return (
    <Container size="xl">
      <LotsListHead {...{ lots, showFilters, setShowFilters, activeView, setActiveView }} />
      <>
        {activeView === 'cards_view' && <ViewTypeCards {...{ lots, page, per_page, params }} />}
        {activeView === 'table_view' && isMobile && <ViewTypeTableMobile {...{ lots, page, per_page, params }} />}
        {activeView === 'table_view' && !isMobile && <ViewTypeTable {...{ lots, page, per_page, params }} />}
      </>
      <LotPages pages={pages} pos="bottom" />
    </Container>
  );
};