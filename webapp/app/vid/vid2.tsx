'use client'
import './styles.css'
import * as React from "react";
import Hls from "hls.js";



export default function Vid2() {
  const [hls] = React.useState(new Hls());
  const [hls2] = React.useState(new Hls());
  const videoEl = React.useRef(null);
  const videoE2 = React.useRef(null);

  //const source = ['https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'];
  //const video = document.querySelectorAll('video');
  React.useEffect(() => {
    if (videoEl.current) {
      hls.attachMedia(videoEl.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(
          "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        );
      });
    }
  });

  React.useEffect(() => {
    if (videoE2.current) {
      hls2.attachMedia(videoE2.current);
      hls2.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls2.loadSource(
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
        );
      });
    }
  });

  return (
    <div className="App" >
      <video className='vid2' ref={videoEl}  />
      <img src="http://192.168.1.117/cgi-bin/mjpg/video.cgi?subtype=1"/> 
    </div>
  );


}
