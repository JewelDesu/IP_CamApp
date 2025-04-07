import * as React from "react";
import DahButtons from "./dahua_buttons"
import './styles.css';

type VideoProp = {
  videoSources: string[];
  videoPassw: string[];
};

const camip = "http://admin:"
  const camip2 = "/cgi-bin/mjpg/video.cgi?subtype=1"

const VideoSingle = ({openVideo, videoSources, videoPassw }) => {
  if(!openVideo) return null
    return (
        <div className="mid">
           <img className="singlevideo" src={camip.concat(videoPassw,"@",videoSources,camip2) }/> 
           {videoSources}
           <button style={{ position: 'absolute', top: 10, right: 10, fontSize: 20 }} >
        Close
      </button>
          <DahButtons videoIp={videoSources} />
        </div>
      );
}
export default VideoSingle;