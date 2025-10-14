import { Button, Stack, Flex, Popover, Text, Tooltip, type MantineColor, ActionIcon } from '@mantine/core';
import { useState } from 'react';
import type { Lot } from '@/entities/lot';
import { MakeBidInput } from '@/shared/ui/LotOperations/MakeBid/MakeBidInput.tsx';
import { IconEdit } from '@tabler/icons-react';

interface MakeBidButtonProps {
  lot: Lot,
  page: string,
  per_page: string,
  params: object,
  color?: MantineColor,
  small?: boolean,
}

export const MakeBidPopover = ({ lot, page, per_page, params, color, small }: MakeBidButtonProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <Popover width={200} position="bottom" opened={opened} onChange={setOpened} withArrow shadow="md">
      <Popover.Target>
        {small ? (
          <ActionIcon onClick={() => setOpened(!opened)} variant="default">
            <IconEdit />
          </ActionIcon>
        ) : (
          <Button mr={10} variant={color ? 'filled' : 'default'} color={color} onClick={() => setOpened(!opened)}>
            Сделать ставку
          </Button>
        )}
      </Popover.Target>
      <Popover.Dropdown w={250} className="not-navigate">
        {lot.stage === 'second_stage' && (
          <Tooltip label="Максимально предложенная сумма из первого этапа">
            <Flex direction="column" align="flex-start">
              <Text fz={16}>Текущая ставка</Text>
              <Text fz={18} fw="bold" c="red.9">
                {lot.second_stage_minimal_price?.toLocaleString('ru-RU') || 0}
                {' '}
                ₽
              </Text>
            </Flex>
          </Tooltip>
        )}
        <Stack gap={10} className="not-navigate">
          <MakeBidInput lot={lot} bidMutationParams={{ page, per_page, params }} size="sm" />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};