import { SimpleGrid, Skeleton } from '@mantine/core';
import { useApp } from '@/app/providers/app/useApp';

export const HomeSkeletonLoader = ({ ...props }) => {
  const { isMobile } = useApp()

  return (
    <SimpleGrid spacing={30} mt={20} cols={{ lg: 3, sm: 1 }} w={isMobile ? '90%' : '70%'} mx="auto" {...props}>
      <Skeleton w={isMobile ? '100%' : 550} h={490} radius="md"/>
      <Skeleton w={isMobile ? '100%' : 550} h={490} radius="md"/>
      <Skeleton w={isMobile ? '100%' : 550} h={490} radius="md"/>
    </SimpleGrid>);
}