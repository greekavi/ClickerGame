import React,{useState} from "react";
import './../Styles/Form.css';
import numbers from './../Data/Age.js';
import genders from './../Data/Gender.js';
function Form({formClick,closeForm}){  
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const[age,setAge]=useState(20);
    const[gender,setGender]=useState("Male")

    const ageList=numbers.map((number)=><option value={number.toString()}>{number}</option>);
    const genderList=genders.map((gender)=><div><input value={gender.toString()} type="radio" name="gender"/>{gender}</div>);

    const handleUsernameChange=(event)=>{
      setUserName(event.target.value);
    }
    const handleEmailChange=(event)=>{
        setEmail(event.target.value);
    }
    const handleAgeChange=(event)=>{
        setAge(event.target.value);
    }
    const handleGenderChange=(event)=>{
        setGender(event.target.value)
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
          <button id="close" onClick={closeForm}>X</button>
          <form>
            <h4>Enter Your Details</h4>
           <label>User Name</label><br/>
           <input type="text" value={userName} onChange={handleUsernameChange}/><br/><br/>
           <label>Email</label><br/>
           <input type="email" value={email} onChange={handleEmailChange}/><br/>
           <div className="inline" id="age">
           <label>Select Age</label><br/>
           <select value={age} onChange={handleAgeChange}>{ageList}</select>
           </div>
               <div className="inline">
           <label>Select Gender</label><br/>
           <div onChange={handleGenderChange}>{genderList}</div>
           </div><br/><br/>
           <button id="submit" onClick={handleSubmit}>Submit</button>
           </form>
          </div>
        </div>
      </div>
    );
}
export default Form;