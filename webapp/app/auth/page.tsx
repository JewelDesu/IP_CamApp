'use client'
import React from 'react';
import VideoGrid from '../compinents/videogrid';
import VideoSingle from '../compinents/videosingle';
import Modal from './Modalrefresh';
import { useEffect, useState } from 'react';

interface Post {
  ID: number;
  ipaddr: string;
  vendor: string;
}

const App: React.FC = () => {

  const [posts, setVideos] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/active_ips');
        const data = await response.json();
        if (data && Array.isArray(data.posts)) {
          setVideos(data.posts as Post[]);
          console.log("Data fetched and posts set:", data.posts);
        } else {
          console.warn("Expected data.posts to be an array but got:", data.posts);
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const videoSources = posts.map(post => post.ipaddr);
  if(posts.length ==0)
  {
    return(
      <Modal />
    );
  }
  else if(posts.length == 1){
    return(
        <VideoSingle videoSource={videoSources}/>
    );
  } else { 
    return (
      <div>
        <h1>Video Gallery</h1>
        
        <VideoGrid videoSources={videoSources} videoCount={posts.length} />
      </div>
    );
  }
};


export default App;