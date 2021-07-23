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
import emailjs from 'emailjs-com';


//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


function Form({formClick,closeForm,formgamecode,formgamestatus}){  
   
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const[age,setAge]=useState(20);
    const[gender,setGender]=useState("Male");
    const[signIn,setSignIn]=useState(false);
    const [enterotp,setEnterotp]=useState(false);
    const [otp,setOtp]=useState("");

   
    
    //let tokenparams={to_name:"User",from_name:"Clicker Game",message:"",reply_to:""}
    
    const ref = firebase.firestore().collection("Users");
    const ref2 =firebase.firestore().collection("OTP")
    function opensignin(){
        setSignIn(true);
    }
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
    const handleOtpChange=(event)=>{
        setOtp(event.target.value)
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
    function handleotp(e){
        e.preventDefault();
        let users;
        let id;
        console.log(otp);
        console.log(email);
        ref2.where("Email","==",email).get().then((querySnap)=>{
            querySnap.forEach((doc)=>{
            users=doc.data();
            id=doc.id;
            console.log(users);
        
        console.log(users);
        if(otp==users.onetimepassword){
            ref2.doc(id).delete();
        ref.where("Email","==",email).get()
        .then((querysnapshot)=>{
            if(querysnapshot.docs.length>0)
            {  querysnapshot.forEach((doc)=>{
                    let users=doc.data();
                    let game;
                    if(formgamestatus=="S")
                     game=createGame(users.Email,users.Score,users.Username);
                    else{
                        addUser(users.Score,users.Username,formgamecode);
                         game=formgamecode;
                    }
                    formClick(users.Username,users.Score,game); 
            })}
           
        })}    })
    })
        
    }

    function handleSignin(e){
        e.preventDefault();
       
        ref.where("Email","==",email).get()
        .then((querysnapshot)=>{
            if(querysnapshot.docs.length>0)
            {  

                setEnterotp(true);
                fetch("http://localhost:5000/send",{
                    mode: 'cors',
                    method:"post",
                    headers:{
                    "Content-Type":"application/json",
                    'Origin':'http://localhost:3001'
                    },
                    body:JSON.stringify({
                    email,
                    })
                    }).then(res=>res.json())
                    .then(data=>{
                    }).catch(err=>{
                    console.log(err)
                    })
            }
            else{
                opensignin();
            }
           
        })
        
    }
    function handleSubmitSignup(e){
        e.preventDefault(); 
        ref.add({
            Id:uuidv4(),
            Username:userName,
            Email:email,
            Age:age,
            Gender:gender,
            Score:0  
        })
            let game;
            if(formgamestatus=="S")
            game=createGame(email,0,userName);
            else {
            addUser(0,userName,formgamecode);
            game=formgamecode;
            }
            formClick(userName,0,game);
           
    }

    return(
         <div>
              
         <div className="modal">
         
          <div  className="overlay"></div>
          
          <div className="modal-content">
          <button id="close" onClick={closeForm}>X</button>
          <Typography color="primary" id="signintext" variant="h5">Dont have an account?!</Typography>
           <Button id="submit" id="signin" onClick={opensignin}>Sign Up</Button>
          <form>
            <Typography variant="h5" color="primary">Enter Your Details</Typography>
           <br/>
           <TextField label="Email" variant="outlined"  color= "primary" value={email} onChange={handleEmailChange}/><br/><br/>
           
          {(!signIn)&& <Button onClick={handleSignin}>Sign In</Button>}
          {signIn&&<div> <TextField label="User Name" variant="outlined"  color= "primary" value={userName} onChange={handleUsernameChange} /> <br/><br/>
           
           <Typography color="primary" variant="h5">Select Age</Typography><br/>
           <Select value={age} onChange={handleAgeChange}>{ageList}</Select><br/><br/>
           
              
           <Typography color="primary" variant="h5">Select Gender</Typography><br/>
           <RadioGroup onChange={handleGenderChange}>{genderList}</RadioGroup>
           <br/><br/>
           <Button id="submit" onClick={handleSubmitSignup}>Submit</Button></div>}
           {enterotp&&
           <div><br/>
           <Typography color="primary" variant="h5">Enter Otp</Typography><br/>
           <TextField label="OTP" variant="outlined" color="primary" value={otp} onChange={handleOtpChange}/><br/>
           <br/><Button onClick={handleotp}>Submit Otp</Button>
           </div>}
           </form>
          </div>
        </div>
      </div>
      
    );
}
export default Form;