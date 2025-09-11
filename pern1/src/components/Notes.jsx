import React,{useContext,useEffect} from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {Link,useNavigate} from 'react-router-dom';
import OutCard from './OutCard';
import Notecontext from "./Notescontext.jsx";

function Notes() {
let context=useContext(Notecontext);
let navigate=useNavigate();
console.log(context,"hbfyfye");
useEffect(()=>
{
if(context.notes.userid==-1)
  navigate('/');
else
{
setTimeout(() => {
  context.setnotes((prevnote) => ({
    ...prevnote,
    alert: 0,
  }));
}, 2800);

}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);
  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "x-large", margin: "5vh" }}>
        Your Notes are here
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginLeft: "3vh",
        }}
      >
        <OutCard
          title="hello hby hvtt hbyt hvtt hbh jbyg "
          content="loremj djbvhrf frhbfry dhfede dehdvetdve dhedbvtede dejdbyedrewd e cuegctecvevceh edtedtevd  "
        />
 
      </div>
    </>
  );
}

export default Notes