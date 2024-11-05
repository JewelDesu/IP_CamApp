'use client'
import './styles.css'
import * as React from "react";
import { useEffect } from 'react';
import Hls from "hls.js";

const camip:string = "http://admin:admin@"
const camip2:string = "/cgi-bin/mjpg/video.cgi?subtype=1"
const vid:string = "192.168.0.113"

const source:string = camip.concat(vid,camip2);

export default function Vid2() {
  const [hls] = React.useState(new Hls());
  const [hls2] = React.useState(new Hls());
  const videoEl = React.useRef(null);
  const videoE2 = React.useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = fetch('api/active_ips')
      const response = (await data).json()
      console.log(response)
    }
    fetchData()
  }, [])
  //const source = ['https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'];
  //const video = document.querySelectorAll('video');

  return (
    <div className="App" >
      <video className='vid2' ref={videoEl}  />
      <img src={source}/>
      <img src="http://admin:admin@192.168.0.113/cgi-bin/mjpg/video.cgi?subtype=1"/> 
    </div>
  );


}
//rtsp://admin:admin@<ip>:192.168.0.113/cam/playback?channel=1&starttime=2024_11_03_22_03_00&endtime=2024_11_03_22_04_00