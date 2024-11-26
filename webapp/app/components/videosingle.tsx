import * as React from "react";
import DahButtons from "./dahua_buttons"
import './styles.css';

type VideoProp = {
  videoSource: string[];
};

const camip = "http://admin:admin@"
const camip2 = "/cgi-bin/mjpg/video.cgi?subtype=1"

const VideoSingle: React.FC<VideoProp> = ({ videoSource }) => {
    return (
        <div className="mid">
          <img className="singlevideo" src={camip.concat(videoSource,camip2)}/> 
          <DahButtons videoIp={videoSource} />
        </div>
      );
}
export default VideoSingle;