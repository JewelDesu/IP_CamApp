import React from 'react';
import VideoGrid from '../compinents/videogrid';

const App: React.FC = () => {
  const videos = [
    'http://192.168.0.113/cgi-bin/mjpg/video.cgi?subtype=1',
    'http://192.168.0.113/cgi-bin/mjpg/video.cgi?subtype=1',
    'http://192.168.0.113/cgi-bin/mjpg/video.cgi?subtype=1',
    'http://192.168.0.113/cgi-bin/mjpg/video.cgi?subtype=1',
    'video5.mp4', // this one will be ignored because we limit to four videos
  ];

  return (
    <div>
      <h1>Video Gallery</h1>
      <VideoGrid videoSources={videos} />
    </div>
  );
};

export default App;