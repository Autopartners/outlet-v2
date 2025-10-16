import { ActionIcon, Badge, Card, Flex, Tooltip } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useBrands, useCities, useModels } from '@/pages/lots/index/api/useFilters.ts';
import { FilterSelect } from '@/shared/ui/Filters/filterSelect.tsx';
import { useApp } from '@/app/providers/app/useApp.ts';
import { useEffect, useState } from 'react';
import { IconFilter, IconStar, IconStarFilled, IconX } from '@tabler/icons-react';
import { useMe } from '@/app/providers/me/useMe';
import { useOutletSettings } from '@/pages/lots/index/api/useOutletSettings';

export const LotsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useApp();
  const { me } = useMe();
  const { mutateOutletSettings } = useOutletSettings();
  const activeStar = searchParams.get('liked') === 'true';
  const [showFilters, setShowFilters] = useState<boolean|null>(null);

  useEffect(() => {
    const { filters_enabled, filters } = me.outlet_user_setting;
    setShowFilters(filters_enabled);
    if (!filters) { return; }

    const { liked, q } = filters;
    searchParams.set('liked', String(liked));
    if (!q) { return; }

    const {
      vehicle_city_of_remarketing_id_eq: city_id,
      vehicle_vehicle_brand_id_eq: brand_id,
      vehicle_vehicle_model_id_eq: model_id
    } = q;

    searchParams.set('city_id', city_id || '');
    searchParams.set('vehicle_brand_id', brand_id || '');
    searchParams.set('vehicle_model_id', model_id || '');
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    setShowFilters(me.outlet_user_setting.filters_enabled);
  }, [me.outlet_user_setting]);

  const updateParams = (value: string | null, key: string) => {
    if (value) {
      searchParams.set(key, value);
      if (key === 'vehicle_brand_id') {
        searchParams.delete('vehicle_model_id');
      }
    } else {
      searchParams.delete(key);
      if (key === 'vehicle_brand_id') {
        searchParams.delete('vehicle_model_id');
      }
    }
    setSearchParams(searchParams);

    mutateOutletSettings({
      filters: {
        liked: searchParams.get('liked') === 'true',
        q: {
          vehicle_vehicle_model_id_eq: searchParams.get('vehicle_model_id'),
          vehicle_vehicle_brand_id_eq: searchParams.get('vehicle_brand_id'),
          vehicle_city_of_remarketing_id_eq: searchParams.get('city_id')
        }
      },
    });
  };

  const cityId = searchParams.get('city_id');
  const brandId = searchParams.get('vehicle_brand_id');
  const modelId = searchParams.get('vehicle_model_id');

  const { data: cities } = useCities();
  const { data: brands } = useBrands();
  const { data: models } = useModels(brandId);

  if (showFilters) {
    return (
      <Card
        withBorder
        pos="fixed"
        top={140}
        left="50%"
        style={{ transform: 'translate(-50%, -50%)', zIndex: 100 }}
      >
        <ActionIcon
          onClick={() => mutateOutletSettings({ filters_enabled: false })}
          pos="absolute"
          right={10}
          top={5}
          color="gray"
          variant="subtle"
        >
          <IconX />
        </ActionIcon>
        <Flex
          direction={isMobile ? 'column' : 'row'}
          justify="space-around"
          align={isMobile ? 'center' : 'flex-end'}
          w={isMobile ? '100%' : 800}
        >
          <FilterSelect
            label="Город"
            data={cities}
            value={cityId}
            onChange={(v: string | null) => updateParams(v, 'city_id')}
          />
          <FilterSelect
            label="Бренд"
            data={brands}
            value={brandId}
            onChange={(v: string | null) => updateParams(v, 'vehicle_brand_id')}
          />
          <FilterSelect
            label="Модель"
            data={models}
            value={modelId}
            onChange={(v: string | null) => updateParams(v, 'vehicle_model_id')}
            disabled={!brandId}
          />
          <Tooltip label="Показывать только избранные">
            <ActionIcon
              size={42}
              variant="transparent"
              onClick={() => updateParams(String(!activeStar), 'liked')}
              c="yellow.3"
              classNames={{ root: 'hoverScale' }}
            >
              {activeStar ? <IconStarFilled size={32} /> : <IconStar size={32} />}
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Card>
    );
  }

  const hasParams = Array.from(searchParams.entries()).some(([, value]) => {
    if (value === null) { return false; }
    if (value === 'false') { return false; }
    if (value.trim() === '') { return false; }
    return true;
  });

  return (
    <ActionIcon
      pos="relative"
      radius="md"
      onClick={() => mutateOutletSettings({ filters_enabled: true })}
      size="xl"
      color="blue.9"
      variant="light"
    >
      {hasParams && <Badge variant="filled" color="blue.6" size='8' circle pos="absolute" right={2} top={2}></Badge>}
      <IconFilter />
    </ActionIcon>
  );
};
