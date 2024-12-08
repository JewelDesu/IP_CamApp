import React from "react";
import '../components/styles.css';

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const Modal = ({open}) => {
    if(!open) return null
    return(
        <div className="overlay">
            <meta http-equiv="Cache-Control" content="no-cache"></meta>
            <div className="mid">
                <div className="btncontainer2">
                    <button onClick={search}> 
                        REFRESH CAMERA LIST 
                    </button>
                </div>
            </div>
        </div>
    )
}

async function search() {
    fetch('/api/search')
    await sleep(5000);
    window.location.reload();
}
export default Modal