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
          params: {
            id: context.notes.userid,
          },
        });
setProgress(60);
        context.setnotes((prevnote) => ({
          ...prevnote,
          note: nota.data.notes,
        }));
      } catch (error) {
        console.log('gvrcrr',error);
      }
      finally {setProgress(100);}
    };

    fetchNotes(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.notes.userid]);


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