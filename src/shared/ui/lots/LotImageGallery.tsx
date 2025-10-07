import { type ReactNode, type RefObject, useState } from 'react';
import ImageGallery, { type ReactImageGalleryItem } from 'react-image-gallery';
import { Button } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type LotImageGalleryProps = {
  items: ReactImageGalleryItem[];
  isMobile: boolean;
  galleryRef?: RefObject<ImageGallery | null>;
  renderCustomControls?: () => ReactNode;
  heightMobile?: string | number;
  heightDesktop?: string | number;
};

export const LotImageGallery = (
  {
    items, isMobile, galleryRef, renderCustomControls,
    heightMobile = '30vh', heightDesktop = '40vh'
  }:LotImageGalleryProps) => {

  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageHeight = isMobile ? (isFullscreen ? 700 : heightMobile) : isFullscreen ? 900 : heightDesktop;

  return (
    <ImageGallery
      ref={galleryRef}
      items={items}
      showPlayButton={false}
      showFullscreenButton={true}
      showNav={!isMobile}
      showIndex={true}
      thumbnailPosition="bottom"
      slideDuration={0}
      lazyLoad={false}
      useBrowserFullscreen={false}
      onScreenChange={(fullscreen) => setIsFullscreen(fullscreen)}
      renderCustomControls={renderCustomControls}
      renderItem={(item) => (
        <img
          src={item.original}
          alt={item.originalAlt || 'gallery image'}
          style={{
            width: '100%',
            height: imageHeight,
            objectFit: 'contain'
          }}
        />
      )}
      renderThumbInner={(item) => (
        <img
          src={item.thumbnail}
          alt={item.thumbnailAlt || 'thumbnail'}
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
  );
}