import React from "react";
import '../components/styles.css';

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const Modal = ({open}) => {
    const handleRefresh = async () => {
        try {
            const response = await fetch('/api/search');
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }
            await sleep(5000);
            window.location.reload();
        } catch (error) {
            console.error('Error refreshing camera list:', error);
        }
    };
    if(!open) return null
    return(
        <div className="overlay">
            <meta http-equiv="Cache-Control" content="no-cache"></meta>
            <div className="mid">
                <div className="btncontainer2">
                    <button onClick={handleRefresh}> 
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