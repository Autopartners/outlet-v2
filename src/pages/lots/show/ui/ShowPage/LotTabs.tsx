import { Tabs, Space } from '@mantine/core';
import { IconClipboard, IconCarCrash, IconCarGarage, IconBook } from '@tabler/icons-react';
import { useTimeout } from '@mantine/hooks';
import { KitInfoPage } from '@/pages/lots/show/ui/BottomInfoPages/kitInfoPage.tsx';
import { DamagesInfoPage } from '@/pages/lots/show/ui/BottomInfoPages/DamagesInfoPage/damagesInfoPage.tsx';
import { ToInfoPage } from '@/pages/lots/show/ui/BottomInfoPages/toInfoPage.tsx';
import { AutotekaInfoPage } from '@/pages/lots/show/ui/BottomInfoPages/autotekaInfoPage.tsx';
import type { Lot } from '@/entities/lot';
import { useApp } from '@/app/providers/app/useApp';

export const LotTabs = ({ lot, editable }: { lot: Lot, editable: boolean }) => {
  const { isMobile } = useApp();
  const { start: scrollBottomTimeout } = useTimeout(() => window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  }), 200);

  return (
    <Tabs color="blue.7" defaultValue="kit" py={20} radius="lg">
      <Tabs.List grow>
        {[
          { icon: <IconClipboard color="black" />, value: 'kit', label: 'Комплектация' },
          { icon: <IconCarCrash color="black" />, value: 'damages', label: 'Повреждения' },
          { icon: <IconCarGarage color="black" />, value: 'to', label: 'ТО' },
          { icon: <IconBook color="black" />, value: 'autoteka', label: 'Автотека' }
        ].map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            leftSection={tab.icon}
            fz={20}
            w={isMobile ? '100%' : '25%'}
            onClick={() => scrollBottomTimeout()}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <Tabs.Panel value="kit">
        <Space h={20} />
        <KitInfoPage vehicle_options={lot.vehicle_options} remarketing_options={lot.remarketing_options} />
      </Tabs.Panel>
      <Tabs.Panel value="damages">
        <Space h={20} />
        <DamagesInfoPage damages={lot.damages || []} editable={editable} />
      </Tabs.Panel>
      <Tabs.Panel value="to">
        <Space h={20} />
        <ToInfoPage service_requests={lot.service_requests || []} editable={editable} />
      </Tabs.Panel>
      <Tabs.Panel value="autoteka">
        <Space h={20} />
        <AutotekaInfoPage lot={lot} editable={editable} />
      </Tabs.Panel>
    </Tabs>
  );
};
