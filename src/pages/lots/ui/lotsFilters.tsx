import { ActionIcon, Box, Card, Flex } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useBrands, useCities, useModels } from '@/pages/lots/api/useFilters.ts';
import { FilterSelect } from '@/shared/ui/filterSelect.tsx';
import { useApp } from '@/app/providers/app/useApp.ts';
import { useState } from 'react';
import { IconFilter, IconX } from '@tabler/icons-react';

export const LotsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useApp();
  const [showFilters, setShowFilters] = useState(true);

  const updateParams = (value: string | null, key: string) => {
    if (value) {
      searchParams.set(key, value);
      if (key === 'vehicle_brand_id') { searchParams.delete('vehicle_model_id'); }
    } else {
      searchParams.delete(key);
      if (key === 'vehicle_brand_id') { searchParams.delete('vehicle_model_id'); }
    }
    setSearchParams(searchParams);
  };

  const cityId = searchParams.get('city_id');
  const brandId = searchParams.get('vehicle_brand_id');
  const modelId = searchParams.get('vehicle_model_id');

  const { data: cities } = useCities();
  const { data: brands } = useBrands();
  const { data: models } = useModels(brandId);

  if (showFilters) {
    return (
      <Card withBorder pos='fixed' top={isMobile ? 200 : 130} left={'50%'}
        style={{ transform: 'translate(-50%, -50%)', zIndex: 100 }}>
        <ActionIcon onClick={() => setShowFilters(false)} pos={'absolute'} right={10} top={5} color={'gray'} variant={'subtle'}>
          <IconX/>
        </ActionIcon>
        <Flex direction={isMobile ? 'column' : 'row'} justify="space-between" w={isMobile ? '100%' : 700}>
          <FilterSelect label="Город" data={cities} value={cityId}
            onChange={(v: string | null) => updateParams(v, 'city_id')}/>
          <FilterSelect label="Бренд" data={brands} value={brandId}
            onChange={(v: string | null) => updateParams(v, 'vehicle_brand_id')}/>
          <FilterSelect
            label="Модель"
            data={models}
            value={modelId}
            onChange={(v: string | null) => updateParams(v, 'vehicle_model_id')}
            disabled={!brandId}
          />
        </Flex>
      </Card>
    ) }

  return (
    <Box pos='fixed' top={isMobile ? 100 : 100} left={'50%'}
      style={{ transform: 'translate(-50%, -50%)', zIndex: 100 }}>
      <ActionIcon radius={'md'} onClick={() => setShowFilters(true)} size={'xl'} color={'blue.4'} variant={'light'}>
        <IconFilter />
      </ActionIcon>
    </Box>
  )
};
