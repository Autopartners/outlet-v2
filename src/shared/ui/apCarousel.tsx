import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { ermurl } from '@/shared/lib/api.ts';

interface Picture {
    url: string;
    id: number;
}

interface ApCarouselProps {
    pictures: Picture[];
    h?: number
}

export const ApCarousel = ({ pictures, h = 300 }: ApCarouselProps) => {
  return (
    <Carousel withIndicators height={h} controlSize={40}>
      {pictures.map((pict: Picture) => (
        <Carousel.Slide key={pict.id}>
          <Image style={{ objectPosition: 'center' }} h={h} src={ermurl + pict.url} />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}