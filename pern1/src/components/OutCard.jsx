import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modaal from './Modaal';
// import Button from "@mui/material/Button";
// import axios from 'axios';
// import Notecontext from "./Notescontext.jsx";
// import { useContext ,useState} from 'react';
// import DeleteIcon from "@mui/icons-material/Delete";
// import LoadingBar from "react-top-loading-bar";

function OutCard(props) {



    return (
      <Box
        style={{
          width: "15vw",
          boxShadow: "2px 2px 10px lightblue",
          borderRadius: "10px",
          margin: "10px",
          textAlign: "center",
          height: "max-content",
        }}
      >
      
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Typography variant="subtitle1" component="div">
                {props.title.slice(0, 20)}..
              </Typography>
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                {props.content.slice(0, 30)}...
                <br />
              </Typography>
               
                <CardActions >
                  <Modaal title={props.title} content={props.content} id={props.id}/>
                </CardActions>
            
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    );
}
export default OutCard;
