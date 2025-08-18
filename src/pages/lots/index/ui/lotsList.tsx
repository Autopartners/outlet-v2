import { Box, Container, SimpleGrid } from '@mantine/core';
import { useLots } from '@/pages/lots/index/api/useLots.ts';
import type { Lot } from '@/entities/lot/lot.ts';
import { useSearchParams } from 'react-router-dom';
import { LotCard } from '@/pages/lots/index/ui/lotCard.tsx';
import { LotPages } from '@/pages/lots/index/ui/lotPages.tsx';
import { Loader } from '@/shared/ui/Loader/Loader.tsx';

export const LotsList = () => {
  const [searchParams] = useSearchParams();
  const { lots, isLoading, pages } = useLots({
    page: searchParams.get('page') || '1',
    per_page: '12',
    params: {
      vehicle_model_id: searchParams.get('vehicle_model_id'),
      vehicle_brand_id: searchParams.get('vehicle_brand_id'),
      city_id: searchParams.get('city_id'),
      current: true
    }
  });

  if (isLoading || !lots) { return <Loader/>; }

  return (
    <Container size={'xl'}>
      <LotPages pages={pages} pos={'top'} />
      <SimpleGrid spacing={30} cols={{ lg: 3, sm: 1 }}>
        {lots.map((lot: Lot) => (
          <Box key={lot.id}>
            <LotCard lot={lot} maxPhotos={5}/>
          </Box>
        ))}
      </SimpleGrid>
      <LotPages pages={pages} pos={'bottom'}/>
    </Container>)
}