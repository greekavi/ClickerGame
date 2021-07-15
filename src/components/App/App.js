
import React,{useState,useCallback} from "react";
import Counter from './../Counter/Counter';
import './../Counter/Counter.css';
import Button from '@material-ui/core/Button';
import Navbar from './../Navbar/Navbar';
import Form from './../Form/Form';
import TextField from '@material-ui/core/TextField';



function App() {
  const [mounted,setMounted]=useState(false);
  const [button,setButton]=useState("Play Game");
  const [form,setform] = useState(false);
  const [score1,setScore]=useState("");
  const [usename1,setusername]=useState("");
  const [game1,setGame1]=useState("");
  const [commonleader,setCommonLeader]=useState(true);
  const [gamecode,setGamecode]=useState("");
  const [gamestatus,setgamestatus]=useState("S");
 

 function toggle(){
   setMounted(!mounted);
   if(button=="Play Game"){
     setCommonLeader(false);
     setButton("Home");
    }
   else{
     setCommonLeader(true);
     setButton("Play Game");
     setgamestatus("S");
    }
 
 }
 function goToGameRoom(){
  setgamestatus("M");
   openForm();
  
   
 }
function setDetails(username,score,game){
console.log(username);
console.log(score);
setusername(username);
setScore(score);
setGame1(game);
openForm();
toggle();
}
function handleGameCodeChange(event){
  setGamecode(event.target.value.toUpperCase());
}
function openForm(){
  
  (button=="Home")?toggle():setform(!form);
 

}
function CloseForm(){
  setform(!form);
}
  return (
    
    <div className="App" >
    
  <Navbar childbutton={button} onChildClick={openForm} childLeader={commonleader} childgame={game1} />
  
  {form &&<Form  formClick={setDetails} closeForm={CloseForm} formgamestatus={gamestatus} formgamecode={gamecode} />}


      {mounted && <Counter CounterUsername={usename1} CounterScore={score1} CounterGame={game1}  />}

      <input placeholder="Game Code" id="gamecode"  color= "secondary" value={gamecode} onChange={handleGameCodeChange} />
      <button onClick={goToGameRoom}>Enter</button><br/><br/>
    </div>
  );
}

export default App;
