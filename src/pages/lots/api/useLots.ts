import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';

interface UseLotsParams {
    page: number;
    per_page: number;
    params: object;
}

const useLots = ({ page, per_page = 20, params }:UseLotsParams) => {
  const { data: lots } = useQuery({
    queryKey: ['lots', page, per_page, params],
    queryFn: () => api.get('outlet/lots', { params: { page, per_page, ...params } }).then(e => e.data.result),
  })

  return { lots }
}

export default useLots