import React from 'react';
import VideoGrid from '../compinents/videogrid';

interface ScannedIps {
  links: string;
  brand: string;

}



  

const App: React.FC = () => {
  const videos = [
    'http://192.168.0.113/cgi-bin/mjpg/video.cgi?subtype=1',
    'http://admin:testingA!@192.168.6.108/cgi-bin/mjpg/video.cgi?subtype=1',
    'http://admin:testingA!@192.168.6.110/cgi-bin/mjpg/video.cgi?subtype=1',
  ];



  return (
    <div>
      <h1>Video Gallery</h1>
      <VideoGrid videoSources={videos} videoCount={videos.length} />
    </div>
  );
};


export default App;