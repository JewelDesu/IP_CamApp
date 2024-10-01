"use client";
import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { 
    Card,
    CardContent,
  } from "@/components/ui/card";

  
  export const VideoPage = () =>{
    return(
        <Card className="h-full flex items-center md:h-fit md:w-fit">
            <CardContent >
                <ReactPlayer 
                    url='https://youtu.be/3MQKlh2lnws?si=vzacoInNlx_sK47N'  
                    />
            </CardContent>
        </Card>
    );
  }