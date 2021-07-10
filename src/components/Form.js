import React,{useState} from "react";
import './../Styles/Form.css';
import numbers from './../Data/Age.js';
function Form({formClick}){  
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const[age,setAge]=useState(20);
    const ageList=numbers.map((number)=><option value={number.toString()}>{number}</option>);

    const handleUsernameChange=(event)=>{
      setUserName(event.target.value);
    }
    const handleEmailChange=(event)=>{
        setEmail(event.target.value);
    }
    const handleAgeChange=(event)=>{
        setAge(event.target.val);
    }
    function handleSubmit(e){
        e.preventDefault();
     
            console.log(email);
            formClick(userName,email);
        
      
    }
    return(
         <div>
         <div className="modal">
          <div  className="overlay"></div>
          <div className="modal-content">
          <form>
            <h4>Enter Your Details</h4>
           <label>User Name</label><br/>
           <input type="text" value={userName} onChange={handleUsernameChange}/><br/><br/>
           <label>Email</label><br/>
           <input type="email" value={email} onChange={handleEmailChange}/><br/><br/>
           <label>Select Age</label><br/>
           <select value={age} onChange={handleAgeChange}>{ageList}</select><br/><br/>
           <button id="submit" onClick={handleSubmit}>Submit</button>
           </form>
          </div>
        </div>
      </div>
    );
}
export default Form;