import { useMe } from '@/app/providers/me/useMe.ts';
import { LotsList } from '@/pages/lots/index/ui/lotsList.tsx';
import { Box, Flex } from '@mantine/core';
import { useApp } from '@/app/providers/app/useApp';
import { ConfirmBanner } from '@/shared/ui/Banners/ConfirmBanner.tsx';

interface LotsPageProps {
  mode: string;
}

export const LotsPage = ({ mode }: LotsPageProps) => {
  const { isAuctionConfirmed } = useMe();
  const { isMobile } = useApp();

  if (!isAuctionConfirmed) {
    return (
      <Box mt={isMobile ? 0 : 50}>
        <Flex justify="center" align="center" direction="column">
          <ConfirmBanner />
        </Flex>
      </Box>
    );
  }

  return <LotsList mode={mode} />;
};
