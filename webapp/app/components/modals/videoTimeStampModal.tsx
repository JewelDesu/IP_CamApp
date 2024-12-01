import React from "react";
import { useEffect, useState } from 'react';


interface Post {
    ID: number;
    videoName: string;
  }

const VideoModal = ({openVideo,onVideoClose}) => {
  const [posts, setVideos] = useState<Post[]>([]);
  
  useEffect(() => {
    if (openVideo) {
    fetch("./api/sqlitevid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then((res) => res.json())
      .then((data) => setVideos(data));
    }
  }, [openVideo]);

  const videoName = posts.map(post => post.videoName);

  if(!openVideo) return null
  if(posts.length == 0){
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
      <div className="videoOverlay" onClick={onVideoClose}>
        <meta http-equiv="Cache-Control" content="no-cache"></meta>
        <div onClick={(e) => {
            e.stopPropagation()
        }} className="videoContainer">
          <div style={styles.grid} >
          {videoName.slice(0, posts.length).map((source, index) => (
            <div  key={index}>
              <video style={styles.video} controls>
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
    gridTemplateColumns: 'repeat(3, 2fr)',
  },
  video: {
    width: '95%',
    height: '95%',
    margin: 'auto',
  },

};
export default VideoModal