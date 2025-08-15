import { Text, Loader as MantineLoader, Flex } from '@mantine/core';

export const Loader = ({ label = '' }) => (
  <Flex pos="absolute" align="center" justify="center" style={{ right: 0, top: 0, bottom: 0, left: 0, zIndex: 160 }}>
    <Flex justify="center" direction="column" gap={10} align="center">
      <MantineLoader />
      {label && <Text fz={14}>{label}</Text>}
    </Flex>
  </Flex>
);
