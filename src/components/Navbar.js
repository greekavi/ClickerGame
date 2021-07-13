import React,{useState} from "react";
import Button from '@material-ui/core/Button';
import LeaderBoard from "./LeaderBoard";
import './../Styles/Navbar.css';
function Navbar({onChildClick,childbutton}){
    const [leader,setLeader]=useState(false);
    function Leaderboardswitch() {
        setLeader(!leader);
    }
    
    return(
<div>

        <div className="heading">
      <p>Fastest Clicker First</p>
    </div>
     <div className="button"> <Button onClick={onChildClick}>{childbutton}</Button></div>
     <div className="button"> <Button onClick={Leaderboardswitch}>LeaderBoard</Button></div>
      {leader&&<LeaderBoard leaderboardswitch={Leaderboardswitch}/>}
</div>

    );
}
export default Navbar;