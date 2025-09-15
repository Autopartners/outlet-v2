import { Carousel } from '@mantine/carousel';
import { Image, Box } from '@mantine/core';
import { ermurl } from '@/shared/lib/api.ts';

interface Picture {
  url: string;
  id: number;
}

interface ApCarouselProps {
  pictures: Picture[];
  h?: number;
  w?: number | string;
}

export const ApCarousel = ({ pictures, h = 300, w }: ApCarouselProps) => {

  return (
    <Carousel
      withIndicators
      w={w}
      height={h}
      controlSize={40}
      emblaOptions={{ loop: true }}
    >
      {pictures.map((pict) => (
        <Carousel.Slide key={pict.id}>
          <Box style={{ position: 'relative', height: '100%' }}>
            <Image
              src={ermurl + pict.url}
              alt=""
              h={h}
              w={w}
              style={{ objectPosition: 'center' }}
            />
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
