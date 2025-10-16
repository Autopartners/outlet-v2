import { ActionIcon, Flex } from '@mantine/core';
import { IconLayoutGridFilled, IconList } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useMe } from '@/app/providers/me/useMe';
import { useOutletSettings } from '@/pages/lots/index/api/useOutletSettings';

interface ViewTypeButtonsProps {
  activeView: 'table_view' | 'cards_view',
  setActiveView: (activeView: 'table_view' | 'cards_view') => void
}

export const ViewTypeButtons = ({ activeView, setActiveView }: ViewTypeButtonsProps) => {
  const { me: { outlet_user_setting } } = useMe();
  const { mutateOutletSettings } = useOutletSettings();

  useEffect(() => setActiveView(outlet_user_setting.view_type || 'table_view'), [outlet_user_setting, setActiveView]);

  return (
    <Flex justify="flex-end" gap={5} mt={10}>
      <ActionIcon
        onClick={() => mutateOutletSettings({ view_type: 'table_view' })}
        variant={activeView === 'table_view' ? 'filled' : 'subtle'}
        size="xl"
        c={activeView === 'table_view' ? 'white' : 'dark'}
      >
        <IconList size={32} />
      </ActionIcon>
      <ActionIcon
        onClick={() => mutateOutletSettings({ view_type: 'cards_view' })}
        variant={activeView === 'cards_view' ? 'filled' : 'subtle'}
        size="xl"
        c={activeView === 'cards_view' ? 'white' : 'dark'}
      >
        <IconLayoutGridFilled size={32} />
      </ActionIcon>
    </Flex>
  );
};