import {
  ActionIcon, Anchor, Badge, Box, Button, Card, Container, Divider, Flex, Grid, NumberInput, Select, SimpleGrid,
  Stack, Text, ThemeIcon, Tooltip, Loader as MantineLoader
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useLot } from '@/pages/lots/index/api/useLots.ts';
import { CustomLoader } from '@/shared/ui/Loader/Loader.tsx';
import { ApCarousel } from '@/shared/ui/apCarousel.tsx';
import {
  IconAdjustmentsHorizontal, IconBellRinging, IconBolt, IconBuildingSkyscraper, IconCalendar, IconCarCrash,
  IconCarGarage, IconClipboard, IconClock, IconLoader, IconMail, IconMessage, IconMoodSad, IconPhone, IconRoad,
  IconSettings, IconShield, IconX
} from '@tabler/icons-react';
import { useState } from 'react';
import { KitInfoPage } from '@/pages/lots/show/ui/kitInfoPage.tsx';
import { DamagesInfoPage } from '@/pages/lots/show/ui/damagesInfoPage.tsx';
import { ToInfoPage } from '@/pages/lots/show/ui/toInfoPage.tsx';
import { useMe } from '@/app/providers/me/useMe.ts';
import { connecturl } from '@/shared/lib/api.ts';
import { useBid } from '@/pages/lots/show/api/useBid.ts';

const stepsData = [
  { value: '10000', label: '10 000' },
  { value: '50000', label: '50 000' },
  { value: '100000', label: '100 000' }
];

const stageStrings = {
  'preparing': 'Подготовка',
  'first_stage': 'Этап 1',
  'second_stage': 'Этап 2',
  'third_stage': 'Этап 3',
  'finished': 'Закончен'
}

interface renderVehicleInfoParams {
  head: string;
  info: string;
}

