import { Badge, Card, Flex, Group } from '@mantine/core';
import { useState } from 'react';
import { ApCarousel } from '@/shared/ui/apCarousel.tsx';
import Schema from '@/pages/lots/show/ui/schema.tsx';
import { useApp } from '@/app/providers/app/useApp.ts';

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
      <Card w={isMobile ? '100%' : '80%'} withBorder p="lg">
        <Flex
          direction={isMobile ? 'column' : 'row'}
          justify="space-between"
          align={isMobile ? 'center' : 'flex-start'}
          gap="lg"
        >
          <ApCarousel
            pictures={damages[selected].pictures || []}
            h={isMobile ? 250 : 400}
            w={isMobile ? '100%' : 750}
          />
          <Flex direction="column" maw={isMobile ? '100%' : '30%'} mt={isMobile ? 'md' : 0}>
            <Schema {...actions} damages={damages} />
            <Flex direction="column">{list}</Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
