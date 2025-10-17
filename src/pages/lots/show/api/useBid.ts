import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import { useApp } from '@/app/providers/app/useApp.ts';
import type { Lot } from '@/entities/lot';
import type { LotsCache } from '@/entities/lot/model/types';

interface mutationBidParams {
    value: string | number | undefined;
    lot_id: string | number | undefined;
}

export interface useBidParams {
  page?: string,
  per_page?: string,
  params?: object
  variant?: 'show' | 'index';
}

export const useBid = ({ page, per_page, params, variant = 'index' }: useBidParams) => {
  const client = useQueryClient();
  const { notification } = useApp();

  const mutation = useMutation({
    mutationFn: async (args:mutationBidParams) => {
      const { data } = await api.patch(`outlet/lots/${args.lot_id}/make_bid`, { amount: args.value });
      return data;
    },
    onSuccess: (data) => {
      // make bid in show
      client.setQueryData(['lot', String(data.lot_id)], (oldLot: Lot) => ({
        ...oldLot,
        my_first_stage_amount: data.first_stage_amount,
        my_second_stage_amount: data.second_stage_amount
      }));

      if (variant === 'show') { return; }

      // make bid in index
      client.setQueryData(['lots', page, per_page, params], (old: LotsCache) => {
        if (!old || !old.result) { return old; }

        return {
          ...old,
          result: old.result.map((item: Lot) =>
            item.id === data.lot_id ? { ...item, my_first_stage_amount: data.first_stage_amount,
              my_second_stage_amount: data.second_stage_amount } : item)
        };
      });
      notification.green('Ставка поставлена!');
    }
  });

  return { bidMutation: mutation };
};