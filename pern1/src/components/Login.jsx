import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notecontext from './Notescontext.jsx'

function Login() {
  let context=useContext(Notecontext);
  const navigate = useNavigate();
  useEffect(()=>{

async function fetchd (){
console.log('fetchd called');
let response = await axios.get("http://localhost:3000/checksession", {
  withCredentials: true
});

if(response.data.loggedIn === true){
    context.setnotes((prevnote) => ({
      ...prevnote,
      alert: 0,
      props: {
        ...prevnote.props,
        message: "Logged in Succesfully.",
      },
      userid: response.data.id,
    }));
    navigate("/home");
    return;
  }
  else{
 context.setnotes((prevnote) => ({
   ...prevnote,
   alert: 0,
   userid: -1,
   note: [],
 }));
  }
  
}
fetchd();
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


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
let response = await axios.get("http://localhost:3000/login", {
  params: {
    email: email,
    password: password,
  },
  withCredentials: true
});

if(response.status === 200){
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
  } 

} catch (error){
 context.setnotes((prevnote) => ({
   ...prevnote,
   alert: 3,
   props: {
     ...prevnote.props,
     message:  error.response.data.message ,
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