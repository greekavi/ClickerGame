import React,{useState} from "react";
import Button from '@material-ui/core/button';
function Clicker({ClickerCount,ClickerTick}){  
    return(
<div>
<p>You Clicked <b>{ClickerCount}</b> times</p>
            <h2>Start Clicking!</h2>
                          
            <button id='MainButton'  onClick={ClickerTick}>
        Click me
      </button>
      </div>
    );
}
export default Clicker;