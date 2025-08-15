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

  return { lots: lots?.result, pages: lots?.pages, isLoading }
}