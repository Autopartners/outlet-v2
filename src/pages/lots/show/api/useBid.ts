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
      const { data } = await api.patch(`outlet/lots/${params.lot_id}/update_last_bid`, { bid: params.value })
      return data;
    },
    onSuccess: (data) => {
      client.setQueryData(['lot', String(data.id)], data);
      notification.green('Ставка поставлена!');
    }
  })

  return { bidMutation: mutation }
}