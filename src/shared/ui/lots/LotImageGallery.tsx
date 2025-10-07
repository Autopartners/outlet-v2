import { Button } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import ImageGallery from 'react-image-gallery';
import { useApp } from '@/app/providers/app/useApp';
import { useState } from 'react';

export const LotImageGallery = ({ galleryItems }: {galleryItems: []}) => {
  const { isMobile } = useApp()
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <ImageGallery
      items={galleryItems}
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
            height: isMobile ? (isFullscreen ? 700 : '30vh') : isFullscreen ? 900 : '50vh',
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
  )
}