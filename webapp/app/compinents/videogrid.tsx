'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import './styles.css';


type VideoGridProps = {
  videoSources: string[];
  videoCount: number;
};

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const VideoGrid: React.FC<VideoGridProps> = ({ videoSources, videoCount }) => {
  return (
    <div style={styles.grid}>
      {videoSources.slice(0, videoCount).map((source, index) => (
        <div  key={index}>
        <img style={styles.video} src={source}/>
          <button id='index' className="button1" type='submit' onClick={submitReboot}>REBOOT</button>
          <button className="button1">SAVE</button>
          <button className="button1">SNAPSHOT</button>
          <button className="button1" type='submit' onClick={refresh}>CHUNGUS</button>
      </div>
      ))}
      
    </div>

  );
};
function submitReboot() {
    var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              alert(xhr.response);
          }
      }
  xhr.open('get', 'http://admin:testingA!@192.168.6.110/cgi-bin/magicBox.cgi?action=reboot', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xhr.send();
}
function refresh() {
  //var img =document.getElementById('str');
}
const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  video: {
    width: '75%',
    borderRadius: '8px',
  },

};

export default VideoGrid;



