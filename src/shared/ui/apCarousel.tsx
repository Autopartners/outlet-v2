import { useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Image, ActionIcon, Modal, Box } from '@mantine/core';
import { IconMaximize } from '@tabler/icons-react';
import { ermurl } from '@/shared/lib/api.ts';

interface Picture {
  url: string;
  id: number;
}

interface ApCarouselProps {
  pictures: Picture[];
  h?: number;
  w?: number | string;
  bottom?: number;
}

export const ApCarousel = ({ pictures, h = 300, w, bottom }: ApCarouselProps) => {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <Carousel
        withIndicators
        w={w}
        height={h}
        controlSize={40}
        emblaOptions={{ loop: true }}
      >
        {pictures.map((pict, idx) => (
          <Carousel.Slide key={pict.id}>
            <Box style={{ position: 'relative', height: '100%' }}>
              <Image
                src={ermurl + pict.url}
                alt=""
                h={h}
                w={w}
                style={{ objectPosition: 'center' }}
              />
              <ActionIcon
                variant="filled"
                color="dark"
                radius="xl"
                size="lg"
                style={{
                  position: 'absolute',
                  bottom: bottom || 12,
                  right: 12,
                  backgroundColor: 'rgba(0,130,255,0.6)'
                }}
                onClick={() => {
                  setActive(idx);
                  setOpened(true);
                }}
              >
                <IconMaximize size={20} />
              </ActionIcon>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="95%"
        withCloseButton
        closeButtonProps={{
          size: 'lg',
          right: 10,
          style: {
            backgroundColor: 'rgba(0,130,255,0.8)'
          }
        }}
        centered
        padding={0}
        styles={{
          body: {
            backgroundColor: '#000'
          }
        }}
      >
        {active !== null && (
          <Carousel
            withIndicators
            controlSize={50}
            h="80vh"
            withKeyboardEvents
            emblaOptions={{ loop: true }}
            initialSlide={active}
            tabIndex={0} // для фокусировки
            data-autofocus
            styles={{
              root: {
                outline: 'none' // убираем свечение при фокусе
              }
            }}
          >
            {pictures.map((pict) => (
              <Carousel.Slide key={pict.id}>
                <Image
                  src={ermurl + pict.url}
                  alt=""
                  h="80vh"
                  fit="contain"
                  radius={0}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </Modal>
    </>
  );
};
