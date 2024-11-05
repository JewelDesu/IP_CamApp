import React from "react";

const Modal = ({open,onClose,imgsrc}) => {
    if(!open) return null
    return(
        <div className="overlay" onClick={onClose}>
            <meta http-equiv="Cache-Control" content="no-cache"></meta>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className="container">
                <img src={imgsrc + new Date().getTime()} />
                <p onClick={onClose} className="closebtn">X</p>
                <div className="btncontainer">
                    <button> Save </button>
                    <button> Close </button>
                </div>
            </div>
            
        </div>
    )
}

export default Modal