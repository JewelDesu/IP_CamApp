'use client'

import * as React from "react";
import Hls from "hls.js";

export default function Vid1() {
  const [hls] = React.useState(new Hls());
  const videoEl = React.useRef(null);

  React.useEffect(() => {
    if (videoEl.current) {
      hls.attachMedia(videoEl.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(
          "http://192.168.0.166:4000/live/mystream.m3u8"
        );
      });
    }
  });

  return (
    <div className="App">
      <video ref={videoEl} controls />
    </div>
  );
}


