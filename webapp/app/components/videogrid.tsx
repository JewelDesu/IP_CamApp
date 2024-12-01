'use client';
import React from 'react';
import DahButtons from "./dahua_buttons"
import './styles.css';


type VideoGridProps = {
  videoSources: string[];
  videoCount: number;
};

const camip = "http://admin:testingA!@"
const camip2 = "/cgi-bin/mjpg/video.cgi?subtype=1"

const VideoGrid: React.FC<VideoGridProps> = ({ videoSources, videoCount }) => {
  return (
    <div style={styles.grid} >
      {videoSources.slice(0, videoCount).map((source, index) => (
        <div  key={index}>
        <img style={styles.video} src={camip.concat(source,camip2)}/>
        
        <DahButtons videoIp={source} />
      </div>
      ))}
      
    </div>

  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  video: {
    width: '95%',
    borderRadius: '8px',
    display: 'flex',
    margin: 'auto',
  },

};

export default VideoGrid;



