'use client'
import './styles.css'
import * as React from "react";
import Hls from "hls.js";


export default function Vid2() {

const [hls] = React.useState(new Hls());
const videoE = React.useRef(null);
const source = ['https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'];

for(let i=0;i<2;i++){


React.useEffect(() => {
    if (videoE.current) {
      hls.attachMedia(videoE.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(
          source[i]
        );
      });
    }
  });

  return (
    <div className="App" >
      <video className='vid2' ref={videoE} autoPlay /> 
    </div>
  );
}
}
