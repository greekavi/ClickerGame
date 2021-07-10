import React,{useState} from "react";
function Timer({TimerSeconds}){  
    return(
         <div>
                
        <b className="Timer">Timer : {TimerSeconds}</b>
      </div>
    );
}
export default Timer;