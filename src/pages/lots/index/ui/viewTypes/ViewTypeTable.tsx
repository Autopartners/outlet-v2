import { Badge, Flex, Table, Text, Tooltip } from '@mantine/core';
import type { Lot } from '@/entities/lot';
import { IconCurrencyRubel } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { MakeBidPopover } from '@/shared/ui/LotOperations/MakeBid/MakeBidPopover.tsx';
import { MakeFavourite } from '@/shared/ui/LotOperations/MakeFavourite';
import { useMe } from '@/app/providers/me/useMe';
import { stageStrings } from '@/shared/lib/constants';

interface ViewTypeTableProps {
  lots: Lot[],
  page: string,
  per_page: string,
  params: object,
}

const MyBidTh = ({ stage }: { stage:string }) => {
  return (
    <Table.Th>
      <Flex direction="column" gap={2} align="center">
        <Badge variant="light">{stage}</Badge>
        Моя ставка
      </Flex>
    </Table.Th>
  );
};

export const ViewTypeTable = ({ lots, page, per_page, params }: ViewTypeTableProps) => {
  const nav = useNavigate();
  const { isAdmin, isRemarketing } = useMe();

  return (
    <Table mt={10} highlightOnHover verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr fz={16} style={{ verticalAlign: 'bottom' }}>
          <Table.Th ta="center">Код</Table.Th>
          <Table.Th ta="center">Описание</Table.Th>
          <Table.Th ta="center">Год</Table.Th>
          <Table.Th ta="center">Город</Table.Th>
          <Table.Th ta="center">Пробег</Table.Th>
          <Tooltip label="Максимально предложенная сумма из первого этапа">
            <Table.Th ta="center">Текущая ставка</Table.Th>
          </Tooltip>
          <MyBidTh stage="1 Этап" />
          <MyBidTh stage="2 Этап" />
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody ta="center">
        {lots.map((lot: Lot) => (
          <Table.Tr
            key={lot.id}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              const target = e.target as HTMLElement;

              if (
                target.closest('.not-navigate') ||
                target.closest('input') ||
                target.closest('button') ||
                window.getSelection()?.toString().length
              ) { return; }

              nav(`/lots/${lot.id}`);
            }}
          >
            <Table.Td>
              <Text fz={14} fw="bold">
                {lot.code}
              </Text>
            </Table.Td>

            <Table.Td ta="left">
              <Text fz={16} fw="bold" c="blue.7">
                {lot.definition_name}
                {(isAdmin || isRemarketing) && ` (${stageStrings[lot.stage]})`}
              </Text>
            </Table.Td>

            <Table.Td>
              <Text>{lot.vehicle_year_of_production}</Text>
            </Table.Td>

            <Table.Td>
              <Text>{lot.city_of_remarketing_name}</Text>
            </Table.Td>

            <Table.Td>
              <Text>{Number(lot.return_km).toLocaleString('ru-RU')}</Text>
            </Table.Td>

            <Table.Td>
              <Text>{Number(lot.second_stage_minimal_price).toLocaleString('ru-RU')}</Text>
            </Table.Td>

            <Table.Td>
              <Flex justify="center" align="flex-end">
                {lot.my_first_stage_amount && (
                  <Flex align="center" justify="center" w="130">
                    <IconCurrencyRubel stroke={2} size={20} />
                    <Text fz={20} fw="bold">
                      {lot.my_first_stage_amount.toLocaleString('ru-RU')}
                    </Text>
                  </Flex>
                )
                }
                {(lot.stage === 'first_stage') &&
                <MakeBidPopover small={!!lot.my_first_stage_amount} {...{ lot, page, per_page, params }} />}
              </Flex>
            </Table.Td>

            <Table.Td>
              <Flex justify="center" align="flex-end">
                {lot.my_second_stage_amount && (
                  <Flex align="center" justify="center" w="130">
                    <IconCurrencyRubel stroke={2} size={20} />
                    <Text fz={20} fw="bold">
                      {lot.my_second_stage_amount.toLocaleString('ru-RU')}
                    </Text>
                  </Flex>
                )}
                {lot.stage === 'second_stage' &&
                    <MakeBidPopover small={!!lot.my_second_stage_amount} {...{ lot, page, per_page, params }} />}
              </Flex>
            </Table.Td>

            <Table.Td>
              <MakeFavourite {...{ lot, page, per_page, params }} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};