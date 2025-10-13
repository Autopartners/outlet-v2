import { ActionIcon, Flex } from '@mantine/core';
import { IconLayoutGridFilled, IconList } from '@tabler/icons-react';

export const ViewTypeButtons = ({ activeView, setActiveView }:
                                { activeView: 'table' | 'cards', setActiveView: (activeView: 'table' | 'cards') => void }) => {
  return (
    <Flex justify="flex-end" gap={5} mt={10}>
      <ActionIcon
        onClick={() => setActiveView('table')}
        variant={activeView === 'table' ? 'filled' : 'subtle'}
        size="xl"
        c={activeView === 'table' ? 'white' : 'dark'}
      >
        <IconList size={32} />
      </ActionIcon>
      <ActionIcon
        onClick={() => setActiveView('cards')}
        variant={activeView === 'cards' ? 'filled' : 'subtle'}
        size="xl"
        c={activeView === 'cards' ? 'white' : 'dark'}
      >
        <IconLayoutGridFilled size={32} />
      </ActionIcon>
    </Flex>
  );
};