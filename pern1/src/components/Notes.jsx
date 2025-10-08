import React,{useContext,useEffect,useState} from 'react';
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom';
import OutCard from './OutCard';
import Notecontext from "./Notescontext.jsx";
import LoadingBar from "react-top-loading-bar";


 function Notes() {
  let context = useContext(Notecontext);
  let navigate = useNavigate();
let [progress, setProgress] = useState(0);
  useEffect(() => {
    let fetchNotes = async () => {
      if (context.notes.userid === -1) {
        navigate("/"); 
        return; 
      }

      try {
       
        setTimeout(()=>{context.setnotes((prevnote) => ({
          ...prevnote,
          alert: 0,
        }))},1800);
setProgress(30);
        const nota = await axios.get("http://localhost:3000/getnotes", {
          withCredentials: true
        });
        setProgress(60);
        console.log(nota);
if (nota.data.success == true && !nota.data.message) {
  context.setnotes((prevnote) => ({
    ...prevnote,
    note: nota.data.notes,
    naam: nota.data.naam,
  }));
} else if (nota.data.success == true && nota.data.message)
   navigate("/");
else {
  context.setnotes((prevnote) => ({
    ...prevnote,
    alert: 4,
    props: {
      ...prevnote.props,
      message: "some problem",
    },
  }));
}
      } 
      finally {setProgress(100);
        setTimeout(() => {
          context.setnotes((prevnote) => ({
            ...prevnote,
            alert: 0,
          }));
        }, 1500);
      }
    };

    fetchNotes(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "x-large" }}>
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
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        < >
          {context.notes.note.length > 0 ? (
            context.notes.note.map((pot) => {
              return (
                <OutCard
                  title={`${pot.title}`}
                  content={`${pot.content}`}
                  key={pot.notesid}
                  id={pot.notesid}
                />
              );
            })
          ) : (
            <h3>Add notes first.</h3>
          )}
        </>
      </div>
    </>
  );
}

export default Notes