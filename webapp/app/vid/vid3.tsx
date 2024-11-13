'use client'
import './styles.css'
import * as React from "react";
import dogVideo from './dog.webm';
export default function Vid2() {



  return (
    <video width="1200" height="720" controls>
      <source src="./dog.mp4" type="video/mp4" />
      <source src={dogVideo} type="video/webm" />
    </video>
  );
}
