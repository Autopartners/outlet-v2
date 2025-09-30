import { Image, Container, Text, Box, Divider, Button, SimpleGrid, Center, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {
  IconCar4wd,
  IconCreditCardRefund,
  IconEye,
  IconGavel,
  IconSearch,
  IconShield,
  IconUser
} from '@tabler/icons-react';
import { AdvantageCard } from '@/pages/home/';
import { useApp } from '@/app/providers/app/useApp.ts';
import { useLots } from '@/pages/lots/index/api/useLots.ts';
import { LotCard } from '@/pages/lots/index/ui/lotCard.tsx';
import type { Lot } from '@/entities/lot';
import { useMe } from '@/app/providers/me/useMe.ts';
import { ConfirmBanner } from '@/shared/ui/ConfirmBanner.tsx';

export const HomePage = () => {
  const nav = useNavigate();
  const { isMobile } = useApp();
  const { me, isAuctionConfirmed } = useMe();
  const { lots, isLoading, refetch } = useLots({ page: '1', per_page: '3', params: { started: 'true' } });

  return (
    <Container p={0} fluid>
      <Box pos="relative" h={550}>
        <Image src="/road.png" w="100%" h="100%" style={{ zIndex: 1, objectFit: 'cover' }} />
        <Box
          w="100%"
          pos="absolute"
          top="50%"
          left="50%"
          style={{ transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 2 }}
        >
          <Text c="white" fz={isMobile ? 30 : 40} mb="md">
            Добро пожаловать на аукцион CarsOutlet
          </Text>
          <Text c="white" fz={isMobile ? 18 : 20}>
            Продажа подержанных автомобилей от собственника
          </Text>
        </Box>
      </Box>
      {me.id && isAuctionConfirmed && <Box ta="center" py={20} bg="gray.1">
        <Text fz={isMobile ? 30 : 40}>Актуальные лоты</Text>
        <Divider mx="auto" mt={10} w={100} color="blue.8" size={5} style={{ borderRadius: 20 }} />
        {isLoading ? <Center mt={40} mb={20}><Loader size="lg" /></Center> :
          <SimpleGrid spacing={30} mt={20} cols={{ lg: 3, sm: 1 }} w={isMobile ? '90%' : '70%'} mx="auto">
            {lots.map((lot: Lot) => (
              <Box key={lot.id}>
                <LotCard lot={lot} maxPhotos={10} refetchLots={refetch} />
              </Box>
            ))}
          </SimpleGrid>}
        <Button leftSection={<IconEye />} color="blue.6" mt={20} size="lg" onClick={() => nav('/lots')}>
          Смотреть все
        </Button>
      </Box>}
      {me.id && !isAuctionConfirmed && <Box mx="auto" w="fit-content"><ConfirmBanner /></Box>}
      <Box ta="center" mt={20} mb={40} w={isMobile ? '90%' : '60%'} mx="auto">
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
            title="Возврат НДС (для юридических лиц)"
            text="Возможность возврата налога на добавленную стоимость при покупке для бизнеса"
            icon={<IconCreditCardRefund color="white" size="40" />}
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
};
