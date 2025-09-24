import {
  ActionIcon, Anchor, Badge, Box, Button, Card, Container, Divider, Flex, Grid, NumberInput, SimpleGrid,
  Stack, Text, ThemeIcon, Tooltip, Loader as MantineLoader
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useLot } from '@/pages/lots/index/api/useLots.ts';
import { CustomLoader } from '@/shared/ui/Loader/Loader.tsx';
import {
  IconAdjustmentsHorizontal, IconBuildingSkyscraper, IconCalendar, IconCarCrash,
  IconCarGarage,
  IconChevronLeft, IconChevronRight, IconClipboard, IconMail, IconMessage, IconMoodSad, IconPhone, IconRoad,
  IconSettings, IconShield, IconX
} from '@tabler/icons-react';
import { useState } from 'react';
import { KitInfoPage } from '@/pages/lots/show/ui/kitInfoPage.tsx';
import { DamagesInfoPage } from '@/pages/lots/show/ui/damagesInfoPage.tsx';
import { ToInfoPage } from '@/pages/lots/show/ui/toInfoPage.tsx';
import { useMe } from '@/app/providers/me/useMe.ts';
import { ermurl } from '@/shared/lib/api.ts';
import { useBid } from '@/pages/lots/show/api/useBid.ts';
import { useApp } from '@/app/providers/app/useApp';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { AutotekaInfoPage } from '@/pages/lots/show/ui/autotekaInfoPage.tsx';
import type { AxiosError } from 'axios';

const stageStrings = {
  'preparing': 'Подготовка',
  'first_stage': 'Этап 1',
  'second_stage': 'Этап 2',
  'third_stage': 'Этап 3',
  'finished': 'Закончен'
};

interface renderVehicleInfoParams {
  head: string;
  info: string;
}

interface Picture {
  url: string;
  id: number;
}

