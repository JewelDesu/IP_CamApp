import * as React from "react";
import DahButtons from "./dahua_buttons"
import './styles.css';

type VideoProp = {
  videoSources: string[];
  videoPassw: string[];
};

const camip = "http://admin:admin@"
const camip2 = "/cgi-bin/mjpg/video.cgi?subtype=1"

const VideoSingle: React.FC<VideoProp> = ({ videoSources, videoPassw }) => {
    return (
        <div className="mid">
           <img src={camip.concat(videoPassw[0],"@",videoSources[0],camip2)}/> 
          <DahButtons videoIp={videoSources[0]} />
        </div>
      );
}
export default VideoSingle;