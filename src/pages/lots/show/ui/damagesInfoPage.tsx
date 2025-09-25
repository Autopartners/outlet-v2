import { ActionIcon, Badge, Button, Card, Flex, Grid, Text } from '@mantine/core';
import { useState } from 'react';
import Schema from '@/pages/lots/show/ui/schema.tsx';
import { useApp } from '@/app/providers/app/useApp.ts';
import ImageGallery from 'react-image-gallery';
import { api, ermurl } from '@/shared/lib/api.ts';
import { IconChevronLeft, IconChevronRight, IconEye, IconEyeOff } from '@tabler/icons-react';

interface DamagePart {
  canvas_position_x: number;
  canvas_position_y: number;
  title?: string;
}

interface Picture {
  url: string;
  id: number;
}

interface Damage {
  id: number;
  left_right: number;
  part_damages: [{ description: string; damage_type: { title: string } }];
  damage_part: DamagePart;
  pictures: Picture[];
  hide_on_auction: boolean;
}

interface damagesInfoPageParams {
  damages: Damage[];
  editable: boolean;
}

export const DamagesInfoPage = ({ damages, editable }: damagesInfoPageParams) => {
  const [selected, setSelected] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stateDamages, setStateDamages] = useState(damages);
  const { notification } = useApp();
  const [hovered, setHovered] = useState<number | null>();
  const { isMobile } = useApp();

  const hide = async (id: number, i: number, state: boolean) => {
    const newDamages = [...stateDamages];
    newDamages[i] = { ...newDamages[i], hide_on_auction: state };
    setStateDamages(newDamages);

    try {
      const res = await api.patch(`/erm/damages/${id}`, { damage: { hide_on_auction: state } });
      if (res) {
        notification.green('Успех!');
      }
    } catch {
      notification.red('Ошибка!');
      setStateDamages(stateDamages);
    }
  };

  const list = stateDamages.filter(d => editable || !d.hide_on_auction).map((d, i) => {
    const types = d.part_damages
      .map((t) => {
        const description = t.description ? `(${t.description})` : '';
        return `${t.damage_type.title} ${description}`;
      })
      .join(', ');
    const name = `${d.damage_part.title}: ${types}`;

    const isHovered = hovered === i;
    const isSelected = selected === i;

    return (
      <Card
        key={i}
        shadow="xs"
        radius="md"
        withBorder
        mb={6}
        padding={8}
        bg={isHovered ? '#e7f5ff' : isSelected ? '#edf2ff' : 'white'}
        onMouseEnter={() => setHovered(i)}
        onClick={() => setSelected(i)}
        style={{ cursor: 'pointer', transition: 'background 0.2s' }}
      >
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={10}>
            <Badge
              variant="filled"
              color={isHovered ? 'blue' : isSelected ? 'indigo' : 'gray'}
            >
              {i + 1}
            </Badge>
            <Text>{name}</Text>
          </Flex>
          {editable &&
            <ActionIcon variant="subtle" onClick={() => hide(d.id, i, !d.hide_on_auction)}>
              {d.hide_on_auction ? <IconEyeOff /> : <IconEye />}
            </ActionIcon>
          }
        </Flex>
      </Card>
    );
  });

  const actions = { selected, setSelected, hovered, setHovered };

  return (
    <Flex justify="center">
      <Card w={isMobile ? '100%' : '80%'} withBorder p="lg" bg="white">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <Card w="100%" withBorder shadow="md">
              <ImageGallery
                items={stateDamages[selected].pictures.map((p) => ({
                  original: ermurl + p.url,
                  thumbnail: ermurl + p.url
                }))}
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
                          : '40vh',
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
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Flex direction="column" maw="100%" mt={isMobile ? 'md' : 0} align="center">
              <Schema {...actions} damages={stateDamages.filter(d => editable || !d.hide_on_auction)} />
              <Flex direction="column">{list}</Flex>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>
    </Flex>
  );
};
