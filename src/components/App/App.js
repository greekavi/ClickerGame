
import React,{useState,useCallback} from "react";
import Counter from './../Counter/Counter';
import './../Counter/Counter.css';
import Button from '@material-ui/core/Button';
import Navbar from './../Navbar/Navbar';
import Form from './../Form/Form';
import TextField from '@material-ui/core/TextField';
import './App.css';



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
  const [play,setplay]=useState(true);

 function toggle(){
   setMounted(!mounted);
   if(button=="Play Game"){
     
     setButton("Home");
    }
   else{
    
     setButton("Play Game");
     setgamestatus("S");
    }
 
 }
 function goToGameRoom(){
  setgamestatus("M");
   openForm();
  
   
 }
function setDetails(username,score,game){
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
  
  if(button=="Home")
  {toggle();
  setplay(true)}
  else
  {setform(!form);
  setplay(false)};
 

}
function CloseForm(){
  setform(!form);
}
  return (
    
    <div className="App" >
    
  <Navbar childbutton={button} onChildClick={openForm} childLeader={commonleader} childgame={game1} childmount={mounted} childplay={play}/>
  
  {form &&<Form  formClick={setDetails} closeForm={CloseForm} formgamestatus={gamestatus} formgamecode={gamecode} />}


      {mounted && <Counter CounterUsername={usename1}  CounterScore={score1} CounterGame={game1}  />}

     {!mounted&& <div id="gamecode1"><input placeholder="Game Code" id="gamecode"  color= "secondary" value={gamecode} onChange={handleGameCodeChange} />
      <button onClick={goToGameRoom}>Enter</button><br/><br/></div>}
    </div>
  );
}

export default App;
