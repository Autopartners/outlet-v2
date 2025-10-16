import { Box, Text, Card, Divider, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CustomBanner } from '@/shared/ui/Banners/CustomBanner';

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
    .split(/[,;|\n]+/)
    .map((e) => {
      if (!e.trim()) {
        return null;
      }
      return (
        <Box>
          <Text ml="sm">{String(e.trim()).charAt(0).toUpperCase() + String(e.trim()).slice(1)}</Text>
          <Divider mt={15} />
        </Box>
      );
    });

  if (!vehicle_options) { return <CustomBanner label="Комплектация не указана" />; }

  return (
    <Card withBorder w="100%">
      <Stack>
        {list}
      </Stack>
    </Card>
  );
};