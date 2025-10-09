import { ActionIcon, Button, Flex, Grid, LoadingOverlay, Popover, Stack, Text, Textarea } from '@mantine/core';
import type { Lot } from '@/entities/lot';
import { usePatchLot } from '@/shared/api/useLots.ts';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';

interface EditColProps {
  lot: Lot,
  field: keyof Lot,
  label: string,
  mutateLot: (args: { lot_id: number|string, params: object }) => void,
}

const EditCol = ({ lot, field, label, mutateLot }:EditColProps) => {
  const [value, setValue] = useState(lot[field]);
  const [opened, setOpened] = useState(false);

  return (
    <Flex gap={10} align="flex-end">
      <Stack gap={2}>
        <Text fw="bold" fz={16}>
          {label}
        </Text>
        <Text td="underline" fz={20}>
          {String(lot[field])}
        </Text>
      </Stack>

      <Popover opened={opened} onChange={setOpened} withArrow>
        <Popover.Target>
          <ActionIcon size="lg" variant="subtle" onClick={() => setOpened((o) => !o)}>
            <IconEdit />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown w={300}>
          <Stack>
            <Textarea
              minRows={2}
              maxRows={10}
              autosize
              variant="filled"
              value={String(value) || ''}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              onClick={() => {
                mutateLot({ lot_id: lot.id, params: { [field]: value } });
                setOpened(false);
              }}
            >
              Сохранить
            </Button>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
};

export const LotEditSubmodel = ({ lot }: {lot: Lot}) => {
  const { mutateLot, statusLot } = usePatchLot()

  return (
    <Grid.Col span={{ base: 12, md: 5 }}>
      <Stack pos="relative" p={10}>
        <LoadingOverlay visible={statusLot === 'pending'} zIndex={1000} overlayProps={{ radius: 'lg', blur: 2 }} />
        {[
          { field: 'vehicle_brand_name', label: 'Бренд' },
          { field: 'vehicle_model_name', label: 'Модель' },
          { field: 'definition_name', label: 'Полное имя' },
          { field: 'definition_short_name', label: 'Короткое имя' },
          { field: 'vehicle_year_of_production', label: 'Год производства' },
          { field: 'return_km', label: 'Пробег' },
          { field: 'gearbox_name', label: 'КПП' },
          { field: 'fuel_type_name', label: 'Тип топлива' },
          { field: 'body_type_name', label: 'Кузов' }
        ].map((col) => (
          <EditCol {...{ mutateLot, lot }} field={col.field as keyof Lot} label={col.label} />
        ))}
      </Stack>
    </Grid.Col>
  );
}