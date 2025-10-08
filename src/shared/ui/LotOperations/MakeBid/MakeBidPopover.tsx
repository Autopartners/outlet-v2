import { Button, Flex, Popover, Text, Tooltip, type MantineColor } from '@mantine/core';
import { useState } from 'react';
import type { Lot } from '@/entities/lot';
import { MakeBidInput } from '@/shared/ui/LotOperations/MakeBid/MakeBidInput.tsx';

interface MakeBidButtonProps {
  lot: Lot,
  page: string,
  per_page: string,
  params: object,
  color?: MantineColor,
}

export const MakeBidPopover = ({ lot, page, per_page, params, color }: MakeBidButtonProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <Popover width={200} position="bottom" opened={opened} onChange={setOpened} withArrow shadow="md">
      <Popover.Target>
        <Button mr={10} variant={color ? 'filled' : 'default'} color={color} onClick={() => setOpened(!opened)}>
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
        <MakeBidInput lot={lot} bidMutationParams={{ page, per_page, params }} />
      </Popover.Dropdown>
    </Popover>
  );
}