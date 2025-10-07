import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import { useMe } from '@/app/providers/me/useMe.ts';
import type { Lot } from '@/entities/lot';
import type { LotsCache } from '@/entities/lot/model/types';

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
  const { data: lot, isLoading, isFetching, error } = useQuery({
    queryKey: ['lot', String(id)],
    queryFn: () => api.get(`outlet/lots/${id}`).then(e => e.data),
    enabled: !!id
  });

  return { lot: lot, isLoading, isFetching, error };
};

interface UseLikeParams {
  id: number;
  page: string,
  per_page: string,
  params: object,
  status: 'indifferent' | 'like'
}

export const useLike = ({ id, page, per_page, params, status }: UseLikeParams) => {
  const client = useQueryClient();
  const { mutate: mutateLike, status: statusLike } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('outlet/lots/make_favourite', { status, id });
      return data
    },
    onSuccess: data => {
      client.setQueryData(['lots', page, per_page, params], (old: LotsCache) => {
        if (!old || !old.result) { return old; }

        return {
          ...old,
          result: old.result.map((item: Lot) =>
            item.id === id ? { ...item, like_status: data.like_status } : item
          )
        };
      });
    }
  })

  return { mutateLike, statusLike }
}
