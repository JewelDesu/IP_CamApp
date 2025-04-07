import React from "react";


const AddCameraModal = ({open,onClose}) => {

    async function FormSubmit(event) {
        localStorage.clear();
        event.preventDefault();
        const formData = new FormData(event.target);

        const response = await fetch(`/api/sqlitepostCameras`, {
            method: "PUT",
            body: formData,
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log("Success:", result);
            window.location.reload()
        } else {
            console.error("Error:", await response.text());
        }
    }

    if(!open) return null
    return(
        <div className="overlay" onClick={onClose}>
            <meta http-equiv="Cache-Control" content="no-cache"></meta>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className="containerAdd">
                <form onSubmit={(e) => FormSubmit(e)}>
                    <div >
                        <h1>Enter Camera Credentials</h1>
                        <label htmlFor="ppass">Camera Ip adresss </label>
                        <input className="input2" type="text" id="ipAddr" name="ipAddr" required/>
                        <label htmlFor="ppass">Camera password </label>
                        <input className="input2" type="text" name="password" id="password" required />
                        <label htmlFor="ppass">Vendor </label>
                        <input className="input2" type="text" id="ipVend" name="ipVend" required/>
                    </div>
                    <div >
                    <input className="inputButton" type="submit" value="Submit" />
                    <button className="inputButton"> 
                            Scan network 
                    </button>
                    </div>
                </form>
                <p onClick={onClose} className="closebtn">X</p>
            </div>
            
        </div>
    )
}

export default AddCameraModal