import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';
import OutCard from './Outcard';


function Notes() {
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