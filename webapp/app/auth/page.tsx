'use client'
import React from 'react';
import VideoGrid from '../components/videogrid';
import VideoSingle from '../components/videosingle';
import Modal from './Modalrefresh';
import { useEffect, useState } from 'react';
import VideoModal from '../components/modals/videoTimeStampModal';

interface Post1 {
  ID: number;
  ipaddr: string;
  password: string;
  vendor: string;
}
interface Post2{
  ID: number;
  ipaddr: string;
  vendor: string;
}

const App: React.FC = () => {

  const [posts, setVideos] = useState<Post1[]>([]);
  const [camPosts, setCam] = useState<Post2[]>([]);
  const openModal = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false)


  useEffect(() => {
    fetch("./api/sqliteCameras", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  useEffect(() => {
    fetch("./api/sqlite", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then((res) => res.json())
      .then((data) => setCam(data));
  }, []);

  const videoSources = posts.map(post => post.ipaddr);
  const videoPassw = posts.map(post => post.password);
  const videoVendor = camPosts.map(posts => posts.vendor);
  const videoSource = camPosts.map(posts => posts.ipaddr)
  if(posts.length ==0)
  {
    return(
      <Modal open={openModal} camIp={videoSource} count={camPosts.length} vend={videoVendor}/>

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
        <VideoGrid videoSources={videoSources} videoPassw={videoPassw} videoCount={posts.length} />
      </div>
    );
  }
};


export default App;