import {useContext} from "react";
import Alert from "@mui/material/Alert";
import Notecontext from './Notescontext.jsx'


export default function Aleert() {
  let context=useContext(Notecontext);

  return (
    <>
      {console.log(context)}
      {context.notes.alert > 0 ? (
        <Alert severity={context.notes.alert <3?"success":"error"}>
          {context.notes.props.message}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
}
