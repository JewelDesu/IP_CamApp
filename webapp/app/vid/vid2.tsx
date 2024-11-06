'use client'
import './styles.css'
import * as React from "react";
import {useState, useEffect } from 'react';
import Hls from "hls.js";

const camip:string = "http://admin:admin@"
const camip2:string = "/cgi-bin/mjpg/video.cgi?subtype=1"
const vid:string = "192.168.0.113"

const source:string = camip.concat(vid,camip2);

interface Post {
  ID: number;
  ipaddr: string;
  vendor: string;
}

export default function Vid2() {
  const [hls] = useState(() => new Hls());
  const [hls2] = useState(() => new Hls());
  
  // Define refs with HTMLVideoElement type for TypeScrip

  // Annotate posts state as an array of Post
  const [posts, setVideos] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/active_ips');
        const data = await response.json();

        // TypeScript type guard to ensure data.posts exists and is an array
        if (data && Array.isArray(data.posts)) {
          setVideos(data.posts as Post[]); // Type assertion to Post[]
          console.log("Data fetched and posts set:", data.posts);
        } else {
          console.warn("Expected data.posts to be an array but got:", data.posts);
          setVideos([]); // Fallback to empty array if data.posts is missing
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <img src="source_url_here" alt="Dynamic Source" />
      <img src="http://admin:admin@192.168.0.113/cgi-bin/mjpg/video.cgi?subtype=1" alt="Camera Feed" />

      {/* Conditionally render posts if they exist */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.ID}>
            <p>ID: {post.ID}</p>
            <p>IP Address: {post.ipaddr}</p>
            <p>Vendor: {post.vendor}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
//rtsp://admin:admin@<ip>:192.168.0.113/cam/playback?channel=1&starttime=2024_11_03_22_03_00&endtime=2024_11_03_22_04_00