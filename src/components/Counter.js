import React,{useState,useEffect} from "react";
import { cleanup } from "@testing-library/react";
import Timer from './Timer';
import Clicker from './Clicker';
import Reset from './Reset';
import Ready from './Ready';
import Button from "@material-ui/core";
import firebase from 'firebase/app';
import 'firebase/firestore';

function Counter({CounterUsername,CounterScore}){
    const [count,setCount]=useState(0);
    const [seconds,setSeconds]=useState(10);
    const [game,setGame]=useState(0);
    const [modal,setModel]=useState(true);

    
   function tick(){
       if(!seconds) return;
       setCount(count + 1);
   }

   function readyModal1(){
    setModel(!modal);
    console.log(CounterScore);
    console.log(count);
    if(CounterScore<count)
    {
        let ref = firebase.firestore().collection("Users");
        ref.where("Username","==",CounterUsername).get().then((querySnap)=>{
            querySnap.docs.forEach((doc)=>{
                let Users=doc.id;
                ref.doc(Users).update({
                    Score:count
                })
                
            });
        });
        
    }

    setGame(game+1);
    setSeconds(10);
    setCount(0);
  
     }

    function enable(){
        setModel(!modal);
    }


   useEffect(() => { 
    if(!seconds) return;    
      
        
         const timer= setInterval(() => setSeconds(seconds - 1), 1000);
      
        return ()=>{clearInterval(timer);}
   },[seconds]);

    return (
        <div className="Game">
       {modal&&<Ready ReadyModal={readyModal1} />}
           <h3>Welcome {CounterUsername}</h3>
           
            <Timer TimerSeconds={seconds} />
            <Clicker  ClickerCount={count} ClickerTick={tick}/>
            <Reset  ResetGame={game} ResetEnable={enable}/>
        </div>
    )
}
export default Counter