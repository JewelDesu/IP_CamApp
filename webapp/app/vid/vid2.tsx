'use client'
import './styles.css'
import * as React from "react";
import {useState, useEffect } from 'react';
import Hls from "hls.js";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast()
  const [hls] = useState(() => new Hls());
  const [hls2] = useState(() => new Hls());
  
  // Define refs with HTMLVideoElement type for TypeScrip

  // Annotate posts state as an array of Post
  const [posts, setVideos] = useState<Post[]>([]);

  useEffect(() => {
    fetch("./api/sqlite", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request headers to indicate JSON format
      },
    })
      .then((res) => res.json()) // Parse the response data as JSON
      .then((data) => setVideos(data)); // Update the state with the fetched data
  }, []);


  return (
    <div className="App">
      <button
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </button>
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