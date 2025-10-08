import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import type { Lot } from '@/entities/lot';

interface UseAutotekaReportParams {
  lotId: string | undefined;
  lotVin: string;
}

export const useAutotekaReport = ({ lotId, lotVin }: UseAutotekaReportParams) => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('outlet/autoteka_reports', { vin: lotVin });
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