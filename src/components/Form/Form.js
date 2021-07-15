import React,{useState} from "react";
import './Form.css';
import numbers from './../../Data/Age.js';
import genders from './../../Data/Gender.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import {FormControlLabel} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import 'firebase/firestore';
import firebase from 'firebase/app';
import {v4 as uuidv4} from 'uuid';




function Form({formClick,closeForm,formgamecode,formgamestatus}){  
   
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const[age,setAge]=useState(20);
    const[gender,setGender]=useState("Male");
    

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
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
    function createGame(email1,score1,username1){
        let game=makeid();
     firebase.firestore().collection("Games").add({
     Gameid:game,
     [username1]:{
           
        Score:score1,
        Username:username1},
     });
     return game;
    }
    function addUser(score2,username2,game){
       let ref1=firebase.firestore().collection("Games");
       ref1.where("Gameid","==",game).get().then((querySnap)=>{
           
        querySnap.docs.forEach((doc)=>{
            let Userid=doc.id;
            ref1.doc(Userid).update({
               [username2]:{ Score:score2,Username:username2}
            })
            
            
        });
    });
    }
    function handleSubmit(e){
        e.preventDefault();
            console.log("hello");
            let Score;
            let ref = firebase.firestore().collection("Users");
            ref.where("Email","==",email).get()
            .then((querysnapshot)=>{
                if(querysnapshot.docs.length>0)
                {  querysnapshot.forEach((doc)=>{
                   console.log(doc.length);
                        let users=doc.data();
                        console.log(users);
                        let game;
                        console.log(formgamestatus);
                        if(formgamestatus=="S")
                         game=createGame(users.Email,users.Score,users.Username);
                        else{
                            addUser(users.Score,users.Username,formgamecode);
                             game=formgamecode;

                        }
                        formClick(users.Username,users.Score,game); 
                })}
                else{
                    ref.add({
                        Id:uuidv4(),
                        Username:userName,
                        Email:email,
                        Age:age,
                        Gender:gender,
                        Score:0
                    })
                    let game;
                    console.log(formgamestatus);
                    if(formgamestatus=="S")
                    game=createGame(email,0,userName);
                    else {
                    addUser(0,userName,formgamecode);
                    game=formgamecode;
                    }
                    formClick(userName,0,game);
                }
            })
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
           <TextField label="User Name" variant="outlined"  color= "primary" value={userName} onChange={handleUsernameChange} /><br/><br/>
           
           <TextField label="Email" variant="outlined"  color= "primary" value={email} onChange={handleEmailChange}/><br/><br/>
           
           <Typography color="primary" variant="h5">Select Age</Typography><br/>
           <Select value={age} onChange={handleAgeChange}>{ageList}</Select><br/><br/>
           
              
           <Typography color="primary" variant="h5">Select Gender</Typography><br/>
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