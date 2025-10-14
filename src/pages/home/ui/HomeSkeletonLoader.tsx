import { SimpleGrid, Skeleton } from '@mantine/core';

export const HomeSkeletonLoader = ({ ...props }) => {
  return (
    <SimpleGrid spacing={50} w="fit-content" mt={20} cols={{ base: 1, sm: 3 }} mx="auto" {...props}>
      <Skeleton h={470} w={415} maw="90%" mx="auto" radius="md"/>
      <Skeleton h={470} w={415} maw="90%" mx="auto" radius="md"/>
      <Skeleton h={470} w={415} maw="90%" mx="auto" radius="md"/>
    </SimpleGrid>
  );
};