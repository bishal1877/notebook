import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modaal from './Modaal';
import Button from "@mui/material/Button";
import axios from 'axios';
import Notecontext from "./Notescontext.jsx";
import { useContext ,useState} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingBar from "react-top-loading-bar";

function OutCard(props) {

const context = useContext(Notecontext);
let [progress, setProgress] = useState(0);
let [ch,setch]=useState(0);
let handledelete=async()=>{
  setch(1);
  try{
  let result=  window.confirm("Are you sure you want to delete this note?");
  if(result===false) return ;
    setProgress(30);
  let response=  await axios.delete("http://localhost:3000/deletenotes",{params:{
id:props.id
  },
withCredentials:true
});
setProgress(70);
if(response.status==200)
{
let newarr=context.notes.note.filter((note)=>note.notesid!==props.id);
context.setnotes((prevnote) => ({
  ...prevnote,
  note: newarr,
  alert: 1,
  props: {
    ...prevnote.props,
    message: "Deleted Successfully",
  },
}));

}  
else
{
  context.setnotes((prevnote) => ({
    ...prevnote,
    alert: 4,
    props: {
      ...prevnote.props,
      message: "Error in Deleting",
    },
  }));
}
  }catch(error){
    console.log("Error deleting note:", error);
  }
  finally{
    setProgress(100);
    setch(0);
setTimeout(() => {
  context.setnotes((prevnote) => ({
    ...prevnote,
    alert: 0,
  }));
}, 1800);
  }
}
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
      {ch==1?  <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />:<></>}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <DeleteIcon
                  style={{
                    cursor: "pointer",
                    marginTop: "10px",
                    color: "blue",
                  }}
                  onClick={handledelete}
                />
                <CardActions>
                  <Modaal title={props.title} content={props.content} />
                </CardActions>
              </div>
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    );
}
export default OutCard;
