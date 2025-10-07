import { Image, Container, Text, Box, Divider, Button, SimpleGrid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconEye, } from '@tabler/icons-react';
import { useApp } from '@/app/providers/app/useApp.ts';
import { useLots } from '@/pages/lots/index/api/useLots.ts';
import { LotCard } from '@/pages/lots/index/ui/lotCard.tsx';
import type { Lot } from '@/entities/lot';
import { useMe } from '@/app/providers/me/useMe.ts';
import { ConfirmBanner } from '@/shared/ui/ConfirmBanner.tsx';
import { NoAvailableLots } from '@/shared/ui/NoAvailableLots';
import { OutletDescriptionCards } from '@/pages/home/ui/OutletDescriptionCards';
import { HomeSkeletonLoader } from '@/pages/home/ui/HomeSkeletonLoader';

export const HomePage = () => {
  const nav = useNavigate();
  const { isMobile } = useApp();
  const { me, isAuctionConfirmed } = useMe();
  const page = '1';
  const per_page = '3';
  const params = {
    started: 'true'
  };
  const { lots, isLoading } = useLots({ page: page, per_page: per_page, params: params });

  return (
    <Container p={0} fluid>
      <Box pos="relative" h={550}>
        <Image src="/road.png" w="100%" h="100%" style={{ zIndex: 1, objectFit: 'cover' }} />
        <Box w="100%" pos="absolute" top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 2 }}>
          <Text c="white" fz={isMobile ? 30 : 40} mb="md">
            Добро пожаловать на аукцион CarsOutlet
          </Text>
          <Text c="white" fz={isMobile ? 18 : 20}>
            Продажа подержанных автомобилей от собственника
          </Text>
        </Box>
      </Box>
      {me.id && isAuctionConfirmed && (
        <Box ta="center" py={20} bg="gray.1">
          <Text fz={isMobile ? 30 : 40}>Актуальные лоты</Text>
          <Divider mx="auto" mt={10} w={100} color="blue.8" size={5} style={{ borderRadius: 20 }} />
          {isLoading ? (
            <HomeSkeletonLoader />
          ) : (
            lots.length > 0 ? (
              <SimpleGrid spacing={30} mt={20} cols={{ lg: 3, sm: 1 }} w={isMobile ? '90%' : '70%'} mx="auto">
                {lots.map((lot: Lot) => (
                  <Box key={lot.id}>
                    <LotCard lot={lot} maxPhotos={10} {...{ page, per_page, params }} />
                  </Box>
                ))}
              </SimpleGrid>
            ) : <NoAvailableLots mt={30} />
          )}
          {!isLoading && lots.length > 0 && (
            <Button leftSection={<IconEye />} color="blue.6" mt={20} size="lg" onClick={() => nav('/lots')}>
              Смотреть все
            </Button>
          )}
        </Box>
      )}
      {me.id && !isAuctionConfirmed && (
        <Box mx="auto" w="fit-content">
          <ConfirmBanner />
        </Box>
      )}
      <OutletDescriptionCards />
    </Container>
  );
};
