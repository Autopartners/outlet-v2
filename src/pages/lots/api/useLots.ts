import { useQuery } from '@tanstack/react-query';

const useLots = () => {
  const { data: lots } = useQuery({
    queryKey: ['lots'],
    queryFn: () => {}
  })

  return { lots }
}

export default useLots