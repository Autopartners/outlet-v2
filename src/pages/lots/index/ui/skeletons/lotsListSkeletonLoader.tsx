import { Box, Container, SimpleGrid, Skeleton } from '@mantine/core';

export const LotsListSkeletonLoader = () => {
  return (
    <Container size="xl">
      <SimpleGrid mt={150} mx="auto" spacing={30} cols={{ lg: 3, sm: 1 }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Box key={index}>
            <Skeleton h={550} w={410} radius="md" />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}