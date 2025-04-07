'use client';
import { useState } from "react";
import '../components/styles.css';

type CamGridProps = {
    camIp: string[];
    count: number;
    vend: string[];
  };

const Modal: React.FC<CamGridProps> =({camIp, count, vend}) => {
    const [submitted, setSubmitted] = useState({});
    //const [state, FormAction] = useFormState(FormSubmit, '');
    const reloadPage = () => {
        window.location.reload()
      };

    async function FormSubmit(event, index) {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        const response = await fetch(`/api/sqlitepostCameras`, {
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

    if(count == 0)
    {
        return(
            <div className="overlay">
                <meta httpEquiv="Cache-Control" content="no-cache"></meta>
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
                {camIp.slice(0, count).map((source, index) => ( !submitted[index] &&(
                <div  key={index}> 
                    <form onSubmit={(e) => FormSubmit(e, index)}>
                    <div >
                        <label htmlFor="ppass">Enter camera {source} password </label>
                        <input className="input1" type="text" name="password" id="password" required />
                        <input type="hidden" id="ipAddr" name="ipAddr" value={source} />
                        <input type="hidden" id="ipVend" name="ipVend" value={vend[index]} />
                    </div>
                    <div >
                    <input className="inputButton" type="submit" value="Submit" />
                    </div>
                    </form>
                    </div>
                ) 
                ))}
                        <button className="inputButton"> 
                            REFRESH CAMERA LIST 
                        </button> 
            <button onClick={reloadPage} className="inputButton"> Reload Page</button>
            </div>
            
        )
    }
    
}

export default Modal