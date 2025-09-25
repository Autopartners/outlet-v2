import { useApp } from '@/app/providers/app/useApp';
import { Card, Flex, Stack, Text, Divider, Timeline } from '@mantine/core';
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
      <Timeline.Item key={j} title={<Text fw={700} c="blue">{dayjs(request.date_at).format('D MMMM')}</Text>}>
        <Flex direction="column" gap="xs">
          <Text>{request.auction_notes}</Text>
          <Text fw={700} size="xs">{request.smart_km || 1000} км</Text>
        </Flex>
      </Timeline.Item>
    ));

    return (
      <Stack key={i} gap="md">
        <Text fw={700} size="lg" mt="md">
          {year}
        </Text>
        <Timeline active={requests.length}>
          {requestsThisYear.reverse()}
        </Timeline>
        <Divider color="blue" my="sm" />
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
