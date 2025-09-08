import * as React from "react";
import Alert from "@mui/material/Alert";

export default function Aleert(props) {
  return (
    <>
      <Alert severity="error">{props.message}</Alert>
       <Alert severity="success">{props.message}</Alert>
       </>
  );
}
