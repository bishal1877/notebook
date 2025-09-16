import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notecontext from './Notescontext.jsx'
import bcrypt from 'bcryptjs';

function Login() {
  let context=useContext(Notecontext);
  useEffect(()=>{

    context.setnotes((prevnote) => ({
  ...prevnote,
  alert: 0,
  userid:-1,
  note:[]
}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  console.log(context,"  jhyuy");
const navigate=useNavigate();
let [email, setEmail] = useState("");
let [password, setPassword] = useState("");

let handleemailChange = (e) => {
  e.preventDefault();
  setEmail(e.target.value);
}

let handlepasswordChange = (e) => {
  e.preventDefault();
  setPassword(e.target.value);
}

let handlesubmit = async (e) => {
  e.preventDefault();
  try {
let response = await axios.get('http://localhost:3000/login',{params: {
  email}
  });

if(response.status === 200){
  e.preventDefault();
  console.log(response.data, "   response");
  //if (response.data.password == password)
  if (bcrypt.compareSync(password, response.data.password)) {
    context.setnotes((prevnote) => ({
      ...prevnote,
      alert: 1,
      props: {
        ...prevnote.props,
        message: "Logged in Succesfully.",
      },
      userid: response.data.id,
    }));
    console.log(context, "   log");
    navigate("/home");
    return;
  } else {
    context.setnotes((prevnote) => ({
      ...prevnote,
      alert: 3,
      props: {
        ...prevnote.props,
        message: `Enter valid details`,
      },
    }));
    setTimeout(() => {
      context.setnotes((prevnote) => ({
        ...prevnote,
        alert: 0,
      }));
    }, 2800);
  }
}
} catch {
 context.setnotes((prevnote) => ({
   ...prevnote,
   alert: 3,
   props: {
     ...prevnote.props,
     message: `Error logging in`,
   },
 }));
 setTimeout(() => {
   context.setnotes((prevnote) => ({
     ...prevnote,
     alert: 0,
   }));
 }, 2800);
  }
  finally{
setEmail("");
setPassword("");
  }
}

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            value={email}
            onChange={handleemailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlepasswordChange}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handlesubmit}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;