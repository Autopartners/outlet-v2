import { ActionIcon, Badge, Box, Button, Card, Container, Divider, Flex, Stack, Text } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useLot } from '@/pages/lots/index/api/useLots.ts';
import { CustomLoader } from '@/shared/ui/CustomLoader/CustomLoader.tsx';
import { IconBuildingSkyscraper, IconCalendar, IconCameraRotate, IconCameraStar, IconCarCrash, IconCarGarage,
  IconClipboard, IconRoad, IconTrash, IconTrashX, IconX } from '@tabler/icons-react';
import { useApp } from '@/app/providers/app/useApp.ts';
import { ermurl } from '@/shared/lib/api.ts';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { ToInfoPage } from '@/pages/lots/show/ui/toInfoPage.tsx';
import { DamagesInfoPage } from '@/pages/lots/show/ui/damagesInfoPage.tsx';
import { KitInfoPage } from '@/pages/lots/show/ui/kitInfoPage.tsx';
import { useMe } from '@/app/providers/me/useMe.ts';
import { LotImageGallery } from '@/shared/ui/Images/LotImageGallery';

type Picture = {
  id: number;
  url: string;
  thumbnail: string;
  is_avatar: boolean;
  is_deleted: boolean;
};

export const LotEditPage = () => {
  const { id } = useParams();
  const { isMobile } = useApp();
  const { isAdmin, isRemarketing } = useMe();
  const [activeInfoPage, setActiveInfoPage] = useState<'kit' | 'damages' | 'to' | 'autoteka'>('kit');
  const nav = useNavigate();
  const imageGallery = useRef<ImageGallery | null>(null);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const { lot, error, isLoading } = useLot({ id: id });
  // const vehicle_id = lot?.vehicle_id;
  // const { data: vehicle } = useQuery({
  //   queryKey: ['vehicle', vehicle_id, id],
  //   queryFn: () => api.get(`erm/vehicles/${vehicle_id}`, { params: { method: 'backoffice_show' } }).then(e => e.data)
  // });

  useEffect(() => {
    if (lot?.sales_pictures) {
      setPictures(lot.sales_pictures);
    }
  }, [lot?.sales_pictures]);

  const sortedPics = useMemo(
    () => [...pictures].sort((a, b) => Number(a.is_deleted) - Number(b.is_deleted)),
    [pictures]
  );

  const custom = useCallback(() => {
    const index = imageGallery.current?.getCurrentIndex() ?? 0;
    const picture = sortedPics[index];
    return picture
      ? (
        <Flex gap={10} p={10}>
          <Button color={picture.is_deleted ? 'green' : 'blue'} leftSection={picture.is_deleted ? <IconTrashX/> : <IconTrash/>}>
            {picture.is_deleted ? 'Восстановить' : 'Скрыть'}
          </Button>
          <Button color={picture.is_avatar ? 'orange' : 'green'} leftSection={picture.is_avatar ? <IconCameraRotate/> : <IconCameraStar/>}>
            {picture.is_avatar ? 'Убрать аватар' : 'Сделать аватаром'}
          </Button>
        </Flex>
      ) : '';
  }, [sortedPics]);

  if (error) {
    nav('/LotOperations');
  }

  if (!isRemarketing && !isAdmin) {
    return (
      <Box>Отсутствуют права для просмотра раздела!</Box>
    );
  }

  if (isLoading) {
    return <CustomLoader label="Загружаем информацию о лоте..." />;
  }

  // const avatars = sortedPics.map((p, i) => {
  //   if (!p.is_avatar) {
  //     return null;
  //   }
  //   return <img
  //     key={i}
  //     src={ermurl + p.url}
  //     width="420"
  //     className="img-fluid"
  //     alt=""
  //   />;
  // });

  const carousel = sortedPics.map(e => {
    return {
      original: (ermurl + e.url), thumbnail: (ermurl + e.thumbnail), is_deleted: e.is_deleted
    };
  });

  return (
    <Container size="100%">
      {/* Header info card */}
      <Card
        bg="dark.5"
        radius={0}
        style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
        mt={40}
        pos="relative"
      >
        <Box pos="absolute" top={20} right={20}>
          <Flex gap={10}>
            <ActionIcon onClick={() => nav(`/lots/${id}`)} size="lg" color="white" variant="light">
              <IconX />
            </ActionIcon>
          </Flex>
        </Box>
        <Badge mx={10} size="lg" variant="light" color="white">
          {lot.code}
        </Badge>
        <Flex mt={10} align="center" justify="space-between" px={10}>
          <Text c="white" fz={isMobile ? 18 : 25}>
            {lot.definition_name}
          </Text>
        </Flex>
        <Flex mx={10} mt={10} gap={20} direction={{ base: 'column', sm: 'row' }}>
          <Flex gap={5} align="center">
            <IconCalendar stroke={1.3} color="white" />
            <Text c="white" fz={15}>
              {lot.vehicle_year_of_production} г.
            </Text>
          </Flex>
          <Flex gap={5} align="center">
            <IconRoad stroke={1.3} color="white" />
            <Text c="white" fz={15}>
              {Number(lot.return_km).toLocaleString('ru-RU')} км
            </Text>
          </Flex>
          <Flex gap={5} align="center">
            <IconBuildingSkyscraper stroke={1.3} color="white" />
            <Text c="white" fz={15}>
              {lot.city_of_remarketing_name}
            </Text>
          </Flex>
        </Flex>
      </Card>

      {/* vehicle carousel card */}
      <Card bg="gray.1" withBorder w="100%" radius={0}>
        <Card
          withBorder
          radius="md"
          p={0}
          maw="50%"
        >
          <LotImageGallery
            galleryRef={imageGallery}
            items={carousel}
            isMobile={isMobile}
            renderCustomControls={custom}
          />
        </Card>
      </Card>

      {/* Нижнее меню */}
      <Flex
        bg="dark.5"
        w="100%"
        h={isMobile ? 'auto' : 70}
        align="center"
        justify="space-between"
        px={isMobile ? 20 : 100}
        direction={isMobile ? 'column' : 'row'}
        gap={isMobile ? 20 : 'auto'}
        p={isMobile ? 10 : 'auto'}
      >
        <Stack gap={2} w={isMobile ? '100%' : 'auto'}>
          <Flex gap={10} align="center" style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('kit')}>
            <IconClipboard color="white" />
            <Text c="white" fz={20}>
              Комплектация
            </Text>
          </Flex>
          {activeInfoPage === 'kit' && <Divider color="white" size={3} style={{ borderRadius: 20 }} />}
        </Stack>
        <Stack gap={2} w={isMobile ? '100%' : 'auto'}>
          <Flex gap={10} align="center" style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('damages')}>
            <IconCarCrash color="white" />
            <Text c="white" fz={20}>
              Повреждения
            </Text>
          </Flex>
          {activeInfoPage === 'damages' && <Divider color="white" size={3} style={{ borderRadius: 20 }} />}
        </Stack>
        <Stack gap={2} w={isMobile ? '100%' : 'auto'}>
          <Flex gap={10} align="center" style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('to')}>
            <IconCarGarage color="white" />
            <Text c="white" fz={20}>
              ТО
            </Text>
          </Flex>
          {activeInfoPage === 'to' && <Divider color="white" size={3} style={{ borderRadius: 20 }} />}
        </Stack>
      </Flex>

      {/* Контент */}
      <Card bg="gray.1" radius={0} style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} mb={40}>
        {activeInfoPage === 'to' && <ToInfoPage service_requests={lot.service_requests || []} editable />}
        {activeInfoPage === 'damages' && <DamagesInfoPage damages={lot.damages || []} editable />}
        {activeInfoPage === 'kit' &&
          <KitInfoPage vehicle_options={lot.vehicle_options} remarketing_options={lot.remarketing_options} />}
      </Card>
    </Container>
  );
};