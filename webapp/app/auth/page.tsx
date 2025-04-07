'use client'
import React from 'react';
import VideoGrid from '../components/videogrid';
import VideoSingle from '../components/videosingle';
import Modal from './Modalrefresh';
import { useEffect, useState } from 'react';
import VideoModal from '../components/modals/videoTimeStampModal';
import AddCameraModal from '../components/modals/addCamera';
import SettingsModal from '../components/modals/settingsModal';
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
  const [openVideoModal, setOpenVideoModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openSettingsModal, setSettingsModal] = useState(false)


  useEffect(() => {
    const cachedData = localStorage.getItem("fetchedData1");
    if (cachedData) {
      setVideos(JSON.parse(cachedData));
    } else {
    fetch("./api/sqliteCameras", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
       
      })
    }
  }, []);

  useEffect(() => {
    const cachedData = localStorage.getItem("fetchedData2");
    if (cachedData) {
      setCam(JSON.parse(cachedData));
    } else {
    fetch("./api/sqlite", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then((res) => res.json())
      .then((data) => {
        setCam(data);
        //localStorage.setItem("fetchedData2", JSON.stringify(data));
      })
    }
}, []);

  const videoSources = posts.map(post => post.ipaddr);
  const videoPassw = posts.map(post => post.password);
  const videoVendor = camPosts.map(posts => posts.vendor);
  const videoSource = camPosts.map(posts => posts.ipaddr)
  if(posts.length ==0)
  {
    return(
      <Modal camIp={videoSource} count={camPosts.length} vend={videoVendor}/>

    );
  }
  else if(posts.length == 1){
    return(
      <div className='main'>
        <div className="buttonVideos">
        <button onClick={() => setOpenVideoModal(true)}> Videos </button>
        <button onClick={() => setSettingsModal(true)}> Settings </button>
        <button onClick={() => setOpenAddModal(true)} > Add camera </button>
        </div>
        <VideoSingle openVideo={true} videoSources={videoSources[0]} videoPassw={videoPassw[0]}/>
        <VideoModal openVideo={openVideoModal} onVideoClose={() => setOpenVideoModal(false)}/>
        <SettingsModal open={openSettingsModal} camIp={videoSources} count={posts.length} onClose={() => setSettingsModal(false)} />
        <AddCameraModal open={openAddModal} onClose={() => setOpenAddModal(false)}/>
        </div>
    );
  } else { 
    return (
      <div className='main'>
                <div className="buttonVideos">
        <button onClick={() => setOpenVideoModal(true)}> Videos </button>
        <button onClick={() => setSettingsModal(true)}> Settings </button>
        <button onClick={() => setOpenAddModal(true)} > Add camera </button>
        </div>
        <VideoGrid videoSources={videoSources} videoPassw={videoPassw} videoCount={posts.length} />
          <VideoModal openVideo={openVideoModal} onVideoClose={() => setOpenVideoModal(false)}/>
          <SettingsModal open={openSettingsModal} camIp={videoSources} count={posts.length} onClose={() => setSettingsModal(false)} />
          <AddCameraModal open={openAddModal} onClose={() => setOpenAddModal(false)}/>
      </div>
    );
  }
};


export default App;