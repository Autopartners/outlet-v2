import { Container, Flex, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { useMe } from '@/app/providers/me/useMe.ts';

export const LotsTableSkeletonLoader = () => {
  const { isAuctionConfirmed } = useMe();

  return (
    <Container size="xl" mb={40}>
      <SimpleGrid mt={isAuctionConfirmed ? 150 : 20}>
        <Stack>
          {Array.from({ length: 12 }).map((_, index) => (
            <Flex key={index} gap={5}>
              <Skeleton h={70} w={113} />
              <Skeleton h={70} w={540} />
              <Skeleton h={70} w={71} />
              <Skeleton h={70} w={185} />
              <Skeleton h={70} w={185} />
              <Skeleton h={70} w={98} />
              <Skeleton h={70} w={269} />
            </Flex>
          ))}
        </Stack>
      </SimpleGrid>
    </Container>
  );
};