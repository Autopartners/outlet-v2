import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import type { Lot } from '@/entities/lot';
import { useApp } from '@/app/providers/app/useApp.ts';

export const usePicture = ({ lotId }: {lotId: number | string | undefined}) => {
  const client = useQueryClient();
  const { notification } = useApp();

  const { mutate: mutatePicture, status: statusPicture } = useMutation({
    mutationFn: async (args: { picture_id: number, params: object }) => {
      const { data } = await api.patch(`/erm/pictures/${args.picture_id}`, { ...args.params, is_lot: true });
      return data;
    },
    onError: (error) => {
      console.log(error);
      notification.red('Ошибка обновления');
    },
    onSuccess: (data) => {
      client.setQueryData(['lot', String(lotId)], (oldLot: Lot) => {
        return {
          ...oldLot,
          sales_pictures: data
        };
      });
      notification.green('Фото обновлено');
    }
  });

  return { mutatePicture, statusPicture };
};