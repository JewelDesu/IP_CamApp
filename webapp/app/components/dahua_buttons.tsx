import React, { useState } from 'react';
import './styles.css';
import Modal from "./modals/Modal";
import DatePicker from './datePicker/timePickerForm';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

type VideoIp = {
    videoIp: string;
};

const camip = "http://admin:testingA!@"

const DahButtons: React.FC<VideoIp> = ({ videoIp}) => {
  const [openModal, setOpenModal] = useState(false)
 // const [openVideoModal, setOpenVideoModal] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)

  return(    
        <div>
            <button id='index' className="button1" type='submit' onClick={() => submitReboot(videoIp)}>REBOOT</button>
            
            <Popover>
                <PopoverTrigger asChild>
                <button className="button1" onClick={() => setOpenCalendar(true)}>Get Video</button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <DatePicker open={openCalendar} onClose={ () => setOpenCalendar(false)} ipaddr={videoIp}/>
                </PopoverContent>
            </Popover>
            <button className="button1" onClick={() => setOpenModal(true)}>SNAPSHOT</button>
            <Modal open={openModal} imgsrc={camip.concat(videoIp,'/cgi-bin/snapshot.cgi')} onClose={() => setOpenModal(false)}/>
            <button className="button1" type='submit' onClick={submitReboot}>CHUNGUS</button>
        </div>
      )
}

function submitReboot(videoIp: string) {
    const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              alert(xhr.response);
          }
      }
  xhr.open('get', camip.concat(videoIp,"/cgi-bin/magicBox.cgi?action=reboot"), true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xhr.send();
}

export default DahButtons;