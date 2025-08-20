import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import { useMe } from '@/app/providers/me/useMe.ts';

interface UseLotsParams {
    page: string;
    per_page: string;
    params: object;
}

export const useLots = ({ page, per_page = '12', params }:UseLotsParams) => {
  const { me } = useMe()

  const { data: lots, isLoading } = useQuery({
    queryKey: ['lots', page, per_page, params],
    queryFn: () => api.get('outlet/lots', { params: { page, per_page, ...params } }).then(e => e.data),
    enabled: !!me.id
  })

  return { lots: lots?.result, pages: lots?.pages || 1, isLoading }
}

interface UseLotParams {
    params?: object;
    id: string|undefined;
}

export const useLot = ({ params, id }:UseLotParams) => {
  const { me } = useMe()

  const { data: lot, isLoading, isFetching, error } = useQuery({
    queryKey: ['lot', params, id],
    queryFn: () => api.get(`outlet/lots/${id}`, { params }).then(e => e.data),
    enabled: !!me.id && !!id
  })

  return { lot: lot, isLoading, isFetching, error }
}