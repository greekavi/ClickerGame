
import React,{useState} from "react";
import Counter from './components/Counter';
import './Styles/Counter.css';

function App() {
  const [mounted,setMounted]=useState(false);
  const [button,setButton]=useState("Play Game")

 function toggle(){
   setMounted(!mounted);
   (button=="Play Game")?setButton("Back to Home"):setButton("Play Game");
   
 }
  return (
    <div className="App">

      <h1>Fastest Clicker First</h1>
    
      <button onClick={toggle}>{button}</button>
      {mounted && <Counter/>}
    </div>
  );
}

export default App;
