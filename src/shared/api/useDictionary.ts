import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import { useMe } from '@/app/providers/me/useMe.ts';

export interface DictionaryItem {
    value: string;
    label: string;
}

interface UseDictionaryParams<T> {
    endpoint: string;
    params: Record<string, string | number | undefined | null>;
    mapFn: (item: T) => DictionaryItem;
    enabled?: boolean;
}

export const useDictionary = <T>({ endpoint, params, mapFn, enabled = true }: UseDictionaryParams<T>) => {
  const { me } = useMe();

  const { data, isLoading } = useQuery<DictionaryItem[]>({
    queryKey: [endpoint, params],
    queryFn: async () => {
      const res = await api.get(endpoint, { params });
      return res.data.map(mapFn);
    },
    enabled: !!me.id && enabled
  });

  return { data, isLoading };
};
