import { useApp } from '@/app/providers/app/useApp';
import { Card, Flex, Stack, Group, Text, Paper, Divider } from '@mantine/core';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

interface ServiceRequest {
  date_at: string;
  smart_km?: number;
  auction_notes?: string;
}

interface ToInfoPageProps {
  service_requests: ServiceRequest[];
}

export const ToInfoPage = ({ service_requests }: ToInfoPageProps) => {
  const { isMobile } = useApp();

  const validRequests = service_requests.filter(
    (val) => val.date_at !== null && val.date_at !== ''
  );

  const byYears = validRequests.reduce<Record<number, ServiceRequest[]>>((res, val) => {
    const year = dayjs(val.date_at).year();
    if (!res[year]) {
      res[year] = [];
    }
    res[year].push(val);
    return res;
  }, {});

  const srs = Object.entries(byYears).map(([year, requests], i) => {
    const requestsThisYear = requests.map((request, j) => (
      <Paper key={j} shadow="xs" p="sm" withBorder radius="md">
        <Group justify="space-between" mb="xs">
          <Text size="sm" c="dimmed">
            {dayjs(request.date_at).format('D MMMM')}
          </Text>
          <Text fw={500}>{request.smart_km || 1000} км</Text>
        </Group>
        <Text size="sm">{request.auction_notes}</Text>
      </Paper>
    ));

    return (
      <Stack key={i} gap="sm">
        <Text fw={700} size="lg" mt="md">
          {year}
        </Text>
        {requestsThisYear.reverse()}
        <Divider my="sm" />
      </Stack>
    );
  });

  return (
    <Flex justify="center">
      <Card w={isMobile ? '100%' : '80%'} withBorder p="lg" radius="md">
        <Stack gap="md">{srs.reverse()}</Stack>
      </Card>
    </Flex>
  );
};
