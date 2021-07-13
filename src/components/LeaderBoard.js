import React,{useState,useEffect} from "react";
import firebase from './firebase';
import Button from '@material-ui/core/button';
import './../Styles/LeaderBoard.css';
import { useTable } from 'react-table'
import MaterialTable from 'material-table';

function LeaderBoard({leaderboardswitch}){  
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false);
    const ref=firebase.firestore().collection("Users");
    const columns=[{title:'UserName',field:'Username'},{title:'Score',field:'Score'}]
 
    function getUsers(){
        
        ref.onSnapshot((querySnapshot)=>{
            setLoading(true);
            const items=[];
            querySnapshot.forEach((doc)=>{
                items.push(doc.data());
            });
            console.log(items);
            setUsers(items);
            setLoading(false);
        });
       
       
    }
    useEffect(()=>{
        getUsers();
    },[]);
   
    
    return(
         <div>
             <div className="modal">
         
         <div  className="overlay"></div>
         
         <div className="modal-content">
         <button id="close" onClick={leaderboardswitch}>X</button>
       
       <MaterialTable title="Leader Board" data={users} columns={columns}
       options={{
           search:false,
           paging:false
       }}/>
       
      
       </div></div>
       
      </div>
      
    );
}
export default LeaderBoard;