export const LotPage = () => {
  const { id } = useParams();
  const { isAdmin } = useMe();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { lot, error, isLoading } = useLot({ id: id });
  const nav = useNavigate();
  const [activeInfoPage, setActiveInfoPage] = useState<'kit' | 'damages' | 'to' | 'autoteka'>('kit');
  const [bid, setBid] = useState<string | number | undefined>('');
  const { bidMutation } = useBid();
  const { isMobile } = useApp();

  if (error) {
    const err = error as AxiosError<{ error: string }>;
    return <Box>Ошибка: {err.response?.data?.error || err.message}</Box>;
  }

  if (isLoading) {
    return <CustomLoader label="Загружаем информацию о лоте..." />;
  }

  const isEnd = lot.stage === 'finished' || lot.stage === 'third_stage';
  const isStarted = lot.stage && lot.stage !== 'preparing';


  const galleryItems = lot.sales_pictures.map((p: Picture) => ({
    original: ermurl + p.url,
    thumbnail: ermurl + p.url
  }));

  if (!galleryItems.length) {
    galleryItems.push({
      original: '/missing.jpg'
    });
  }

  const renderVehicleInfo = ({ head, info }: renderVehicleInfoParams) => (
    <Stack gap={0}>
      <Text fz={14} c="gray.7">
        {head}
      </Text>
      <Text fz={18}>{info}</Text>
    </Stack>
  );

  return (
    <Container size="100%">
      {/* Заголовок */}
      <Card bg="blue.9" radius={0} style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }} mt={40} pos="relative">
        <Box pos="absolute" top={20} right={20}>
          <Flex gap={10}>
            {isAdmin && (
              <ActionIcon
                size="lg"
                color="white"
                variant="light"
                onClick={() => nav('edit')}
              >
                <IconSettings />
              </ActionIcon>
            )}
            <ActionIcon onClick={() => nav('/lots')} size="lg" color="white" variant="light">
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

      <Card bg="gray.1" withBorder w="100%" radius={0}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card
              withBorder
              radius="md"
              p={0}
              maw="100%"
            >
              <ImageGallery
                items={galleryItems}
                showPlayButton={false}
                showFullscreenButton={true}
                showNav={!isMobile}
                showIndex={true}
                thumbnailPosition="bottom"
                slideDuration={0}
                lazyLoad={false}
                useBrowserFullscreen={false}
                onScreenChange={(fullscreen) => setIsFullscreen(fullscreen)}
                renderItem={(item) => (
                  <img
                    src={item.original}
                    alt={item.originalAlt}
                    style={{
                      width: '100%',
                      height: isMobile
                        ? isFullscreen
                          ? 700
                          : '30vh'
                        : isFullscreen
                          ? 900
                          : '50vh',
                      objectFit: 'contain'
                    }}
                  />
                )}
                renderThumbInner={(item) => (
                  <img
                    src={item.thumbnail}
                    alt={item.thumbnailAlt}
                    style={{
                      width: '100%',
                      height: 80,
                      objectFit: 'cover'
                    }}
                  />
                )}
                renderLeftNav={(onClick, disabled) => (
                  <Button
                    variant="subtle"
                    color="blue"
                    radius="xl"
                    size="lg"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 10,
                      transform: 'translateY(-50%)',
                      zIndex: 10
                    }}
                    onClick={onClick}
                    disabled={disabled}
                  >
                    <IconChevronLeft size={32} />
                  </Button>
                )}
                renderRightNav={(onClick, disabled) => (
                  <Button
                    variant="subtle"
                    color="blue"
                    radius="xl"
                    size="lg"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: 10,
                      transform: 'translateY(-50%)',
                      zIndex: 10
                    }}
                    onClick={onClick}
                    disabled={disabled}
                  >
                    <IconChevronRight size={32} />
                  </Button>
                )}
              />
            </Card>
          </Grid.Col>

          {/* Ставки */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Card radius="lg" bg="blue.9">
              <Tooltip label="Тут скоро будет инструкция">
                <Text ta="center" fz={isMobile ? 18 : 25} c="white">
                  {stageStrings[lot.stage as keyof typeof stageStrings]}
                </Text>
              </Tooltip>
            </Card>
            <Box mt={20}>
              <Card radius="lg">
                <Stack>
                  {lot.stage === 'second_stage' && (
                    <Tooltip label="Максимально предложенная сумма из первого этапа">
                      <Flex justify="space-between" align="flex-end">
                        <Text fz={20}>Текущая ставка</Text>
                        <Text fz={25} fw="bold" c="red.9">
                          {lot.second_stage_minimal_price?.toLocaleString('ru-RU') || 0} ₽
                        </Text>
                      </Flex>
                    </Tooltip>
                  )}
                  {lot.my_bid ? (
                    <Flex justify="space-between" align="flex-end">
                      <Text fz={20}>Ваша ставка</Text>
                      <Text fz={25} fw="bold" c="blue.9">
                        {lot.my_bid.toLocaleString('ru-RU')} ₽
                      </Text>
                    </Flex>
                  ) : (
                    (isStarted || isEnd) && (
                      <Flex gap={10} align="flex-end">
                        <Text fz={20}>Вы не сделали ставку</Text>
                        <IconMoodSad stroke={1.5} size={30} />
                      </Flex>
                    )
                  )}
                  {isEnd ? (
                    <Card bg="red.1" radius="lg" p={10}>
                      <Text c="red.9" ta="center" fw="bold" fz={20}>
                        Второй этап завершен, ставку поставить нельзя
                      </Text>
                    </Card>
                  ) : isStarted ? (
                    <Stack>
                      <Flex justify="space-between" align="flex-end" direction={{ base: 'column', sm: 'row' }} gap={10}>
                        <NumberInput
                          max={100000000}
                          size="lg"
                          w={{ base: '100%', sm: '60%' }}
                          placeholder="Ставка"
                          allowDecimal={false}
                          allowNegative={false}
                          thousandSeparator={' '}
                          value={bid}
                          onChange={setBid}
                        />
                        <Button
                          onClick={() => bidMutation.mutate({ value: bid, lot_id: id })}
                          color="green.7"
                          size="lg"
                          disabled={!bid || Number(bid) < (lot.second_stage_minimal_price ?? 0)}
                          w={{ base: '100%', sm: '35%' }}
                          leftSection={bidMutation.status === 'pending' && <MantineLoader type="dots" color="white" />}
                        >
                          Отправить
                        </Button>
                      </Flex>
                    </Stack>
                  ) : (
                    <Card bg="blue.1" radius="lg" p={10}>
                      <Text c="blue.9" ta="center" fw="bold" fz={20}>
                        Аукцион еще не начался
                      </Text>
                    </Card>
                  )}
                </Stack>
              </Card>
            </Box>
          </Grid.Col>
        </Grid>

        {/* Характеристики + Документы + Связь */}
        <Grid mt={10}>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card>
              <Flex gap={5} align="center">
                <ThemeIcon color="red.9" variant="transparent">
                  <IconAdjustmentsHorizontal />
                </ThemeIcon>
                <Text fw="bold" fz={18}>
                  Характеристики автомобиля
                </Text>
              </Flex>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} px={10} mt={20} spacing={16}>
                <Stack>
                  {renderVehicleInfo({ head: 'Марка', info: lot.brand_name })}
                  {renderVehicleInfo({ head: 'КПП', info: lot.gearbox.name })}
                </Stack>
                <Stack>
                  {renderVehicleInfo({ head: 'Модель', info: lot.vehicle_model_name })}
                  {renderVehicleInfo({ head: 'Тип топлива', info: lot.fuel_type.name })}
                </Stack>
                <Stack>
                  {renderVehicleInfo({ head: 'Г. В.', info: lot.vehicle_year_of_production + ' г.' })}
                  {renderVehicleInfo({ head: 'Кузов', info: lot.body_type.name })}
                </Stack>
                <Stack>
                  {renderVehicleInfo({ head: 'Пробег', info: Number(lot.return_km).toLocaleString('ru-RU') + ' км' })}
                  {renderVehicleInfo({ head: 'Город', info: lot.city_of_remarketing_name })}
                </Stack>
              </SimpleGrid>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 2 }}>
            <Card>
              <Flex gap={5} align="center">
                <ThemeIcon color="blue.9" variant="transparent">
                  <IconShield />
                </ThemeIcon>
                <Text fw="bold" fz={18}>
                  Документы
                </Text>
              </Flex>
              <Stack mt={20} pl={10}>
                {renderVehicleInfo({ head: 'VIN-номер', info: lot.vin })}
                {renderVehicleInfo({ head: 'Гос. номер', info: lot.vehicle_plate_no })}
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 3 }}>
            <Card>
              <Flex gap={5} align="center">
                <ThemeIcon color="blue.9" variant="transparent">
                  <IconMessage />
                </ThemeIcon>
                <Text fw="bold" fz={18}>
                  Связаться с нами
                </Text>
              </Flex>
              <Stack mt={20} gap="lg">
                <Flex gap={10} px={10} align="center">
                  <ThemeIcon variant="light" size="lg" color="blue.9">
                    <IconPhone />
                  </ThemeIcon>
                  <Anchor fz={16} href="tel:88003336300" c="black">
                    8 (800) 333-63-00
                  </Anchor>
                </Flex>
                <Flex gap={10} px={10} align="center">
                  <ThemeIcon variant="light" size="lg" color="red.9">
                    <IconMail />
                  </ThemeIcon>
                  <Anchor fz={16} href="mailto:remarketing@ap-ru.com" c="black">
                    remarketing@ap-ru.com
                  </Anchor>
                </Flex>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Нижнее меню */}
      <Flex
        bg="blue.9"
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
        <Stack gap={2} w={isMobile ? '100%' : 'auto'}>
          <Flex gap={10} align="center" style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('autoteka')}>
            <IconCarGarage color="white" />
            <Text c="white" fz={20}>
              Автотека
            </Text>
          </Flex>
          {activeInfoPage === 'autoteka' && <Divider color="white" size={3} style={{ borderRadius: 20 }} />}
        </Stack>
      </Flex>

      {/* Контент */}
      <Card bg="gray.1" radius={0} style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} mb={40}>
        {activeInfoPage === 'to' && <ToInfoPage service_requests={lot.service_requests || []} />}
        {activeInfoPage === 'damages' && <DamagesInfoPage damages={lot.damages || []} editable={false} />}
        {activeInfoPage === 'kit' &&
          <KitInfoPage vehicle_options={lot.vehicle_options} remarketing_options={lot.remarketing_options} />}
        {activeInfoPage === 'autoteka' && <AutotekaInfoPage />}
      </Card>
    </Container>
  );
};
