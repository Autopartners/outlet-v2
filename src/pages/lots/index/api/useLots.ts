import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import { useMe } from '@/app/providers/me/useMe.ts';

interface UseLotsParams {
  page: string;
  per_page: string;
  params: object;
}

export const useLots = ({ page, per_page = '12', params }: UseLotsParams) => {
  const { me, isAuctionConfirmed } = useMe();

  const { data: lots, isLoading, refetch } = useQuery({
    queryKey: ['lots', page, per_page, params],
    queryFn: () => api.get('outlet/lots', { params: { page, per_page, ...params } }).then(e => e.data),
    enabled: !!me.id && isAuctionConfirmed
  });

  return { lots: lots?.result, pages: lots?.pages || 1, isLoading, refetch };
};

interface UseLotParams {
  id: string | undefined;
}

export const useLot = ({ id }: UseLotParams) => {
  const { me } = useMe();

  const { data: lot, isLoading, isFetching, error } = useQuery({
    queryKey: ['lot', id],
    queryFn: () => api.get(`outlet/lots/${id}`).then(e => e.data),
    enabled: !!me.id && !!id
  });

  return { lot: lot, isLoading, isFetching, error };
};