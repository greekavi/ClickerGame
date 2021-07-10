
import React,{useState} from "react";
import Counter from './Counter';
import './../Styles/Counter.css';
import Navbar from './Navbar';


function App() {
  const [mounted,setMounted]=useState(false);
  const [button,setButton]=useState("Play Game");

 function toggle(){
   setMounted(!mounted);
   (button=="Play Game")?setButton("Back to Home"):setButton("Play Game");
   
 }

  return (
    <div className="App" >
     
  <Navbar childbutton={button} onChildClick={toggle}/>
      {mounted && <Counter/>}
    </div>
  );
}

export default App;
