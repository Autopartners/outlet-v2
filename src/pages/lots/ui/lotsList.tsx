import { Box, Center, Container, Loader, SimpleGrid } from '@mantine/core';
import { useLots } from '@/pages/lots/api/useLots.ts';
import type { Lot } from '@/entities/lot/model/lot.ts';
import { useSearchParams } from 'react-router-dom';
import { LotCard } from '@/pages/lots/ui/lotCard.tsx';

export const LotsList = () => {
  const [searchParams] = useSearchParams();
  const { lots, isLoading } = useLots({ page: 1, per_page: 20,
    params: {
      vehicle_model_id: searchParams.get('vehicle_model_id'),
      vehicle_brand_id: searchParams.get('vehicle_brand_id'),
      city_id: searchParams.get('city_id'),
    }
  });

  if (isLoading || !lots) { return <Center mt={250}><Loader size={'xl'} /></Center>; }

  return (
    <Container mt={200} size={'xl'}>
      <SimpleGrid spacing={30} cols={{ lg: 3, sm: 1 }}>
        {lots.map((lot: Lot) => (
          <Box key={lot.id}>
            <LotCard lot={lot} />
          </Box>
        ))}
      </SimpleGrid>
    </Container>)
}