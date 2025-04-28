import React, { useState } from "react";



const AddCameraModal = ({open, camIp, count, onClose}) => {
    const [submitted, setSubmitted] = useState({});

    async function FormSubmit(event, index) {
        localStorage.clear();
        event.preventDefault();
        const formData = new FormData(event.target);
    
        const response = await fetch(`/api/sqliteDelete`, {
            method: "PUT",
            body: formData,
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log("Success:", result);
            setSubmitted((prev) => ({ ...prev, [index]: true }));
        } else {
            console.error("Error:", await response.text());
        }
    }

    if(!open) return null
    return(
        <div className="overlay" onClick={onClose}>
            <div className="containerAdd" >
                <h1> Detected Cameras</h1>
                {camIp.slice(0, count).map((source, index) => ( !submitted[index] &&(
                <div  key={index} > 
                    <form onSubmit={(e) => FormSubmit(e, index)}>
                    <div >
                        <label htmlFor="ppass"> {source} </label>
                        <input type="hidden" id="delete" name="delete" value={index+1} />
                    </div>
                    <div >
                    <input className="inputButton" type="submit" value="REMOVE" />
                    </div>
                    </form>
                    </div>
                ) 
                ))} 
            </div>
        </div>
    )
}

export default AddCameraModal