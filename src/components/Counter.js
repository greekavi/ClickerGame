import React,{useState,useEffect} from "react";
import { cleanup } from "@testing-library/react";
function Counter(){
    const [count,setCount]=useState(0);
    const [seconds,setSeconds]=useState(10);
    const [game,setGame]=useState(1);
    
   function tick(){
       if(!seconds) return;
    setCount(count + 1);
   }
   function enable()
   {
    
    setGame(game+1);

   }
   useEffect(()=>{
    setSeconds(10);
    setCount(0);
   },[game]);

   useEffect(() => {     
        if(!seconds) return;
         const timer= setInterval(() => setSeconds(seconds - 1), 1000);
         console.log(timer);
        return ()=>{clearInterval(timer);}
   },[seconds]);

  
    
    return (
        <div className="Game">
            <h4>Number of Games played: {game}</h4>
            <button onClick={enable}>Reset</button>
            <div>
                <h4>Timer</h4>
        <b>{seconds}</b>
      </div>
      <p>You Clicked <b>{count}</b> times</p>
            <h2>Start Clicking!</h2>
            
            
    
            <button id='MainButton'  onClick={tick}>
        Click me
      </button>
            </div>
    )
}
export default Counter