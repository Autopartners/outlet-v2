import { Card, Center, Stack, Text } from '@mantine/core';
import React from 'react';

interface AdvantageCardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

export const AdvantageCard = ({ title, text, icon }: AdvantageCardProps) => {
  return (
    <Card withBorder radius="lg" classNames={{ root: 'cardHover' }}>
      <Stack p={20}>
        <Card p={10} bg='blue.9' w={60} h={60}>
          <Center>{icon}</Center>
        </Card>
        <Text fz={20} fw='bold'>
          {title}
        </Text>
        <Text fz={20}>{text}</Text>
      </Stack>
    </Card>
  );
};
