'use client';
import React, { useState } from 'react';
import DahButtons from "./dahua_buttons"
import VideoSingle from '../components/videosingle';
import './styles.css';

type VideoGridProps = {
  videoSources: string[];
  videoPassw: string[];
  videoCount: number;
};

const VideoGrid: React.FC<VideoGridProps> = ({ videoSources, videoPassw, videoCount }) => {
  const [currentVideo, setCurrentVideo] = useState<{
    isOpen: boolean;
    source: string;
    password: string;
  }>({ isOpen: false, source: '', password: '' });
  
  const handleVideoClick = (source: string, password: string) => {
    setCurrentVideo({ isOpen: true, source, password });
  };
  const camip = "http://admin:"
  const camip2 = "/cgi-bin/mjpg/video.cgi?subtype=1"
  return (
    <div className='grid' >
      {videoSources.slice(0, videoCount).map((source, index) => (
        <div  key={index}>
        <img className='videogrid' src={camip.concat(videoPassw[index],"@",source,camip2) } onClick={() => handleVideoClick(source, videoPassw[index])}/>
      </div>
      ))}
      <div className='midbox'> 
      </div>
      <div>
      <VideoSingle
        openVideo={currentVideo.isOpen} videoSources={currentVideo.source} videoPassw={currentVideo.password} 
      />
      </div>
    </div>

  );
};
export default VideoGrid;
