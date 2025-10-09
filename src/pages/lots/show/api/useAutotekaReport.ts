import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import type { Lot } from '@/entities/lot';

interface UseAutotekaReportParams {
  lotId: string | undefined;
  lotVin: string;
  lotRegNumber: string;
}

export const useAutotekaReport = ({ lotId, lotVin, lotRegNumber }: UseAutotekaReportParams) => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('outlet/autoteka_reports', { vin: lotVin, vehicle_plate_no: lotRegNumber });
      return data;
    },
    onSuccess: (data) => {
      client.setQueryData(['lot', lotId], (oldLot: Lot) => ({
        ...oldLot,
        autoteka_reports: [...(oldLot.autoteka_reports || []), data]
      }));
    },
    onError: (err) => {
      console.error('Ошибка:', err);
    }
  });

  return { autotekaReportMutation: mutation };
};