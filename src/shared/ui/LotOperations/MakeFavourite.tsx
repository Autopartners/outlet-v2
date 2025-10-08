import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useLike } from '@/pages/lots/index/api/useLots';
import type { Lot } from '@/entities/lot';

interface MakeFavouriteProps {
  lot: Lot,
  page: string,
  per_page: string,
  params: object,
}

export const MakeFavourite = ({ lot, page, per_page, params }:MakeFavouriteProps) => {
  const { mutateLike } = useLike({
    id: Number(lot.id),
    page,
    per_page,
    params,
    status: lot.like_status === 'like' ? 'indifferent' : 'like'
  })

  return (
    <ActionIcon classNames={{ root: 'hoverScale' }} onClick={() => mutateLike()} size="lg" color="yellow.3" variant="transparent">
      {lot.like_status === 'like' ? <IconStarFilled size={32} /> : <IconStar size={32} />}
    </ActionIcon>
  );
}