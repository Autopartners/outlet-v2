import { Button, Flex, NumberInput, Popover, Table, Text, Tooltip, Loader as MantineLoader } from '@mantine/core';
import type { Lot } from '@/entities/lot';
import { IconCurrencyRubel } from '@tabler/icons-react';
import { useState } from 'react';
import { useBid } from '@/pages/lots/show/api/useBid';
import { useNavigate } from 'react-router';

export const ViewTypeTable = ({ lots }: {lots: Lot[]}) => {
  const [openedLotId, setOpenedLotId] = useState<number | null>(null);
  const [bid, setBid] = useState<string | number | undefined>('');
  const { bidMutation } = useBid();
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
              <Tooltip label="Моя ставка">
                <Flex align="center" justify="start">
                  {lot.my_bid && <IconCurrencyRubel stroke={2} size={20} />}
                  <Text fz={20} fw="bold">
                    {lot.my_bid?.toLocaleString('ru-RU')}
                  </Text>
                </Flex>
              </Tooltip>
            </Table.Td>

            <Table.Td>
              <Popover
                width={200}
                position="bottom"
                opened={openedLotId === lot.id}
                onChange={(o) => setOpenedLotId(o ? lot.id : null)}
                withArrow
                shadow="md"
              >
                <Popover.Target>
                  <Button color="green.7" onClick={() => setOpenedLotId(openedLotId === lot.id ? null : lot.id)}>
                    Сделать ставку
                  </Button>
                </Popover.Target>

                <Popover.Dropdown w={250}>
                  {lot.stage === 'second_stage' && (
                    <Tooltip label="Максимально предложенная сумма из первого этапа">
                      <Flex direction="column" align="flex-start">
                        <Text fz={16}>Текущая ставка</Text>
                        <Text fz={18} fw="bold" c="red.9">
                          {lot.second_stage_minimal_price?.toLocaleString('ru-RU') || 0} ₽
                        </Text>
                      </Flex>
                    </Tooltip>
                  )}

                  <NumberInput
                    max={100000000}
                    mt="xs"
                    size="md"
                    placeholder="Ставка"
                    allowDecimal={false}
                    allowNegative={false}
                    thousandSeparator=" "
                    value={bid}
                    step={100000}
                    onChange={setBid}
                  />

                  <Button
                    mt={10}
                    w="100%"
                    onClick={() => {
                      bidMutation.mutate({
                        value: bid,
                        lot_id: String(lot.id)
                      });
                      setOpenedLotId(null);
                    }}
                    color="green.7"
                    disabled={!bid || Number(bid) < (lot.second_stage_minimal_price ?? 0)}
                    leftSection={bidMutation.status === 'pending' && <MantineLoader type="dots" color="white" />}
                  >
                    Сохранить
                  </Button>
                </Popover.Dropdown>
              </Popover>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}