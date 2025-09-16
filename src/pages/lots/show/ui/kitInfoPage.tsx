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
          <Flex align="flex-start" justify="center" direction="row">
            <ThemeIcon color="green" size="lg" radius="xl">
              <IconCheck size={20} />
            </ThemeIcon>
            <Text ml="sm">{e.trim()}</Text>
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