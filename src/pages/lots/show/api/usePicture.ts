import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import type { Lot } from '@/entities/lot';
import { useApp } from '@/app/providers/app/useApp.ts';

export const usePicture = () => {
  const client = useQueryClient();
  const { notification } = useApp();

  const { mutate: mutatePicture, status: statusPicture } = useMutation({
    mutationFn: async (args: { picture_id: number, params: object }) => {
      const { data } = await api.patch(`/erm/pictures/${args.picture_id}`, args.params);
      return data
    },
    onError: () => {
      notification.red('Ошибка обновления')
    },
    onSuccess: (data) => {
      client.setQueryData(['lot', String(data.lot_id)], (oldLot: Lot) => {
        return {
          ...oldLot,
          sales_pictures: (oldLot.sales_pictures || []).map(picture =>
            picture.id === data.id ? data : picture
          )
        };
      });
      notification.green('Фото обновлено');
    }
  });

  return { mutatePicture, statusPicture }
}