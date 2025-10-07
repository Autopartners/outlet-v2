import type { Lot } from '@/entities/lot';
import { Box, SimpleGrid } from '@mantine/core';
import { LotCard } from '@/pages/lots/index/ui/lotCard';

interface ViewTypeTableMobileProps {
  lots: Lot[],
  page: string,
  per_page: string,
  params: object,
}

export const ViewTypeTableMobile = ({ lots, page, per_page, params }:ViewTypeTableMobileProps) => (
  <SimpleGrid spacing={30} mt={20} cols={{ lg: 3, sm: 1 }}>
    {lots.map((lot: Lot) => (
      <Box key={lot.id}>
        <LotCard
          lot={lot}
          maxPhotos={5}
          page={page}
          per_page={per_page}
          params={params}
          mobileSimplified
        />
      </Box>
    ))}
  </SimpleGrid>
)