import React,{useState} from "react";
function Timer({TimerSeconds}){  
    return(
         <div>
                <p className="TimerHeading">Timer</p>
        <b className="Timer">{TimerSeconds}</b>
      </div>
    );
}
export default Timer;