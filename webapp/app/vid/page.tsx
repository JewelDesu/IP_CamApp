'use client'
import './styles.css'
import * as React from "react";
export default function Vid2() {



  return (
    <video width="1200" height="720" controls>
      <source src="./out3.mp4" type="video/mp4" />
    </video>
  );
}
