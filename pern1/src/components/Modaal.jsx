import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Notecontext from "./Notescontext.jsx";
import { useContext ,useState} from 'react';
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingBar from "react-top-loading-bar";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 28,
  p: 4,
};

export default function Modaal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const context = useContext(Notecontext);
  let [progress, setProgress] = useState(0);
  let [ch, setch] = useState(0);
let handledelete = async () => {
  setch(1);
  try {
    let result = window.confirm("Are you sure you want to delete this note?");
    if (result === false) return;
    setProgress(30);
    let response = await axios.delete("https://notes-tvxk.onrender.com/deletenotes", {
      params: {
        id: props.id,
      },
      withCredentials: true,
    });
    setProgress(70);
    if (response.status == 200) {
      let newarr = context.notes.note.filter(
        (note) => note.notesid !== props.id
      );
      context.setnotes((prevnote) => ({
        ...prevnote,
        note: newarr,
        alert: 1,
        props: {
          ...prevnote.props,
          message: "Deleted Successfully",
        },
      }));
    } else {
      context.setnotes((prevnote) => ({
        ...prevnote,
        alert: 4,
        props: {
          ...prevnote.props,
          message: "Error in Deleting",
        },
      }));
    }
  } catch (error) {
    console.log("Error deleting note:", error);
  } finally {
    setProgress(100);
    setOpen(false);
    setch(0);
    setTimeout(() => {
      context.setnotes((prevnote) => ({
        ...prevnote,
        alert: 0,
      }));
    }, 2200);
  }
};

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Button onClick={handleOpen} style={{ fontSize: "small" }}>
        Open
      </Button>
      {ch == 1 ? (
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      ) : (
        <></>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            <span style={{ fontWeight: "bold", fontSize: "large" }}>
              Title:
            </span>{" "}
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Content:</span> {props.content}
          </Typography>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <Button onClick={handleClose} style={{ marginTop: "10px" }}>
              Close
            </Button>
            <DeleteIcon
              style={{
                cursor: "pointer",
                marginTop: "10px",
                color: "blue",
              }}
              onClick={handledelete}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
