import React, { useState } from "react";

import Button from "@mui/material/Button";

export default function Addnotes() {
  let [statetitle, setstatetitle] = useState(1);

  let handletitle = (e) => {
   
    if (e.target.value.length === 0) setstatetitle(1);
    else setstatetitle(Math.min(Math.ceil(e.target.value.length / 30),5));
  };

  let [statedesc, setstatedesc] = useState(1);

  let handledesc = (e) => {
  
    if (e.target.value.length === 0) setstatedesc(1);
    else 
      setstatedesc(Math.min(Math.ceil(e.target.value.length / 30),5));
  };

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
      <div>
        <h3>Enter the note you want to add</h3>
      </div>

      <form>
        <div style={{ display: "flex" }}>
          <label htmlFor="title" style={{ margin: "0px", padding: "0" }}>
            Title :
          </label>

          <textarea
            id="title"
            rows={`${statetitle}`}
            cols="30"
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
            placeholder="Enter your note here..."
            onChange={handledesc}
            style={{ marginLeft: "1vw", width: "30vw" }}
          ></textarea>
        </div>
        <div   style={{ display: "flex", justifyContent: "center" ,marginTop:"2vh" }}>
          <Button
            variant="contained"
            style={{ marginBottom: "8px", height: "3.5vh", marginLeft: "10px" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
