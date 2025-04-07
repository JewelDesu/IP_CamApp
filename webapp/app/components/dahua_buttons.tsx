import React, { useState } from 'react';
import './styles.css';
import Modal from "./modals/Modal";
import EventModal from "./modals/eventModal";
import DatePicker from './datePicker/timePickerForm';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

type VideoIp = {
    videoIp: string;
};

const camip = "http://admin:testingA!@"

const DahButtons: React.FC<VideoIp> = ({ videoIp}) => {
  const [openModal, setOpenModal] = useState(false)
  const [openEventModal, setOpenEventModal] = useState(false)
 // const [openVideoModal, setOpenVideoModal] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)

  return(    
        <div className="button1">
            
            
            <Popover>
                <PopoverTrigger asChild>
                <button onClick={() => setOpenCalendar(true)}>Get Video</button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <DatePicker open={openCalendar} ipaddr={videoIp}/>
                </PopoverContent>
            </Popover>
            <button onClick={() => setOpenEventModal(true)}>Events</button>
            <EventModal openEvent={openEventModal} onEventClose={() => setOpenEventModal(false)}/>
            <button onClick={() => setOpenModal(true)}>Snapshot</button>
            <Modal open={openModal} imgsrc={camip.concat(videoIp,'/cgi-bin/snapshot.cgi?subtype=1')} onClose={() => setOpenModal(false)}/>
            <button id='index' type='submit' onClick={() => submitReboot(videoIp)}>Reboot</button>
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