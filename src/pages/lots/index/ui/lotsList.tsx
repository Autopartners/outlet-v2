import { Container, Flex } from '@mantine/core';
import { useLots } from '@/shared/api/useLots.ts';
import { useSearchParams } from 'react-router-dom';
import { LotPages } from '@/pages/lots/index/ui/lotPages.tsx';
import { LotsListSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsListSkeletonLoader.tsx';
import { useState } from 'react';
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

export const LotsList = () => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useApp();
  const { isAdmin, isRemarketing, me } = useMe();
  const [activeView, setActiveView] = useState<'table_view' | 'cards_view'>(me.outlet_user_setting.view_type || 'table_view');
  const page = searchParams.get('page') || '1';
  const per_page = '12';
  const params = {
    started: 'true',
    liked: searchParams.get('liked') || 'false',
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
  const showLoading = isLoading || !lots;
  let filteredLots = lots;

  if (!showLoading && !isAdmin && !isRemarketing) {
    filteredLots = lots.filter((lot: Lot) => lot.stage !== 'preparing');
  }

  if (!showLoading && filteredLots.length === 0) {
    return (
      <Container size="xl" mt={isMobile ? 300 : 140}>
        {lots.length > 0 && <AuctionCountdown lots={lots} />}
        <CustomBanner label="Нет доступных лотов, попробуйте изменить фильтры" mt={20} />
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Flex align="flex-end" justify="space-between" gap={5}>
        {lots && <AuctionCountdown lots={lots} />}
        <Flex gap={{ base: 5, sm: 30 }} align="flex-end">
          <LotsFilters {...{ showLoading }} />
          {!showLoading && <ViewTypeButtons {...{ activeView, setActiveView }} />}
        </Flex>
      </Flex>
      {showLoading ? <LoadingView /> : (
        <>
          {activeView === 'cards_view' && <ViewTypeCards {...{ filteredLots, page, per_page, params }} />}
          {activeView === 'table_view' && isMobile && <ViewTypeTableMobile {...{ filteredLots, page, per_page, params }} />}
          {activeView === 'table_view' && !isMobile && <ViewTypeTable {...{ filteredLots, page, per_page, params }} />}
        </>
      )}
      <LotPages pages={pages} pos="bottom" />
    </Container>
  );
};