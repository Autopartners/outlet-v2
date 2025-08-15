import { useDictionary } from '@/shared/api/useDictionary.ts';

interface City {
    id: number;
    description: string;
}

interface Brand {
    id: number;
    name: string;
}

interface Model {
    id: number;
    name: string;
}

export const useCities = (query?: string) =>
  useDictionary<City>({
    endpoint: 'external/cities',
    params: { query },
    mapFn: city => ({ value: String(city.id), label: city.description || '' })
  });

export const useBrands = (query?: string) =>
  useDictionary<Brand>({
    endpoint: 'external/vehicle_brands',
    params: { query },
    mapFn: brand => ({ value: String(brand.id), label: brand.name || '' })
  });

export const useModels = (brand_id: string | null, query?: string) =>
  useDictionary<Model>({
    endpoint: 'external/vehicle_models',
    params: { brand_id, query },
    mapFn: model => ({ value: String(model.id), label: model.name.trim() || '' }),
    enabled: !!brand_id
  });
