import { Box, Container, SimpleGrid, Skeleton } from '@mantine/core';
import { useMe } from '@/app/providers/me/useMe.ts';

export const LotsTableSkeletonMobileLoader = () => {
  const { isAuctionConfirmed } = useMe();

  return (
    <Container size="xl" mb={40}>
      <SimpleGrid mt={isAuctionConfirmed ? 150 : 20} mx="auto" spacing={30} cols={{ lg: 3, sm: 1 }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Box key={index}>
            <Skeleton h={170} w="100%" maw="90vw" radius="md" />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};