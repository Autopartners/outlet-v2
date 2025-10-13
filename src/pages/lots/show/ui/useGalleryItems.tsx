import { ermurl } from '@/shared/lib/api.ts';
import { useCallback, useRef } from 'react';
import type { Lot, Picture } from '@/entities/lot/model/types.ts';
import { Button, Flex } from '@mantine/core';
import type ImageGallery from 'react-image-gallery';
import { IconCameraRotate, IconCameraStar, IconTrash, IconTrashX } from '@tabler/icons-react';
import { usePicture } from '@/pages/lots/show/api/usePicture.ts';

export const useGalleryItems = ({ mode, lot }: { mode: 'view' | 'edit'; lot: Lot | undefined }) => {
  const imageGallery = useRef<ImageGallery | null>(null);
  const { mutatePicture } = usePicture({ lotId: lot?.id });

  const custom = useCallback(() => {
    const index = imageGallery.current?.getCurrentIndex() ?? 0;
    if (!lot?.sales_pictures?.[index]) { return null; }

    const picture = lot.sales_pictures[index];
    return (
      <Flex gap={10} p={10}>
        <Button
          color={picture.is_deleted ? 'green' : 'blue'}
          leftSection={picture.is_deleted ? <IconTrashX /> : <IconTrash />}
          onClick={() => mutatePicture({
            params:
              { is_deleted: !picture.is_deleted, is_avatar: !picture.is_deleted ? false : picture.is_avatar }, picture_id: picture.id
          })}
        >
          {picture.is_deleted ? 'Восстановить' : 'Скрыть'}
        </Button>
        <Button
          color={picture.is_avatar ? 'orange' : 'green'}
          leftSection={picture.is_avatar ? <IconCameraRotate /> : <IconCameraStar />}
          onClick={() => mutatePicture({
            params:
              { is_avatar: !picture.is_avatar, is_deleted: !picture.is_avatar ? false : picture.is_deleted }, picture_id: picture.id
          })}
        >
          {picture.is_avatar ? 'Убрать аватар' : 'Сделать аватаром'}
        </Button>
      </Flex>
    );
  }, [mutatePicture, lot?.sales_pictures]);

  if (!lot) { return { items: [], custom: undefined, ref: undefined }; }

  if (mode === 'edit') {
    const carousel = lot.sales_pictures.map(e => ({
      original: ermurl + e.url,
      thumbnail: ermurl + e.thumbnail,
      is_deleted: e.is_deleted,
      is_avatar: e.is_avatar,
    }));

    return { items: carousel, custom, ref: imageGallery };
  }

  const filterSortedPict = lot.sales_pictures.filter((pict) => !pict.is_deleted);

  const galleryItems =
    (filterSortedPict && filterSortedPict.length > 0)
      ? filterSortedPict.map((p: Picture) => ({
        original: ermurl + p.url,
        thumbnail: ermurl + p.url
      }))
      : [{ original: '/missing.jpg', thumbnail: '/missing.jpg' }];

  return { items: galleryItems };
};
