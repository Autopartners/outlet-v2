import { Badge, Button, Card, Flex, Grid, Group } from '@mantine/core';
import { useState } from 'react';
import Schema from '@/pages/lots/show/ui/schema.tsx';
import { useApp } from '@/app/providers/app/useApp.ts';
import ImageGallery from 'react-image-gallery';
import { ermurl } from '@/shared/lib/api.ts';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface DamagePart {
  canvas_position_x: number;
  canvas_position_y: number;
  title?: string;
}

interface Picture {
  url: string;
  id: number;
}

interface damagesInfoPageParams {
  damages: [
    {
      left_right: number;
      part_damages: [{ description: string; damage_type: { title: string } }];
      damage_part: DamagePart;
      pictures: Picture[];
    }
  ];
}

export const DamagesInfoPage = ({ damages }: damagesInfoPageParams) => {
  const [selected, setSelected] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hovered, setHovered] = useState<number | null>();
  const { isMobile } = useApp();

  const list = damages.map((d, i) => {
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
        <Group>
          <Badge
            variant="filled"
            color={isHovered ? 'blue' : isSelected ? 'indigo' : 'gray'}
          >
            {i + 1}
          </Badge>
          <span>{name}</span>
        </Group>
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
                items={damages[selected].pictures.map((p) => ({
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
              <Schema {...actions} damages={damages} />
              <Flex direction="column">{list}</Flex>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>
    </Flex>
  );
};
