import React, { useState } from 'react';
import { cards } from '@/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const CardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

//   const isCenterSlide = (index) => {
//     const middleIndex = Math.floor(cards.length / 2);
//     return index === (activeIndex + middleIndex) % cards.length;
//   };

  return (
    <Carousel 
      className="w-full max-w-3xl mx-auto"
      // showThumbs={false}
      // centerMode={true}
      // centerSlidePercentage={100 / cards.length}
      // selectedItem={activeIndex}
      onChange={handleSlideChange}
    >
      <CarouselContent className="mt-8 gap-2 w-full">
        {cards.map((card, index) => (
          <CarouselItem key={index} className="px-4 md:basis-1/3 lg:basis-1/3 sm:basis-1/2">
            <div className="flex justify-center">
              <Card 
                className={`relative mb-12 shadow-xl bg-cover bg-center rounded-xl  transition-transform duration-300 hover:scale-125`}
                style={{ backgroundImage: `url(${card.image})`, width: '80vw', maxWidth: '300px', height: 'calc(80vw * 0.75)', maxHeight: '225px' }} // 4:3 aspect ratio
              >
                <CardContent className="absolute inset-0 p-0 flex flex-col justify-end">
                  <div className="absolute bottom-0 z-50 left-1/2 w-11/12 transform -translate-x-1/2 translate-y-4 shadow-xl bg-white p-2 rounded-xl text-xs">
                    {card.text}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CardCarousel;
