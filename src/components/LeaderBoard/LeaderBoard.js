import React,{useState,useEffect} from "react";
import firebase from './../Firebase/firebase';
import Button from '@material-ui/core/Button';
import './LeaderBoard.css';
import { useTable } from 'react-table'
import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableSortLabel } from '@material-ui/core';


function LeaderBoard({leaderboardswitch,Leadercommon,leadergame}){  
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false);
    const ref=firebase.firestore().collection("Users");
    const ref1=firebase.firestore().collection("Games");
    const columns=[{title:'UserName',field:'Username'},{title:'Score',field:'Score'}]
 
    function getUsers(){

        if(Leadercommon){
        ref.onSnapshot((querySnapshot)=>{
            setLoading(true);
            const items=[];
            querySnapshot.forEach((doc)=>{
                items.push(doc.data());
            });
            console.log(items);
            setUsers(items);
            setLoading(false);
        });}
        else{
        ref1.where("Gameid","==",leadergame).get().then((querySnapshot)=>{
          
          let items=[];
          let array=[]
          querySnapshot.forEach((doc)=>{
              items.push(doc.data());
          });
          console.log(items[0]);
          let use=items[0]
          for(let key in use){ 
            if(!(key=='Gameid' ))
            { 
              array.push(use[key])
            }
          }
          console.log(array);
          setUsers(array);
      });}
       
    }
    useEffect(()=>{
        getUsers();
    });
   

    return(
         <div>
             
         
         
         
         <div className="modal-content2">
         <button id="close" onClick={leaderboardswitch}>X</button>
       <div className="leadertable">
        <MaterialTable title="LeaderBoard"
        data={users}
        columns={columns}
        
        options={{
          search:false,
          paging:false,
          sort:{
            field:'Score',

          }
          
        }}/>
       </div>
      
       </div></div>
       
      
      
    );
}
export default LeaderBoard;