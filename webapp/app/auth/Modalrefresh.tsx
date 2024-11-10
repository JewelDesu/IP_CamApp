import React from "react";
import { exec } from 'child_process';
import '../compinents/styles.css';

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const Modal = ({ }) => {
    if(!open) return null
    return(
        <div className="overlay">
            <meta http-equiv="Cache-Control" content="no-cache"></meta>
            <div className="mid">
                <div className="btncontainer2">
                    <button onClick={async () => {
                        exec('/serverside/search').unref()
                        await sleep(2000);
                        window.location.reload();
                    }}> 
                        REFRESH CAMERA LIST 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal