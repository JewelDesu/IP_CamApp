import React from "react";
import { useEffect, useState } from 'react';


interface Post {
    ID: number;
    ipaddr: string;
    eventType: string;
    videoName: string;
    date: string;
  }

const EventModal = ({openEvent,onEventClose}) => {
  const [posts, setVideos] = useState<Post[]>([]);
  
  useEffect(() => {
    if (openEvent) {
    fetch("./api/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then((res) => res.json())
      .then((data) => setVideos(data));
    }
  }, [openEvent]);

  const id = posts.map(post => post.ID);
  const videoSources = posts.map(posts => posts.ipaddr);
  const videoEvent = posts.map(posts => posts.eventType);
  const videoName = posts.map(posts => posts.videoName);
  const videoDate = posts.map(posts => posts.date)


  if(!openEvent) return null
  if(posts.length == 0){
      return(
        <div className="overlay" onClick={onEventClose}>
          <meta http-equiv="Cache-Control" content="no-cache"></meta>
          <div onClick={(e) => {
              e.stopPropagation()
          }} className="container">
            <p> NO EVENTS FOUND</p>
          </div>
            
      </div>
    
      );
  } else { 
    return(
        <div className="overlay" onClick={onEventClose}>
            <div className="eventContainer" >
                <h1> Detected Events for camera {videoSources[0]}</h1>
                {id.slice(0, posts.length).map((source, index) => (
                <div className="eventbox"  key={index} > 
                    Event {source}<br />
                    {videoDate[index]}<br />
                    {videoEvent[index]}<br />
                    {videoName[index]}<br />
                    <video style={styles.video} controls>
                        <source src={`./${videoName[index]}.mp4`} type="video/mp4" />
                    </video>
                </div>
                ) 
                )} 
            </div>
        </div>
    )
  }
}
const styles = {
    video: {
      width: '95%',
      height: '95%',
      margin: 'auto',
    },
  
  };
export default EventModal