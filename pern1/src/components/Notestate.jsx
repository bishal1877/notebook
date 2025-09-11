import Notecontext from "./Notescontext";
 import { useState } from "react";



function Notestate(props) {
   let [notes,setnotes]=useState({note:[],
   props:{message:"",type:""},
   alert:0,
   userid:-1});

    return (
        <Notecontext.Provider value={{notes,setnotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default Notestate;