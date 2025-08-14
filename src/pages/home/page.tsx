import { Image, Container, Text, Box, Divider, Button, SimpleGrid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconCar4wd, IconCreditCardRefund, IconEye, IconGavel, IconSearch, IconShield, IconUser } from '@tabler/icons-react';
import { AdvantageCard } from '@/pages/home/';

export const HomePage = () => {
  const nav = useNavigate();

  return (
    <Container p={0} fluid>
      <Box pos="relative" h={550}>
        <Image src="/road.png" w="100%" h="100%" style={{ zIndex: 1, objectFit: 'cover' }} />
        <Box pos="absolute" top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 2 }}>
          <Text c="white" fz={40} mb="md">
            Добро пожаловать на аукцион CarsOutlet!
          </Text>
          <Text c="white" fz={20}>
            Продажа подержанных автомобилей от собственника
          </Text>
        </Box>
      </Box>
      <Box ta={'center'} py={20} bg={'gray.1'}>
        <Text fz={40}>Актуальные лоты</Text>
        <Divider mx={'auto'} w={100} color={'blue.3'} size={5} style={{ borderRadius: 20 }} />
        <Button leftSection={<IconEye />} mt={20} size={'lg'} onClick={() => nav('/lots')}>
          Смотреть все
        </Button>
      </Box>
      <Box ta={'center'} mt={20} w={'60%'} mx={'auto'}>
        <Text fz={40}>Наши преимущества</Text>
        <Divider mx={'auto'} w={100} color={'blue.3'} size={5} style={{ borderRadius: 20 }} />
        <Text fz={20} mt={15}>
          Почему стоит выбрать наш аукцион для покупки подержанного автомобиля
        </Text>
        <SimpleGrid ta={'left'} cols={3} mt={40} spacing={80} verticalSpacing={40}>
          <AdvantageCard
            title={'Покупка у юридического лица'}
            text={'Прозрачные сделки с официальным оформлением документов и гарантией безопасности'}
            icon={<IconUser color={'white'} size={'40'} />}
          />
          <AdvantageCard
            title={'Проверка автомобилей перед продажей'}
            text={'Прозрачные сделки с официальным оформлением документов и гарантией безопасности'}
            icon={<IconSearch color={'white'} size={'40'} />}
          />
          <AdvantageCard
            title={'Юридически чистая история автомобилей'}
            text={'Полная проверка истории владения, отсутствие обременений и юридических проблем'}
            icon={<IconGavel color={'white'} size={'40'} />}
          />
          <AdvantageCard
            title={'Реальный пробег'}
            text={'Гарантируем достоверность показаний одометра и предоставляем полную историю эксплуатации'}
            icon={<IconCar4wd color={'white'} size={'40'} />}
          />
          <AdvantageCard
            title={'Обслуживание в сертифицированных СТО'}
            text={'Все автомобили проходили регулярное обслуживание в официальных сервисных центрах'}
            icon={<IconShield color={'white'} size={'40'} />}
          />
          <AdvantageCard
            title={'Возврат НДС (для юридических лиц)'}
            text={'Возможность возврата налога на добавленную стоимость при покупке для бизнеса'}
            icon={<IconCreditCardRefund color={'white'} size={'40'} />}
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
};
