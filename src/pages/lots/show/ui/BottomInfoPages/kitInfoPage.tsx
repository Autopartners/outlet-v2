import { Grid, Flex, ThemeIcon, Text, Card } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';

interface KitInfoPageProps {
  vehicle_options: string,
  remarketing_options: string,
}

export const KitInfoPage = ({ vehicle_options, remarketing_options }: KitInfoPageProps) => {
  const [opt, setOpt] = useState('');

  useEffect(() => {
    setOpt(remarketing_options || vehicle_options || '');
  }, [remarketing_options, vehicle_options]);

  const list = opt
    .split(',')
    .map((e, i) => {
      if (!e.trim()) {
        return null;
      }
      return (
        <Grid.Col span={{ sm: 12, md: 6 }} key={i}>
          <Flex align="center" justify="flex-start" direction="row">
            <ThemeIcon color="green.8" size="lg" radius="lg">
              <IconCheck size={20} />
            </ThemeIcon>
            <Text ml="sm">{String(e.trim()).charAt(0).toUpperCase() + String(e.trim()).slice(1)}</Text>
          </Flex>
        </Grid.Col>
      );
    });

  return (
    <Flex justify="center">
      <Card w="80%" withBorder>
        <Grid>
          {list}
        </Grid>
      </Card>
    </Flex>
  );
};