import { Button, Flex, Table, Text } from '@mantine/core';
import type { Lot } from '@/entities/lot';
import { IconCurrencyRubel } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { MakeBidPopover } from '@/shared/ui/LotOperations/MakeBid/MakeBidPopover.tsx';
import { MakeFavourite } from '@/shared/ui/LotOperations/MakeFavourite';

interface ViewTypeTableProps {
  filteredLots: Lot[],
  page: string,
  per_page: string,
  params: object,
}

export const ViewTypeTable = ({ filteredLots, page, per_page, params }: ViewTypeTableProps) => {
  const nav = useNavigate();

  return (
    <Table mt={10} highlightOnHover verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr fz={16}>
          <Table.Th ta="center">Код</Table.Th>
          <Table.Th ta="center">Описание</Table.Th>
          <Table.Th ta="center">Год</Table.Th>
          <Table.Th ta="center">Город</Table.Th>
          <Table.Th ta="center">Пробег</Table.Th>
          <Table.Th ta="left">Моя ставка</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody ta="center">
        {filteredLots.map((lot: Lot) => (
          <Table.Tr key={lot.id}>
            <Table.Td>
              <Text fz={14} fw="bold">
                {lot.code}
              </Text>
            </Table.Td>

            <Table.Td>
              <Button w="100%" onClick={() => nav(`${lot.id}`)} variant="light" color="blue.9">
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
              <Text>{Number(lot.return_km).toLocaleString('ru-RU')}</Text>
            </Table.Td>

            <Table.Td>
              <Flex align="center" justify="space-between">
                <Flex justify="space-between" gap={10}>
                  {lot.my_bid && (
                    <Flex align="center" justify="start" w="130">
                      <IconCurrencyRubel stroke={2} size={20} />
                      <Text fz={20} fw="bold">
                        {lot.my_bid.toLocaleString('ru-RU')}
                      </Text>
                    </Flex>
                  )}
                  <MakeBidPopover small={!!lot.my_bid} {...{ lot, page, per_page, params }} />
                </Flex>
                <MakeFavourite {...{ lot, page, per_page, params }} />
              </Flex>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};