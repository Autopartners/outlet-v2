import { useQuery } from '@tanstack/react-query';

const useProfile = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => {}
  })

  return { profile }
}

export default useProfile;