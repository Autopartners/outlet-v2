import { Card, Flex, Badge, Text, Box, ActionIcon } from '@mantine/core';
import { IconSettings, IconX, IconCalendar, IconRoad, IconBuildingSkyscraper, IconSettingsOff } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import type { Lot } from '@/entities/lot';
import { useMe } from '@/app/providers/me/useMe.ts';

export const LotHeader = ({ lot, editable, onClose }: { lot: Lot, editable: boolean, onClose: ()=>void }) => {
  const nav = useNavigate();
  const { isAdmin, isRemarketing } = useMe();

  return (
    <Card bg={editable ? 'dark.5' : 'blue.9'} radius={0} style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }} pos="relative">
      <Box pos="absolute" top={20} right={20}>
        <Flex gap={10}>
          {!editable && (isAdmin || isRemarketing) && (
            <ActionIcon size="lg" color="white" variant="light" onClick={() => nav('edit')}>
              <IconSettings />
            </ActionIcon>
          )}
          {editable && (
            <ActionIcon size="lg" color="white" variant="light" onClick={() => nav(`/lots/${lot.id}`)}>
              <IconSettingsOff />
            </ActionIcon>
          )}
          <ActionIcon onClick={onClose} size="lg" color="white" variant="light">
            <IconX />
          </ActionIcon>
        </Flex>
      </Box>
      <Badge mx={10} size="lg" variant="light" color="white">
        {lot.code}
      </Badge>
      <Flex mt={20} align="center" justify="space-between" px={10}>
        <Text c="white" fz={25}>
          {lot.definition_name}
        </Text>
      </Flex>
      <Flex mx={10} mt={10} gap={20}>
        <Flex gap={5} align="center">
          <IconCalendar color="white" />
          <Text c="white">{lot.vehicle_year_of_production} г.</Text>
        </Flex>
        <Flex gap={5} align="center">
          <IconRoad color="white" />
          <Text c="white">{Number(lot.return_km).toLocaleString('ru-RU')} км</Text>
        </Flex>
        <Flex gap={5} align="center">
          <IconBuildingSkyscraper color="white" />
          <Text c="white">{lot.city_of_remarketing_name}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