export const LotPage = () => {
  const { id } = useParams();
  const { isAdmin } = useMe();
  const { lot, error, isLoading } = useLot({ id: id });
  const nav = useNavigate();
  const [step, setStep] = useState<string | null>('100000');
  const [activeInfoPage, setActiveInfoPage] = useState<'kit' | 'damages' | 'to'>('kit');
  const [bid, setBid] = useState<string | number | undefined>('');
  const { bidMutation } = useBid();

  if (error) {
    nav('/lots');
  }
  if (isLoading || !lot) {
    return <CustomLoader />;
  }

  const isEnd = new Date(lot.third_stage_at) < new Date();
  const isStarted = new Date() > new Date(lot.start_at);

  const renderVehicleInfo = ({ head, info }: renderVehicleInfoParams) => (
    <Stack gap={0}>
      <Text fz={14} c="gray.7">
        {head}
      </Text>
      <Text fz={18}>{info}</Text>
    </Stack>
  );

  return (
    <Container size={1500}>
      <Card bg="blue.9" radius={0} style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }} mt={40} pos="relative">
        <Box pos="absolute" top={20} right={20}>
          <Flex gap={10}>
            {isAdmin && (
              <ActionIcon component="a" target="_blank" href={`${connecturl}outlet/lots/${id}`} size="lg" color="white" variant="light">
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
          <Text c="white" fz={25}>
            {lot.definition_name}
          </Text>
        </Flex>
        <Flex mx={10} mt={10} gap={20}>
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
      <Card bg="gray.1" withBorder w="100%" radius={0} display="grid">
        <Grid p={10}>
          <Grid.Col span={7} style={{ display: 'grid', gridRow: 'span 5' }}>
            <Card withBorder radius="md" p={0}>
              <ApCarousel h={500} pictures={lot.sales_pictures} />
            </Card>
          </Grid.Col>

          <Grid.Col span={5}>
            <Card radius="lg" bg="blue.9">
              <Tooltip label="Тут скоро будет инструкция">
                <Text ta="center" fz={25} c="white">
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
                        <Text fz={20}>Минимальная ставка</Text>
                        <Text fz={25} fw="bold" c="red.9">
                          {lot.second_stage_minimal_price?.toLocaleString('ru-RU') || 0}₽
                        </Text>
                      </Flex>
                    </Tooltip>
                  )}
                  {lot.my_bid ? (
                    <Flex justify="space-between" align="flex-end">
                      <Text fz={20}>Ваша ставка</Text>
                      <Text fz={25} fw="bold" c="blue.9">
                        {lot.my_bid.toLocaleString('ru-RU')}₽
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
                        Аукцион уже завершен
                      </Text>
                    </Card>
                  ) : isStarted ? (
                    <Stack>
                      <Flex justify="space-between" align="flex-end">
                        <NumberInput
                          max={100000000}
                          min={lot.stage === 'second_stage' ? lot.second_stage_minimal_price : 0}
                          size="lg"
                          w="60%"
                          placeholder="Ставка"
                          allowDecimal={false}
                          allowNegative={false}
                          step={Number(step)}
                          thousandSeparator={' '}
                          value={bid}
                          onChange={setBid}
                        />
                        <Button
                          onClick={() => bidMutation.mutate({ value: bid, lot_id: id })}
                          color="green.7"
                          size="lg"
                          disabled={!bid}
                          w="35%"
                          leftSection={bidMutation.status === 'pending' && <MantineLoader type="dots" color="white" />}
                        >
                          Отправить
                        </Button>
                      </Flex>
                      <Select
                        data={stepsData}
                        size="md"
                        label="Шаг ставки"
                        comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                        value={step}
                        onChange={setStep}
                        allowDeselect={false}
                        w="fit-content"
                      />
                    </Stack>
                  ) : (
                    <Card bg="blue.1" radius="lg" p={10}>
                      <Text c="blue.9" ta="center" fw="bold" fz={20}>
                        Аукцион еще не начался
                      </Text>
                      <Button mt={10} w="fit-content" mx="auto" leftSection={<IconBellRinging />} variant="light">
                        Уведомить меня
                      </Button>
                    </Card>
                  )}
                </Stack>
              </Card>
            </Box>

            <Box mt={20}>
              <Card radius="lg" bg="blue.9">
                <Flex justify="space-between" px={20}>
                  <Text fz={16} c="white">
                    {new Date(lot.start_at).toLocaleDateString('ru-RU')} - {new Date(lot.end_at).toLocaleDateString('ru-RU')}
                  </Text>
                  <Flex gap={10}>
                    {isEnd ? <IconClock color="white" /> : isStarted ? <IconBolt color="white" /> : <IconLoader color="white" />}
                    <Text fz={16} c="white">
                      {isEnd ? 'Завершен' : isStarted ? 'В процессе' : 'Ждем начала'}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </Box>
          </Grid.Col>
        </Grid>

        <Flex mt={10}>
          <Card mx={10} w="59%">
            <Flex gap={5} align="center">
              <ThemeIcon color="red.9" variant="transparent">
                <IconAdjustmentsHorizontal />
              </ThemeIcon>
              <Text fw="bold" fz={18}>
                Характеристики автомобиля
              </Text>
            </Flex>
            <SimpleGrid cols={4} px={10} mt={20} spacing={32}>
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

          <Card mx={10} w="20%">
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

          <Card mx={10} w="20%">
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
        </Flex>
      </Card>

      <Flex bg="blue.9" w="100%" h={70} align="center" justify="space-between" px={100}>
        <Stack gap={2}>
          <Flex gap={10} align="center" style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('kit')}>
            <IconClipboard color="white" />
            <Text c="white" fz={20}>
              Комплектация
            </Text>
          </Flex>
          {activeInfoPage === 'kit' && <Divider color="white" size={3} style={{ borderRadius: 20 }} />}
        </Stack>
        <Stack gap={2}>
          <Flex gap={10} align="center" style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('damages')}>
            <IconCarCrash color="white" />
            <Text c="white" fz={20}>
              Повреждения
            </Text>
          </Flex>
          {activeInfoPage === 'damages' && <Divider color="white" size={3} style={{ borderRadius: 20 }} />}
        </Stack>
        <Stack gap={2}>
          <Flex gap={10} align="center" style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('to')}>
            <IconCarGarage color="white" />
            <Text c="white" fz={20}>
              ТО
            </Text>
          </Flex>
          {activeInfoPage === 'to' && <Divider color="white" size={3} style={{ borderRadius: 20 }} />}
        </Stack>
      </Flex>

      <Card bg="gray.1" radius={0} style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} mb={40}>
        {activeInfoPage === 'to' && <ToInfoPage />}
        {activeInfoPage === 'damages' && <DamagesInfoPage />}
        {activeInfoPage === 'kit' && <KitInfoPage />}
      </Card>
    </Container>
  );
};
