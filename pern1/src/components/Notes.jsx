import React,{useContext,useEffect} from 'react';
import axios from "axios";
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
  context.setnotes((prevnote) => ({
    ...prevnote,
    alert: 0,
  }));

  let getnote=async()=>{
  let nota=await axios.get('http://localhost:3000/getnotes',{params:{
  id:context.notes.userid
  }});
   context.setnotes((prevnote) => ({
     ...prevnote,
    note:nota.data.notes,
   }));

   console.log(context.notes.note,'   dekho',);
}
getnote();
}}
// eslint-disable-next-line react-hooks/exhaustive-deps
,[]);

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

        {
          context.notes.note.map((pot)=>{return <OutCard
          title={`${pot.title}`}
          content={`${pot.content}`}
          key={pot.notesid}
        />}
        )
        }
      </div>
    </>
  );
}

export default Notes