import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { ermurl } from '@/shared/lib/api.ts';

interface Picture {
    url: string;
    id: number;
}

interface ApCarouselProps {
    pictures: Picture[];
}

export const ApCarousel = ({ pictures }: ApCarouselProps) => {
  return (
    <Carousel withIndicators height={300}>
      {pictures.map((pict: Picture) => (
        <Carousel.Slide key={pict.id}>
          <Image style={{ objectPosition: 'center' }} h={300} src={ermurl + pict.url} />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}