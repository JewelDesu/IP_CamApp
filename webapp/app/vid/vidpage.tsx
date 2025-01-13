"use client";
import React from 'react'
import ReactPlayer from 'react-player/youtube'

  
  export default function Vid1() {
    return(
        <div>
            <ReactPlayer url='http://192.168.0.142:4000/mystream.m3u8' playing={true} />
        </div>
    );
  }