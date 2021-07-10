
import React,{useState,useCallback} from "react";
import Counter from './Counter';
import './../Styles/Counter.css';
import Navbar from './Navbar';
import Form from './Form';

function App() {
  const [mounted,setMounted]=useState(false);
  const [button,setButton]=useState("Play Game");
  const [form,setform] = useState(false);
  const [email1,setEmail]=useState("");
  const [usename1,setusername]=useState("");

 function toggle(){
   setMounted(!mounted);
   (button=="Play Game")?setButton("Back to Home"):setButton("Play Game");
   
 

}
function setDetails(username,mail){

setusername(username);
setEmail(mail);
openForm();
toggle();
}
function openForm(){
  (button=="Back to Home")?toggle():setform(!form);

}
  return (
    <div className="App" >
     
  <Navbar childbutton={button} onChildClick={openForm}/>
  {form &&<Form  formClick={setDetails} />}


      {mounted && <Counter CounterUsername={usename1}/>}
      
    </div>
  );
}

export default App;
