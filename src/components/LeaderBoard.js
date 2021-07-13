import React,{useState,useEffect} from "react";
import firebase from './firebase';
import Button from '@material-ui/core/button';
import './../Styles/LeaderBoard.css';
import { useTable } from 'react-table'
import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

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
    });
   

    return(
         <div>
             <div className="modal">
         
         <div  className="overlay"></div>
         
         <div className="modal-content">
         <button id="close" onClick={leaderboardswitch}>X</button>
       
         <TableContainer component={Paper}>
         <h2>Leader Board</h2>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
          
            <TableCell ><b>Username</b></TableCell>
            <TableCell ><b>Score</b></TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.Username}>
              
              <TableCell >{row.Username}</TableCell>
              <TableCell >{row.Score}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       
      
       </div></div>
       
      </div>
      
    );
}
export default LeaderBoard;