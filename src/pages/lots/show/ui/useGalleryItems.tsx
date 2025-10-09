import { ermurl } from '@/shared/lib/api.ts';
import { useCallback, useMemo, useRef } from 'react';
import type { Lot, Picture } from '@/entities/lot/model/types.ts';
import { Button, Flex } from '@mantine/core';
import type ImageGallery from 'react-image-gallery';
import { IconCameraRotate, IconCameraStar, IconTrash, IconTrashX } from '@tabler/icons-react';
import { usePicture } from '@/pages/lots/show/api/usePicture.ts';

export const useGalleryItems = ({ mode, lot }: { mode: 'view' | 'edit'; lot: Lot | undefined }) => {
  const imageGallery = useRef<ImageGallery | null>(null);
  const { mutatePicture } = usePicture()

  const sortedPics = useMemo(() =>
    lot?.sales_pictures
      ?.sort((a, b) => (a.is_avatar === b.is_avatar ? 0 : a.is_avatar ? -1 : 1))
      ?.sort((a, b) => Number(a.updated_at) - Number(b.updated_at))
      ?.sort((a, b) => Number(a.is_deleted) - Number(b.is_deleted)), [lot?.sales_pictures]
  );

  const custom = useCallback(() => {
    const index = imageGallery.current?.getCurrentIndex() ?? 0;
    const picture = sortedPics?.[index];
    return picture ? (
      <Flex gap={10} p={10}>
        <Button
          color={picture.is_deleted ? 'green' : 'blue'}
          leftSection={picture.is_deleted ? <IconTrashX /> : <IconTrash />}
          onClick={() => mutatePicture({ params: { is_deleted: !picture.is_deleted }, picture_id: picture.id })}
        >
          {picture.is_deleted ? 'Восстановить' : 'Скрыть'}
        </Button>
        <Button
          color={picture.is_avatar ? 'orange' : 'green'}
          leftSection={picture.is_avatar ? <IconCameraRotate /> : <IconCameraStar />}
          onClick={() => mutatePicture({ params: { is_avatar: !picture.is_avatar }, picture_id: picture.id })}
        >
          {picture.is_avatar ? 'Убрать аватар' : 'Сделать аватаром'}
        </Button>
      </Flex>
    ) : null;
  }, [mutatePicture, sortedPics]);

  if (!lot) { return { items: [], custom: undefined, ref: undefined } }

  if (mode === 'edit') {
    const carousel = sortedPics?.map(e => ({
      original: ermurl + e.url,
      thumbnail: ermurl + e.thumbnail,
      is_deleted: e.is_deleted,
      is_avatar: e.is_avatar,
    }));

    return { items: carousel, custom, ref: imageGallery };
  }

  const filterSortedPict = sortedPics?.filter((pict) => !pict.is_deleted)

  const galleryItems =
    (filterSortedPict && filterSortedPict.length > 0)
      ? filterSortedPict.map((p: Picture) => ({
        original: ermurl + p.url,
        thumbnail: ermurl + p.url
      }))
      : [{ original: '/missing.jpg', thumbnail: '/missing.jpg' }];

  return { items: galleryItems };
};
