import React,{useState,useEffect,useCallback} from "react";
import './../Styles/Ready.css';
function Ready({ReadyModal}){  
    const [timer,setTimer]=useState(3);

    
    useEffect(() => {     
        if(!timer)
        {  
            ReadyModal();
            return;}
         const time= setInterval(() => setTimer(timer - 1), 1000);
        return ()=>{clearInterval(time);}
   },[timer]);

    return(
         <div>
     <div className="modal">
          <div  className="overlay"></div>
          <div className="modal-content">
            <h4>Get Ready In.......</h4>
            <h2 >
           {timer}
            </h2>
         
          </div>
        </div>
      </div>
    );
}
export default Ready;