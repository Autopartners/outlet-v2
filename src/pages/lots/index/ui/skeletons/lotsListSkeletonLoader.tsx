import { Box, Container, SimpleGrid, Skeleton } from '@mantine/core';
import { useMe } from '@/app/providers/me/useMe.ts';

export const LotsListSkeletonLoader = () => {
  const { isAuctionConfirmed } = useMe();

  return (
    <Container size="xl">
      <SimpleGrid mt={isAuctionConfirmed ? 150 : 20} mx="auto" spacing={30} cols={{ lg: 3, sm: 1 }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Box key={index}>
            <Skeleton h={470} w={415} maw="90vw" radius="md" />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};