import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Button onClick={handleOpen} style={{ fontSize: "small" }}>
        Open
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            <span style={{ fontWeight: "bold" ,fontSize:"large"}}>Title:</span> {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Content:</span> {props.content}
          </Typography>
          <Button onClick={handleClose} style={{ marginTop: "10px" }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
