import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import { useMe } from '@/app/providers/me/useMe.ts';

interface UseLotsParams {
    page: number;
    per_page: number;
    params: object;
}

export const useLots = ({ page, per_page = 20, params }:UseLotsParams) => {
  const { me } = useMe()

  const { data: lots, isLoading } = useQuery({
    queryKey: ['lots', page, per_page, params],
    queryFn: () => api.get('outlet/lots', { params: { page, per_page, ...params } }).then(e => e.data.result),
    enabled: !!me.id
  })

  return { lots, isLoading }
}