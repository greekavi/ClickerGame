import React,{useState} from "react";
import './../Styles/Form.css';
import numbers from './../Data/Age.js';
import genders from './../Data/Gender.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/button';
import {FormControlLabel} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';



function Form({formClick,closeForm}){  
   
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const[age,setAge]=useState(20);
    const[gender,setGender]=useState("Male")

    const ageList=numbers.map((number)=><MenuItem key={number.toString()} value={number.toString()} displayEmpty>{number}</MenuItem>);
    const genderList=genders.map((gender)=><FormControlLabel key={gender.toString()} value={gender.toString()} control={<Radio/>} label={gender.toString()}/>);

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
            
            let Score;
            let ref = firebase.firestore().collection("Users");
           // let checkifemailexist=ref.where("Email","==",email);
            
           ref.onSnapshot((querySnapshot)=>{
            
            let items=[];
            querySnapshot.forEach((doc)=>{
                items.push(doc.data());
            });
            console.log(items);
            if(items.find(obj=>obj.Email==email))
            {
                let player=items.find(obj=>{ return obj.Email==email});
                console.log(player.Username);
                formClick(player.Username,player.Score);
            }
            else{
                ref.add({
                    Id:uuidv4(),
                    Username:userName,
                    Email:email,
                    Age:age,
                    Gender:gender,
                    Score:0
                })
                formClick(userName,0)
            }
        });

   
    }

    return(
         <div>
              
         <div className="modal">
         
          <div  className="overlay"></div>
          
          <div className="modal-content">
          <button id="close" onClick={closeForm}>X</button>
          <form>
            <Typography variant="h5" color="primary">Enter Your Details</Typography>
           <br/>
           <TextField label="User Name" variant="outlined"  color= "primary" value={userName} onChange={handleUsernameChange}/><br/><br/>
           
           <TextField label="Email" variant="outlined"  color= "primary" value={email} onChange={handleEmailChange}/><br/><br/>
           
           <label>Select Age</label><br/>
           <Select value={age} onChange={handleAgeChange}>{ageList}</Select><br/><br/>
           
              
           <label>Select Gender</label><br/>
           <RadioGroup onChange={handleGenderChange}>{genderList}</RadioGroup>
           <br/><br/>
           <Button id="submit" onClick={handleSubmit}>Submit</Button>
           </form>
          </div>
        </div>
      </div>
      
    );
}
export default Form;