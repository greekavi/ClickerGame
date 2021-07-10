import React,{useState,useEffect} from "react";
import { cleanup } from "@testing-library/react";
import Timer from './Timer';
import Clicker from './Clicker';
import Reset from './Reset';
import Ready from './Ready';

function Counter({CounterUsername}){
    const [count,setCount]=useState(0);
    const [seconds,setSeconds]=useState(10);
    const [game,setGame]=useState(0);
    const [modal,setModel]=useState(true);
    const [score,setScore]=useState(0);
    
   function tick(){
       if(!seconds) return;
       setCount(count + 1);
   }

   function readyModal1(){
    setModel(!modal);
    if(count>score&&seconds==0)
    setScore(count);
    setGame(game+1);
    setSeconds(10);
    setCount(0);
  
     }

    function enable(){
        setModel(!modal);
    }

//    useEffect(()=>{
//     setSeconds(10);
//     setCount(0);
//    },[game]);

   useEffect(() => { 
    if(!seconds) return;    
      
        
         const timer= setInterval(() => setSeconds(seconds - 1), 1000);
         console.log(timer);
        return ()=>{clearInterval(timer);}
   },[seconds]);

    return (
        <div className="Game">
       {modal&&<Ready ReadyModal={readyModal1} />}
           <h3>Welcome {CounterUsername}</h3>
           <p>Highest Score: <b>{score}</b></p>
            <Timer TimerSeconds={seconds} />
            <Clicker  ClickerCount={count} ClickerTick={tick}/>
            <Reset  ResetGame={game} ResetEnable={enable}/>
        </div>
    )
}
export default Counter