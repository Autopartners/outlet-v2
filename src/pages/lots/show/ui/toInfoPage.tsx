import { useApp } from '@/app/providers/app/useApp';
import { Card, Flex, Stack, Text, Divider, Timeline } from '@mantine/core';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

interface ServiceRequest {
  date_at: string;
  smart_km?: number;
  auction_notes?: string;
  manager_notes?: string;
  note0?: string;
}

interface ToInfoPageProps {
  service_requests: ServiceRequest[];
  editable: boolean;
}

export const ToInfoPage = ({ service_requests, editable }: ToInfoPageProps) => {
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
      !editable ? (
        <Timeline.Item key={j} title={<Text fw={700} c="blue">{dayjs(request.date_at).format('D MMMM')}</Text>}>
          <Flex direction="column" gap="xs">
            <Text>{request.auction_notes}</Text>
            <Text fw={700} size="xs">{request.smart_km || 1000} км</Text>
          </Flex>
        </Timeline.Item>
      ) : (
        <>
          <Flex direction="row" gap="lg">
            <Stack w="10vw">
              <Text fw={700} c="blue">{dayjs(request.date_at).format('D MMMM')}</Text>
              <Text fw={700} size="sm">{request.smart_km || 1000} км</Text>
            </Stack>
            <Stack w="100vw">
              <Card bg="blue.1">
                <Stack>
                  <Text fw={700} fz={18}>Комментарий водителя</Text>
                  <Text>{request.note0}</Text>
                </Stack>
              </Card>
              <Card bg="blue.1">
                <Stack>
                  <Text fw={700} fz={18}>Комментарий менеджера</Text>
                  <Text>{request.manager_notes}</Text>
                </Stack>
              </Card>
              <Card bg="blue.1">
                <Stack>
                  <Text fw={700} fz={18}>Работы</Text>
                  <Text>{request.auction_notes}</Text>
                </Stack>
              </Card>
            </Stack>
          </Flex>
          <Divider color="blue" my="sm" />
        </>
      )
    ));

    return (
      <Stack key={i} gap="md">
        <Text fw={700} size="lg" mt="md">
          {year}
        </Text>
        {!editable ? (
          <>
            <Timeline active={requests.length}>
              {requestsThisYear.reverse()}
            </Timeline>
            <Divider color="blue" my="sm" />
          </>
        ) : (
          <>
            {requestsThisYear.reverse()}
          </>
        )}
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
