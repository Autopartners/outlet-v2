import { Badge, Card, Flex, Group } from '@mantine/core';
import { useState } from 'react';
import { ApCarousel } from '@/shared/ui/apCarousel.tsx';
import Schema from '@/pages/lots/show/ui/schema.tsx';

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
      part_damages: [{ description: string, damage_type: { title: string } }],
      damage_part: DamagePart,
      pictures: Picture[];
    }
  ];
}

export const DamagesInfoPage = ({ damages }: damagesInfoPageParams) => {
  const [selected, setSelected] = useState(1);
  const [hovered, setHovered] = useState<number>();

  const list = damages.map((d, i) => {
    const types = d.part_damages
      .map((t) => {
        const description = t.description ? `(${t.description})` : '';
        return `${t.damage_type.title} ${description}`;
      })
      .join(', ');
    const name = `${d.damage_part.title}: ${types}`;

    const isHovered = hovered === i + 1;
    const isSelected = selected === i + 1;

    return (
      <Card
        key={i}
        shadow="xs"
        radius="md"
        withBorder
        mb={6}
        padding={8}
        bg={isHovered ? '#e7f5ff' : isSelected ? '#edf2ff' : 'white'}
        onMouseEnter={() => setHovered(i + 1)}
        onClick={() => setSelected(i + 1)}
        style={{
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
      >
        <Group>
          <Group>
            <Badge
              variant="filled"
              color={isHovered ? 'blue' : isSelected ? 'indigo' : 'gray'}
            >
              {i + 1}
            </Badge>
            <span>{name}</span>
          </Group>
        </Group>
      </Card>
    );
  });

  const actions = { selected, setSelected, hovered, setHovered };

  return (
    <Flex justify="center">
      <Card w="80%" withBorder p="lg">
        <Flex justify="space-between" align="flex-start">
          <ApCarousel pictures={damages[selected - 1].pictures || []} h={400} w={750}></ApCarousel>
          <Flex direction="column" maw="30%">
            <Schema {...actions} damages={damages} />
            <Flex direction="column">
              {list}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
