import { useQuery } from '@tanstack/react-query';

const useRules = () => {
  const { data: rules } = useQuery({
    queryKey: ['rules'],
    queryFn: () => {}
  })

  return { rules }
}

export default useRules