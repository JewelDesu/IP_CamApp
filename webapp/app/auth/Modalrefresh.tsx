import React from "react";
import '../components/styles.css';
import DahButtons from "../components/dahua_buttons";
import { useFormState } from "react-dom";

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

type CamGridProps = {
    camIp: string[];
    count: number;
    vend: string[];
  };

const Modal: React.FC<CamGridProps> =({open, camIp, count, vend}) => {
    //const [state, FormAction] = useFormState(FormSubmit, '');

    async function FormSubmit(event) {
        event.preventDefault(); // Prevent page reload
    
        // Create a FormData object from the form
        const formData = new FormData(event.target);
    
        // Send the form data via a fetch request
        const response = await fetch(`/api/sqlitepostCameras`, {
            method: "PUT",
            body: formData,
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log("Success:", result);
        } else {
            console.error("Error:", await response.text());
        }
    }

    if(!open) return null
    if(count == 0)
    {
        return(
            <div className="overlay">
                <meta http-equiv="Cache-Control" content="no-cache"></meta>
                <div className="mid">
                    <div className="btncontainer2">
                        <button > 
                            REFRESH CAMERA LIST 
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="grid2" >
                <h1> Detected Cameras</h1>
                {camIp.slice(0, count).map((source, index) => (
                <div  key={index}>
                    <form onSubmit={FormSubmit}>
                    <div >
                        <label htmlFor="ppass">Enter camera {source} password </label>
                        <input type="text" name="password" id="password" required />
                        <input type="hidden" id="ipAddr" name="ipAddr" value={source} />
                        <input type="hidden" id="ipVend" name="ipVend" value={vend[index]} />
                    </div>
                    <div >
                    <input type="submit" value="Subscribe!" />
                    </div>
                    </form>
                    </div>
                    ))} 
        
            </div>
        )
    }
}

export default Modal