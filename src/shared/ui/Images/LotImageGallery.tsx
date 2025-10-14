import { type ReactNode, type RefObject, useState } from 'react';
import ImageGallery, { type ReactImageGalleryItem } from 'react-image-gallery';
import { Box, Button, Flex, Image, ThemeIcon } from '@mantine/core';
import { IconCameraStar, IconChevronLeft, IconChevronRight, IconEyeOff } from '@tabler/icons-react';
import { useApp } from '@/app/providers/app/useApp.ts';
import 'react-image-gallery/styles/css/image-gallery.css';

type LotImageGalleryProps = {
  items: ReactImageGalleryItem[] | undefined;
  galleryRef?: RefObject<ImageGallery | null> | null;
  renderCustomControls?: () => ReactNode | undefined;
  heightMobile?: string | number;
  heightDesktop?: string | number;
};

export const LotImageGallery = (
  {
    items, galleryRef, renderCustomControls,
    heightMobile = '30vh', heightDesktop = '40vh'
  }: LotImageGalleryProps
) => {
  const { isMobile } = useApp();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageHeight = isMobile ? (isFullscreen ? 700 : heightMobile) : isFullscreen ? 900 : heightDesktop;

  return (
    <ImageGallery
      ref={galleryRef}
      items={items || []}
      showPlayButton={false}
      showFullscreenButton={true}
      showNav
      showIndex={true}
      thumbnailPosition="bottom"
      slideDuration={0}
      lazyLoad={false}
      useBrowserFullscreen={false}
      onScreenChange={(fullscreen) => setIsFullscreen(fullscreen)}
      renderCustomControls={renderCustomControls}
      renderItem={(item) => (
        <Image
          radius="lg"
          w="fit-content"
          mx="auto"
          mt={isMobile ? 0 : 10}
          h={imageHeight}
          fit="contain"
          src={item.original}
          alt={item.originalAlt || 'gallery image'}
        />
      )}
      renderThumbInner={(item) => (
        <Box pos="relative">
          <Image radius="lg" src={item.thumbnail} alt={item.thumbnailAlt || 'thumbnail'} w="100%" h={80} fit="cover" />
          <Flex pos="absolute" left={0} right={0} top={0} bottom={0} justify="center" align="center">
            <ThemeIcon variant="subtle" size={40} color="white">
              {item.is_deleted ? <IconEyeOff size={40} /> : (item.is_avatar && <IconCameraStar size={40} />)}
            </ThemeIcon>
          </Flex>
        </Box>
      )}
      renderLeftNav={(onClick, disabled) => (
        <Button
          variant={isMobile ? 'outline' : 'light'}
          color={isMobile ? 'white' : 'blue'}
          radius="xl"
          size={isMobile ? 'xs' : 'lg'}
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
          <IconChevronLeft size={isMobile ? 18 : 32} />
        </Button>
      )}
      renderRightNav={(onClick, disabled) => (
        <Button
          variant={isMobile ? 'outline' : 'light'}
          color={isMobile ? 'white' : 'blue'}
          radius="xl"
          size={isMobile ? 'xs' : 'lg'}
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
          <IconChevronRight size={isMobile ? 18 : 32} />
        </Button>
      )}
    />
  );
};