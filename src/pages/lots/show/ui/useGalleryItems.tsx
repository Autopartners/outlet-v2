import { ermurl } from '@/shared/lib/api.ts';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Lot, Picture } from '@/entities/lot/model/types.ts';
import { Button, Flex } from '@mantine/core';
import type ImageGallery from 'react-image-gallery';
import { IconCameraRotate, IconCameraStar, IconTrash, IconTrashX } from '@tabler/icons-react';

export const useGalleryItems = ({ mode, lot }: { mode: 'view' | 'edit'; lot: Lot | undefined }) => {
  const imageGallery = useRef<ImageGallery | null>(null);
  const [pictures, setPictures] = useState<Picture[]>([]);

  const sortedPics = useMemo(
    () => [...pictures].sort((a, b) => Number(a.is_deleted) - Number(b.is_deleted)),
    [pictures]
  );

  const custom = useCallback(() => {
    const index = imageGallery.current?.getCurrentIndex() ?? 0;
    const picture = sortedPics[index];
    return picture ? (
      <Flex gap={10} p={10}>
        <Button
          color={picture.is_deleted ? 'green' : 'blue'}
          leftSection={picture.is_deleted ? <IconTrashX /> : <IconTrash />}
        >
          {picture.is_deleted ? 'Восстановить' : 'Скрыть'}
        </Button>
        <Button
          color={picture.is_avatar ? 'orange' : 'green'}
          leftSection={picture.is_avatar ? <IconCameraRotate /> : <IconCameraStar />}
        >
          {picture.is_avatar ? 'Убрать аватар' : 'Сделать аватаром'}
        </Button>
      </Flex>
    ) : null;
  }, [sortedPics]);

  useEffect(() => {
    if (lot && lot.sales_pictures && mode === 'edit') {
      setPictures(lot.sales_pictures);
    }
  }, [lot, mode]);

  if (!lot) { return { items: [], custom: undefined, ref: undefined } }

  if (mode === 'edit') {
    const carousel = sortedPics.map(e => ({
      original: ermurl + e.url,
      thumbnail: ermurl + e.thumbnail,
      is_deleted: e.is_deleted,
    }));

    return { items: carousel, custom, ref: imageGallery };
  }

  const galleryItems =
    lot.sales_pictures?.length > 0
      ? lot.sales_pictures.map((p: Picture) => ({
        original: ermurl + p.url,
        thumbnail: ermurl + p.url,
      }))
      : [{ original: '/missing.jpg', thumbnail: '/missing.jpg' }];

  return { items: galleryItems };
};
