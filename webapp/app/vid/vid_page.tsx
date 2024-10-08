'use client'
import React from 'react'
import ReactPlayer from 'react-player/lazy'

import { 
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
export function VideoPage() {
    const Vid1 = "https://youtu.be/3MQKlh2lnws?si=vzacoInNlx_sK47N"
    const Vid2 = "https://youtu.be/Mgv4swadr48?si=bVnxMad1LIyrWXM3"
    const Vid3 = "https://youtu.be/V6T6R6Oscpw?si=7N3zEv71izXoeEnt"
    const videoProperties = [
        {
        id: 1,
        src: Vid1,
        },
        {
        id: 2,
        src: Vid2,
        },
        {
        id: 3,
        src: Vid3,
        },
    ];


    return(
        <div className="h-full flex items-center justify-center ">
            <div className="md:h-auto md:w-[700px]">
                <Carousel >
                    <CarouselPrevious />
                    <CarouselContent >
                        {videoProperties.map((videoObj) => {
                        return (
                            <CarouselItem key={videoObj.id}>
                                <div className="h-full flex items-center justify-center md:h-fit md:w-fit">
                                    <Card>
                                    <CardContent  >
                                        <ReactPlayer
                                            url={videoObj.src}
                                        />
                                    </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        );
                        })}
                    </CarouselContent>
                    
                    <CarouselNext />
            </Carousel>
        </div>
      </div>
    );
  }