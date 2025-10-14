import { Anchor, Card, Flex, Grid, SimpleGrid, Stack, ThemeIcon, Text } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconMail, IconMessage, IconPhone, IconShield } from '@tabler/icons-react';
import type { Lot } from '@/entities/lot';

export const LotInfoSections = ({ lot }: {lot: Lot}) => {

  const renderVehicleFeatureInfo = ({ head, info }: { head: string, info: string }) => (
    <Flex gap={10} align="center">
      <Text fz={16} c="gray.7">
        {head}
        :
      </Text>
      <Text fz={18}>{info}</Text>
    </Flex>
  );

  return (
    <Grid mt={10}>
      <Grid.Col span={{ base: 12, md: 7 }}>
        <Card h="100%">
          <Flex gap={5} align="center">
            <ThemeIcon color="red.9" variant="transparent">
              <IconAdjustmentsHorizontal />
            </ThemeIcon>
            <Text fw="bold" fz={18}>
              Характеристики автомобиля
            </Text>
          </Flex>
          <SimpleGrid cols={{ base: 1, sm: 3, md: 3 }} px={10} mt={20} spacing={16}>
            <Stack gap={5}>
              {renderVehicleFeatureInfo({ head: 'Марка', info: lot.vehicle_brand_name })}
              {renderVehicleFeatureInfo({ head: 'КПП', info: lot.gearbox_name })}
            </Stack>
            <Stack gap={5}>
              {renderVehicleFeatureInfo({ head: 'Тип топлива', info: lot.fuel_type_name })}
              {renderVehicleFeatureInfo({ head: 'Кузов', info: lot.body_type_name })}
            </Stack>
            <Stack gap={5}>
              {renderVehicleFeatureInfo({ head: 'Модель', info: lot.vehicle_model_name })}
            </Stack>
          </SimpleGrid>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 3 }}>
        <Card h="100%">
          <Flex gap={5} align="center">
            <ThemeIcon color="blue.9" variant="transparent">
              <IconShield />
            </ThemeIcon>
            <Text fw="bold" fz={18}>
              Документы
            </Text>
          </Flex>
          <Stack mt={20} pl={10} gap={5}>
            {renderVehicleFeatureInfo({ head: 'VIN-номер', info: lot.vin })}
            {renderVehicleFeatureInfo({ head: 'Гос. номер', info: lot.vehicle_plate_no })}
          </Stack>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 2 }}>
        <Card h="100%">
          <Flex gap={5} align="center">
            <ThemeIcon color="blue.9" variant="transparent">
              <IconMessage />
            </ThemeIcon>
            <Text fw="bold" fz={18}>
              Связаться с нами
            </Text>
          </Flex>
          <Stack mt={20} gap={10}>
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
  );
};