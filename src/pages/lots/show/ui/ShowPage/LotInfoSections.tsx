import { Anchor, Card, Flex, Grid, SimpleGrid, Stack, ThemeIcon, Text } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconMail, IconMessage, IconPhone, IconShield } from '@tabler/icons-react';
import type { Lot } from '@/entities/lot';
import { useApp } from '@/app/providers/app/useApp';

export const LotInfoSections = ({ lot }: {lot: Lot}) => {
  const { isMobile } = useApp();

  const renderVehicleFeatureInfo = ({ head, info, line = false }: { head: string, info: string, line?: boolean }) => {
    if (isMobile && !line) {
      return (
        <Stack gap={0}>
          <Text fz={16} c="gray.7">
            {head}
          </Text>
          <Text fz={18}>{info}</Text>
        </Stack>
      );
    }
    return (
      <Flex gap={10} align="center">
        <Text fz={16} c="gray.7">
          {head}
          :
        </Text>
        <Text fz={18}>{info}</Text>
      </Flex>
    );
  };

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
          <SimpleGrid cols={{ base: 2, sm: 3, md: 3 }} px={10} mt={10} verticalSpacing={5}>
            {renderVehicleFeatureInfo({ head: 'Марка', info: lot.vehicle_brand_name })}
            {renderVehicleFeatureInfo({ head: 'КПП', info: lot.gearbox_name })}
            {renderVehicleFeatureInfo({ head: 'Тип топлива', info: lot.fuel_type_name })}
            {renderVehicleFeatureInfo({ head: 'Кузов', info: lot.body_type_name })}
            {renderVehicleFeatureInfo({ head: 'Модель', info: lot.vehicle_model_name })}
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
          <Stack mt={10} pl={10} gap={5}>
            {renderVehicleFeatureInfo({ head: 'VIN-номер', info: lot.vin, line: true })}
            {renderVehicleFeatureInfo({ head: 'Гос. номер', info: lot.vehicle_plate_no, line: true })}
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
          <Stack mt={10} gap={10}>
            <Flex gap={10} px={10} align="center">
              <ThemeIcon variant="light" size="md" color="blue.9">
                <IconPhone size={20} />
              </ThemeIcon>
              <Anchor fz={16} href="tel:88003336300" c="black">
                8 (800) 333-63-00
              </Anchor>
            </Flex>
            <Flex gap={10} px={10} align="center">
              <ThemeIcon variant="light" size="md" color="red.9">
                <IconMail size={20} />
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