import React,{useState} from "react";
function Reset({ResetGame,ResetEnable}){  
    return(
<div>
<h4>Number of Games played: {ResetGame}</h4>
            <button onClick={ResetEnable}>Reset</button>
      </div>
    );
}
export default Reset;