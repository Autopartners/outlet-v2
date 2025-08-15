import { Card, Flex } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useBrands, useCities, useModels } from '@/pages/lots/api/useFilters.ts';
import { FilterSelect } from '@/shared/ui/filterSelect.tsx';

export const LotsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <Card withBorder pos='fixed' top={130} left={'50%'} style={{ transform: 'translate(-50%, -50%)', zIndex: 100 }}>
      <Flex justify="space-between" w={700}>
        <FilterSelect label="Город" data={cities} value={cityId} onChange={(v: string|null) => updateParams(v, 'city_id')} />
        <FilterSelect label="Бренд" data={brands} value={brandId} onChange={(v: string|null) => updateParams(v, 'vehicle_brand_id')} />
        <FilterSelect
          label="Модель"
          data={models}
          value={modelId}
          onChange={(v: string|null) => updateParams(v, 'vehicle_model_id')}
          disabled={!brandId}
        />
      </Flex>
    </Card>
  );
};
