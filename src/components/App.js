
import React,{useState,useCallback} from "react";
import Counter from './Counter';
import './../Styles/Counter.css';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar';
import Form from './Form';

function App() {
  const [mounted,setMounted]=useState(false);
  const [button,setButton]=useState("Play Game");
  const [form,setform] = useState(false);
  const [score1,setScore]=useState("");
  const [usename1,setusername]=useState("");

 function toggle(){
   setMounted(!mounted);
   (button=="Play Game")?setButton("Back to Home"):setButton("Play Game");
   
 

}
function setDetails(username,score){
console.log(username);
console.log(score);
setusername(username);
setScore(score);
openForm();
toggle();
}
function openForm(){
  (button=="Back to Home")?toggle():setform(!form);

}
function CloseForm(){
  setform(!form);
}
  return (
    
    <div className="App" >
    
  <Navbar childbutton={button} onChildClick={openForm} />
  
  {form &&<Form  formClick={setDetails} closeForm={CloseForm}/>}


      {mounted && <Counter CounterUsername={usename1} CounterScore={score1}/>}
      
    </div>
  );
}

export default App;
