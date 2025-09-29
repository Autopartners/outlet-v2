import { useMe } from '@/app/providers/me/useMe.ts';
import { LotsFilters } from '@/pages/lots/index/ui/lotsFilters.tsx';
import { LotsList } from '@/pages/lots/index/ui/lotsList.tsx';
import { Container, Flex } from '@mantine/core';
import { useApp } from '@/app/providers/app/useApp';
import { LotsListSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsListSkeletonLoader.tsx';
import { ConfirmBanner } from '@/shared/ui/ConfirmBanner.tsx';

export const LotsPage = () => {
  const { isAuctionConfirmed } = useMe();
  const { isMobile } = useApp();

  if (!isAuctionConfirmed) {
    return (
      <Container p={0} mt={isMobile ? 0 : 50} fluid>
        <Flex justify="center" align="center" direction="column">
          <ConfirmBanner />
          <LotsListSkeletonLoader />
        </Flex>
      </Container>
    );
  }

  return (
    <>
      <LotsFilters />
      <LotsList />
    </>
  );
};
