import { useMe } from '@/app/providers/me/useMe.ts';
import { useNavigate } from 'react-router-dom';
import { LotsFilters } from '@/pages/lots/index/ui/lotsFilters.tsx';
import { LotsList } from '@/pages/lots/index/ui/lotsList.tsx';
import { Alert, Container, Flex, Text } from '@mantine/core';
import { useApp } from '@/app/providers/app/useApp';
import { IconInfoCircle } from '@tabler/icons-react';
import { LotsListSkeletonLoader } from '@/pages/lots/index/ui/skeletons/lotsListSkeletonLoader.tsx';

export const LotsPage = () => {
  const { me, isAuctionConfirmed } = useMe();
  const { isMobile } = useApp();
  const nav = useNavigate();

  if (!me.id) {
    nav('/');
  }

  if (!isAuctionConfirmed) {
    return (
      <Container p={0} mt={isMobile ? 0 : 50} fluid>
        <Flex justify="center" align="center" direction="column">
          <Alert h={150} w="90vw" icon={<IconInfoCircle />} title="Ограничено в доступе!" color="red">
            <Text>
              Подтвердите
              телефон и
              почту
              в
              профиле для просмотра
              лотов!
            </Text>
          </Alert>
          <LotsListSkeletonLoader />
        </Flex>
      </Container>
    );
  }

  return (
    <>
      <LotsFilters />
      <LotsList />
    </>
  );
};
