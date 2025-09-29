import { Container, Flex, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { useMe } from '@/app/providers/me/useMe.ts';

export const LotsTableSkeletonLoader = () => {
  const { isAuctionConfirmed } = useMe();

  return (
    <Container size="xl">
      <SimpleGrid mt={isAuctionConfirmed ? 150 : 20}>
        <Stack>
          {Array.from({ length: 12 }).map((_, index) => (
            <Flex key={index} gap={10}>
              <Skeleton h={70} w={200} />
              <Skeleton h={70} w={500} />
              <Skeleton h={70} w={200} />
              <Skeleton h={70} w={300} />
            </Flex>
          ))}
        </Stack>
      </SimpleGrid>
    </Container>
  );
};