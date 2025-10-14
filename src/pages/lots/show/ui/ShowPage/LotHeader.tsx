import { Card, Flex, Badge, Text, ActionIcon } from '@mantine/core';
import { IconSettings, IconX, IconCalendar, IconRoad, IconBuildingSkyscraper, IconSettingsOff } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import type { Lot } from '@/entities/lot';
import { useMe } from '@/app/providers/me/useMe.ts';
import { useApp } from '@/app/providers/app/useApp';

export const LotHeader = ({ lot, editable, onClose }: { lot: Lot, editable: boolean, onClose: ()=>void }) => {
  const nav = useNavigate();
  const { isAdmin, isRemarketing } = useMe();
  const { isMobile } = useApp();

  return (
    <Card bg={editable ? 'dark.5' : 'blue.9'} radius={0} style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }} pos="relative">
      <Flex mt={{ base: 5, sm: 0 }} px={10} justify="space-between">
        <Flex gap={10} align="center">
          <Text c="white" fz={22}>
            {lot.definition_name}
          </Text>
          {!isMobile && (
            <Badge size="lg" variant="light" color="white">
              {lot.code}
            </Badge>
          )}
        </Flex>
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
      </Flex>
      <Flex mx={10} mt={10} justify={{ sm: 'flex-start', base: 'space-between' }} gap={{ sm: 20, base: 0 }}>
        <Flex gap={5} align="center">
          <IconCalendar color="white" />
          <Text c="white" style={{ whiteSpace: 'pre' }}>
            {lot.vehicle_year_of_production}
          </Text>
        </Flex>
        <Flex gap={5} align="center">
          <IconRoad color="white" />
          <Text c="white" style={{ whiteSpace: 'pre' }}>
            {Number(lot.return_km).toLocaleString('ru-RU')}
          </Text>
        </Flex>
        <Flex gap={5} align="center">
          <IconBuildingSkyscraper color="white" />
          <Text c="white">{lot.city_of_remarketing_name}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
