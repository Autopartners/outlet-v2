import { Button, Flex, Table, Text } from '@mantine/core';
import type { Lot } from '@/entities/lot';
import { IconCurrencyRubel } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { MakeBidPopover } from '@/shared/ui/LotOperations/MakeBidPopover';
import { MakeFavourite } from '@/shared/ui/LotOperations/MakeFavourite';

interface ViewTypeTableProps {
  lots: Lot[],
  page: string,
  per_page: string,
  params: object,
}

export const ViewTypeTable = ({ lots, page, per_page, params }: ViewTypeTableProps) => {
  const nav = useNavigate();

  return (
    <Table mt={50} highlightOnHover verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr fz={16}>
          <Table.Th>Код</Table.Th>
          <Table.Th>Описание</Table.Th>
          <Table.Th>Год</Table.Th>
          <Table.Th>Город</Table.Th>
          <Table.Th>Пробег</Table.Th>
          <Table.Th>Моя ставка</Table.Th>
          <Table.Th>Действия</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {lots.map((lot: Lot) => (
          <Table.Tr key={lot.id}>
            <Table.Td>
              <Button onClick={() => nav(`${lot.id}`)} variant="light" color="dark">
                <Text fz={14} fw="bold">
                  {lot.code}
                </Text>
              </Button>
            </Table.Td>

            <Table.Td>
              <Button onClick={() => nav(`${lot.id}`)} variant="subtle" color="blue.7">
                <Text fz={16} fw="bold">
                  {lot.definition_name}
                </Text>
              </Button>
            </Table.Td>

            <Table.Td>
              <Text>{lot.vehicle_year_of_production}</Text>
            </Table.Td>

            <Table.Td>
              <Text>{lot.city_of_remarketing_name}</Text>
            </Table.Td>

            <Table.Td>
              <Text>{Number(lot.return_km).toLocaleString('ru-RU')} км</Text>
            </Table.Td>

            <Table.Td>
              <Flex align="center" justify="start">
                {lot.my_bid && <IconCurrencyRubel stroke={2} size={20} />}
                <Text fz={20} fw="bold">
                  {lot.my_bid?.toLocaleString('ru-RU')}
                </Text>
              </Flex>
            </Table.Td>

            <Table.Td>
              <Flex align="center" gap={10}>
                <MakeBidPopover {...{ lot, page, per_page, params }} color="green.7" />
                <MakeFavourite {...{ lot, page, per_page, params }} />
              </Flex>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}