import {useContext} from "react";
import Alert from "@mui/material/Alert";
import Notecontext from './Notescontext.jsx'


export default function Aleert(props) {
  let context=useContext(Notecontext);

  return (
    <>
      {context.notes.alert>0?<Alert severity="error">{props.message}</Alert>:<></>}
       </>
  );
}
