'use client'
import React from 'react';
import VideoGrid from '../components/videogrid';
import VideoSingle from '../components/videosingle';
import Modal from './Modalrefresh';
import { useEffect, useState } from 'react';
import VideoModal from '../components/modals/videoTimeStampModal';

interface Post {
  ID: number;
  ipaddr: string;
  vendor: string;
}

const App: React.FC = () => {

  const [posts, setVideos] = useState<Post[]>([]);
  const openModal = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false)


  useEffect(() => {
    fetch("http://localhost:3000/api/sqlite", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const videoSources = posts.map(post => post.ipaddr);
  if(posts.length ==0)
  {
    return(
      <Modal open={openModal}/>

    );
  }
  else if(posts.length == 1){
    return(
        <VideoSingle videoSource={videoSources}/>
    );
  } else { 
    return (
      <div>
        <button className="buttonVideos" onClick={() => setOpenVideoModal(true)}> Videos </button>
          <VideoModal openVideo={openVideoModal} onVideoClose={() => setOpenVideoModal(false)}/>
        <VideoGrid videoSources={videoSources} videoCount={posts.length} />
      </div>
    );
  }
};


export default App;