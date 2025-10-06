import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import { useApp } from '@/app/providers/app/useApp.ts';

interface mutationBidParams {
    value: string | number | undefined;
    lot_id: string | undefined;
}

export const useBid = () => {
  const client = useQueryClient();
  const { notification } = useApp();

  const mutation = useMutation({
    mutationFn: async (params:mutationBidParams) => {
      const { data } = await api.patch(`outlet/lots/${params.lot_id}/make_bid`, { amount: params.value })
      return data;
    },
    onSuccess: (data) => {
      const oldLot: object | undefined = client.getQueryData(['lot', String(data.lot_id)]);
      client.setQueryData(['lot', String(data.lot_id)], { ...oldLot, my_bid: data.second_stage_amount || data.first_stage_amount });
      notification.green('Ставка поставлена!');
    }
  })

  return { bidMutation: mutation }
}