import type { Lot } from '@/entities/lot';
import { Box, SimpleGrid } from '@mantine/core';
import { LotCard } from '@/pages/lots/index/ui/lotCard';

interface ViewTypeCardsProps {
  lots: Lot[],
  page: string,
  per_page: string,
  params: object,
  refetch: () => void,
}

export const ViewTypeCards = ({ lots, page, per_page, params, refetch }:ViewTypeCardsProps) => (
  <SimpleGrid spacing={30} mt={20} cols={{ lg: 3, sm: 1 }}>
    {lots.map((lot: Lot) => (
      <Box key={lot.id}>
        <LotCard
          lot={lot}
          maxPhotos={5}
          page={page}
          per_page={per_page}
          params={params}
          refetchLots={refetch}
        />
      </Box>
    ))}
  </SimpleGrid>
)