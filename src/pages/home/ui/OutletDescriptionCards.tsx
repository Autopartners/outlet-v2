import { Box, Divider, SimpleGrid, Text } from '@mantine/core';
import { AdvantageCard } from '@/pages/home';
import { IconCar4wd, IconCreditCardRefund, IconGavel, IconSearch, IconShield, IconUser } from '@tabler/icons-react';
import { useApp } from '@/app/providers/app/useApp';

export const OutletDescriptionCards = () => {
  const { isMobile } = useApp();

  return (
    <Box ta="center" mt={20} mb={40} w={isMobile ? '90%' : 1280} mx="auto">
      <Text fz={isMobile ? 30 : 40}>Наши преимущества</Text>
      <Divider mx="auto" mt={10} w={100} color="blue.8" size={5} style={{ borderRadius: 20 }} />
      <Text fz={isMobile ? 18 : 20} mt={15}>
      Почему стоит выбрать наш аукцион для покупки подержанного автомобиля
      </Text>
      <SimpleGrid ta="left" cols={{ lg: 3, sm: 1 }} mt={40} spacing={80} verticalSpacing={40}>
        <AdvantageCard
          title="Покупка у юридического лица"
          text="Прозрачные сделки с официальным оформлением документов и гарантией безопасности"
          icon={<IconUser color="white" size="40" />}
        />
        <AdvantageCard
          title="Проверка автомобилей перед продажей"
          text="Прозрачные сделки с официальным оформлением документов и гарантией безопасности"
          icon={<IconSearch color="white" size="40" />}
        />
        <AdvantageCard
          title="Юридически чистая история автомобилей"
          text="Полная проверка истории владения, отсутствие обременений и юридических проблем"
          icon={<IconGavel color="white" size="40" />}
        />
        <AdvantageCard
          title="Реальный пробег"
          text="Гарантируем достоверность показаний одометра и предоставляем полную историю эксплуатации"
          icon={<IconCar4wd color="white" size="40" />}
        />
        <AdvantageCard
          title="Обслуживание в сертифицированных СТО"
          text="Все автомобили проходили регулярное обслуживание в официальных сервисных центрах"
          icon={<IconShield color="white" size="40" />}
        />
        <AdvantageCard
          title="Возврат НДC"
          text="Возможность возврата налога на добавленную стоимость при покупке для бизнеса"
          icon={<IconCreditCardRefund color="white" size="40" />}
        />
      </SimpleGrid>
    </Box>
  );
};