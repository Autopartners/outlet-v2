import { useApp } from '@/app/providers/app/useApp';
import { Card, Flex, Stack, Text, Divider, Timeline, Textarea, Button, Loader } from '@mantine/core';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api.ts';
import { useParams } from 'react-router-dom';
import type { Lot } from '@/entities/lot';

dayjs.locale('ru');

interface ServiceRequest {
  date_at: string;
  smart_km?: number;
  auction_notes?: string;
  manager_notes?: string;
  note0?: string;
  id: number;
  hide_on_auction: boolean;
}

interface mutationRequestParams {
  req_id: number;
  field: string;
  value: string | boolean;
}

interface ToInfoPageProps {
  service_requests: ServiceRequest[];
  editable: boolean;
}

export const ToInfoPage = ({ service_requests, editable }: ToInfoPageProps) => {
  const { isMobile } = useApp();
  const { id } = useParams();
  const client = useQueryClient();
  const { notification } = useApp();
  const [value, setValue] = useState<Record<number, string>>(
    () =>
      service_requests.reduce((acc, req) => {
        acc[req.id] = req.auction_notes ?? '';
        return acc;
      }, {} as Record<number, string>)
  );

  const mutation = useMutation({
    mutationFn: async (params: mutationRequestParams) => {
      const { data } = await api.patch(`/erm/service_requests/${params.req_id}`, { [params.field]: params.value });
      return data;
    },
    onSuccess: (data) => {
      client.setQueryData(['lot', id], (prev: Lot) => (
        {
          ...prev,
          service_requests: [...prev.service_requests, data]
        }
      ));
      notification.green('Обновлено!');
    }
  });

  const setV = useCallback((k: number) => (v: string) => {
    setValue(ex => ({ ...ex, [k]: v }));
  }, [setValue]);

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
              <Card bg="blue.1" radius="lg">
                <Stack>
                  <Text fw={700} fz={18}>Комментарий водителя</Text>
                  <Text>{request.note0}</Text>
                </Stack>
              </Card>
              <Card bg="blue.1" radius="lg">
                <Stack>
                  <Text fw={700} fz={18}>Комментарий менеджера</Text>
                  <Text>{request.manager_notes}</Text>
                </Stack>
              </Card>
              <Card bg="blue.1" radius="lg">
                <Stack>
                  <Text fw={700} fz={18}>Работы</Text>
                  <Text>{request.auction_notes}</Text>
                </Stack>
              </Card>
              <Textarea
                label="Наименование"
                autosize
                radius="lg"
                maxRows={15}
                placeholder="Наименование"
                value={value[request.id]}
                onChange={(e) => {
                  setV(request.id)(e.currentTarget.value);
                }}
              />
              <Flex gap="md">
                <Button
                  radius="md"
                  leftSection={mutation.isPending && <Loader size="sm" />}
                  disabled={mutation.isPending}
                  w="10vw"
                  color="green"
                  onClick={() => mutation.mutate({
                    req_id: request.id,
                    value: value[request.id],
                    field: 'auction_notes'
                  })}
                >Сохранить</Button>
                <Button
                  radius="md"
                  leftSection={mutation.isPending && <Loader size="sm" />}
                  disabled={mutation.isPending}
                  w="10vw"
                  color={request.hide_on_auction ? 'blue' : 'yellow'}
                  onClick={() => mutation.mutate({
                    req_id: request.id,
                    value: !request.hide_on_auction,
                    field: 'hide_on_auction'
                  })}
                >
                  {request.hide_on_auction ? 'Показать' : 'Скрыть'}
                </Button>
              </Flex>
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
