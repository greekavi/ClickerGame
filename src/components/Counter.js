import React,{useState,useEffect} from "react";
import { cleanup } from "@testing-library/react";
function Counter(){
    const [count,setCount]=useState(0);
    const [seconds,setSeconds]=useState(5);
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
    setSeconds(5);
    setCount(0);
   },[game]);

   useEffect(() => {     
        if(!seconds) return;
         const timer= setInterval(() => setSeconds(seconds - 1), 1000);
        return ()=>{clearInterval(timer); console.log("Done")}
   },[seconds]);

  
    
    return (
        <div>
            <h4>Number of Games played: {game}</h4>
            <button onClick={enable}>Reset</button>
            <h2>Start Clicking</h2>
            <p>You Clicked <b>{count}</b> times</p>
            <div>
                <h5>Timer</h5>
        <b>{seconds}</b>
      </div>
      <br/>
            <button  onClick={tick}>
        Click me
      </button>
            </div>
    )
}
export default Counter