'use client'
import React from 'react';
import VideoGrid from '../compinents/videogrid';
import { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [dataResponse, setdataResponse] = useState([]);
  const videos = [
    '192.168.0.113',
    '192.168.0.113',
    '192.168.0.113',
    '192.168.0.113',
  ];
  useEffect(() => {
    async function getPageData() {
      const data = './api/vendors'
      const response = await fetch(data);
      const res = (await response).json();
      console.log(res);
      setdataResponse(res.adress)
    }
    getPageData();
  })


  return (
    <div>
      <h1>Video Gallery</h1>
      <VideoGrid videoSources={videos} videoCount={videos.length} />
    </div>
  );
};


export default App;