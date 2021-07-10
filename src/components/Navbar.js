import React,{useState} from "react";
function Navbar({onChildClick,childbutton}){
    
    
    return(
<div>

        <div className="heading">
      <h1>Fastest Clicker First</h1>
    </div>
      <button onClick={onChildClick}>{childbutton}</button>
</div>
    );
}
export default Navbar;