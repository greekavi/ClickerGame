import React,{useState,useEffect} from "react";
import { cleanup } from "@testing-library/react";
import Timer from './../Timer/Timer';
import Clicker from './../Clicker/Clicker';
import Reset from './../Reset/Reset';
import Ready from './../Ready/Ready';
import LeaderBoard from './../LeaderBoard/LeaderBoard';
import Button from "@material-ui/core";
import 'firebase/firestore';
import firebase from 'firebase/app';



function Counter({CounterUsername, CounterScore,CounterGame}){
    const [count,setCount]=useState(0);
    const [seconds,setSeconds]=useState(10);
    const [game,setGame]=useState(0);
    const [modal,setModel]=useState(true);
    const childLeader=false;
  
    
   function tick(){
       if(!seconds) return;
       setCount(count + 1);
   }
 
   function readyModal1(){
    setModel(!modal);
    setGame(game+1);
   
    setSeconds(10);
    setCount(0);
  
     }

    function enable(){
        setModel(!modal);
    }
useEffect(()=>{
    
    if(seconds==0)
    {
    if(CounterScore<count)
    {
     const ref = firebase.firestore().collection("Users");
        ref.where("Username","==",CounterUsername).get().then((querySnap)=>{
            querySnap.docs.forEach((doc)=>{
                let Users=doc.id;
                ref.doc(Users).update({
                    Score:count
                })
                
            });
        });
        const ref1 = firebase.firestore().collection("Games");
        ref1.where("Gameid","==",CounterGame).get().then((querySnap)=>{
            
            querySnap.docs.forEach((doc)=>{
                let Userid=doc.id;
                ref1.doc(Userid).update({
                   [CounterUsername]:{ Score:count,Username:CounterUsername}
                })
                
                
            });
        });
        
        
    }
}
    
},[seconds])

   useEffect(() => { 
    if(!seconds) return;    
      
       
        
        
   const timer= setInterval(() => setSeconds(seconds - 1), 1000);
        return ()=>{clearInterval(timer);}
   },[seconds]);

    return (
        <div className="Game">
        <div className="Leader">
        <LeaderBoard  Leadercommon={childLeader} leadergame={CounterGame} />
        </div>
       {modal&&<Ready ReadyModal={readyModal1} />}
           <h3 className="Welcome">Welcome {CounterUsername} <br/><b> Game Code:{CounterGame}</b></h3>
           
           
            <Timer TimerSeconds={seconds} />
            <Clicker  ClickerCount={count} ClickerTick={tick}/>
            <Reset  ResetGame={game} ResetEnable={enable}/>
        </div>
    )
}
export default Counter