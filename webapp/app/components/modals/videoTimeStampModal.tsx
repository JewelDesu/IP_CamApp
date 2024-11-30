import React from "react";
import { useEffect, useState } from 'react';


interface Post {
    ID: number;
    videoName: string;
  }

const VideoModal = ({openVideo,onVideoClose}) => {
  const [posts, setVideos] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/sqlitevid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const videoName = posts.map(post => post.videoName);

  if(!openVideo) return null
  if(posts.length ==0){
      return(
        <div className="overlay" onClick={onVideoClose}>
          <meta http-equiv="Cache-Control" content="no-cache"></meta>
          <div onClick={(e) => {
              e.stopPropagation()
          }} className="container">
            <p> VIDEOS NOT FOUND</p>
          </div>
            
      </div>
    
      );
  } else { 
    return (
      <div className="overlay" onClick={onVideoClose}>
        <meta http-equiv="Cache-Control" content="no-cache"></meta>
        <div onClick={(e) => {
            e.stopPropagation()
        }} className="container">
          <div style={styles.grid} >
          {videoName.slice(0, posts.length).map((source, index) => (
            <div  key={index}>
              <video width="1200" height="720" controls>
                <source src={`./${source}.mp4`} type="video/mp4" />
              </video>
            </div>
          ))}
          </div>
        </div>
            
    </div>
    );
  }
}
const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  video: {
    width: '75%',
    borderRadius: '8px',
    display: 'flex'
  },

};
export default VideoModal