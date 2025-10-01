import React, { useState,useContext } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Notecontext from "./Notescontext.jsx";
import LoadingBar from "react-top-loading-bar";

export default function Addnotes() {
  let [statetitle, setstatetitle] = useState(1);
  let [progress, setProgress] = useState(0);
  let [notes,setnotes]=useState({
    title:"",
    desc:""
  });
 let context = useContext(Notecontext);
  let handletitle = (e) => {
   
    if (e.target.value.length === 0) setstatetitle(1);
    else setstatetitle(Math.min(Math.ceil(e.target.value.length / 30),5));

    setnotes((prev)=>({
   ...prev,
   title:e.target.value   
    }))
  };

  let [statedesc, setstatedesc] = useState(1);

  let handledesc = (e) => {
  
    if (e.target.value.length === 0) setstatedesc(1);
    else 
      setstatedesc(Math.min(Math.ceil(e.target.value.length / 30),5));
  setnotes((prev) => ({
    ...prev,
    desc: e.target.value,
  }));
  };

let handlesubmit=async (e)=>{
  e.preventDefault();
  try{
  setProgress(30);
let response = await axios.post("http://localhost:3000/addnotes", {
  userid: context.notes.userid,
  title: notes.title,
  desc: notes.desc,
},{withCredentials:true
});
setProgress(60);
let totnot = {
  content: notes.desc,
  title: notes.title,
  notesid: response.data.notesid,
  userid: context.notes.userid
};

context.setnotes((prevnote) => ({
  ...prevnote,
  alert: 1,
  props: {
    ...prevnote.props,
    message: `Item added successfully`,
  },
  note:[...prevnote.note,totnot]
}));
setProgress(70);
  }catch(error){
    context.setnotes((prevnote) => ({
      ...prevnote,
      alert: 4,
      props: {
        ...prevnote.props,
        message: error.response.data.message,
      }
    }));
  }
  finally{
setstatedesc(1);
setstatetitle(1);
setProgress(100); 
setTimeout(() => {
  context.setnotes((prevnote) => ({
    ...prevnote,
    alert: 0
  }));
},2800);
setnotes(
    {title:"",
    desc:""});
}
}
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "x-large",
      }}
    >
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div>
        <h3>Enter the note you want to add</h3>
      </div>

      <form onSubmit={handlesubmit}>
        <div style={{ display: "flex" }}>
          <label htmlFor="title" style={{ margin: "0px", padding: "0" }}>
            Title :
          </label>

          <textarea
            id="title"
            rows={`${statetitle}`}
            cols="30"
            value={notes.title}
            placeholder="Enter your title.."
            onChange={handletitle}
            style={{ marginLeft: "1vw", width: "30vw" }}
          ></textarea>
        </div>

        <div style={{ display: "flex", marginTop: "10px" }}>
          <label htmlFor="desc" style={{ margin: "0", padding: "0" }}>
            Note:
          </label>

          <textarea
            id="desc"
            rows={`${statedesc}`}
            cols="30"
            value={notes.desc}
            placeholder="Enter your note here..."
            onChange={handledesc}
            style={{ marginLeft: "1vw", width: "30vw" }}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2vh",
          }}
        >
          <Button
            variant="contained"
            style={{ marginBottom: "8px", height: "3.5vh", marginLeft: "10px" }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
