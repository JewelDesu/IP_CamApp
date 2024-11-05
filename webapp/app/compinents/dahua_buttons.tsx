import React, { useState } from 'react';
import './styles.css';
import Modal from "./Modal"

type VideoIp = {
    videoIp: string;
};

const camip = "http://admin:admin@"

const DahButtons: React.FC<VideoIp> = ({ videoIp}) => {
  const [openModal, setOpenModal] = useState(false)

  return(    
          <div>
          <button id='index' className="button1" type='submit' onClick={() => submitReboot(videoIp)}>REBOOT</button>
          <button className="button1">SAVE</button>
          <button className="button1" onClick={() => setOpenModal(true)}>SNAPSHOT</button>
          <Modal open={openModal} imgsrc={camip.concat(videoIp,'/cgi-bin/snapshot.cgi')} onClose={() => setOpenModal(false)}/>
          <button className="button1" type='submit' onClick={submitReboot}>CHUNGUS</button>
          </div>
      )
}

function submitReboot(videoIp) {
    var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              alert(xhr.response);
          }
      }
  xhr.open('get', camip.concat(videoIp,"/cgi-bin/magicBox.cgi?action=reboot"), true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xhr.send();
}
function refresh() {
    var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              alert(xhr.response);
          }
      }
  xhr.open('get', "http://admin:admin@192.168.0.113/cgi-bin/mjpg/video.cgi?subtype=1", true);
  xhr.send();
}

export default DahButtons;