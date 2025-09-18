import React,{useState,useContext} from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import axios from "axios";
import bcrypt from "bcryptjs";
import Notecontext from "./Notescontext.jsx";
import LoadingBar from 'react-top-loading-bar';



function Signup() {
 let context = useContext(Notecontext);
 let [progress,setProgress]=useState(0);
let [form,setform]=useState({
  name:'',
  email:'',
  password:'',
  cofpass:''
});
let [ref,setref]=useState(0);

let handlepass=(e)=>{
  e.preve
if(e.target.value.length<4)
setref(2);
else
  setref(0);
setform( {...form ,password:e.target.value});
}

let handlecof=(e)=>{
  if(form.password!=e.target.value&&e.target.value!='')
    setref(1);
  else
    setref(0);
  setform({...form,[e.target.name]:e.target.value});
}

let handlechange=(e)=>{
setform({...form,[e.target.name]:e.target.value});
}

let handlesubmit=async (e)=>{
  e.preventDefault();
  const hash = bcrypt.hashSync(form.password, 2);
  console.log(form.password,"  ",hash);
  form.password=hash;
  form.cofpass=hash;
  console.log('ho gya');
  try{
    setProgress(30);
let result=await axios.post('http://localhost:3000/signup',{form});
console.log(result);
setProgress(60);
if(result.status==200)
{
  context.setnotes((prevnote) => ({
    ...prevnote,
    alert: 1,
    props:{
      ...prevnote.props,
      message:"Account created Successfully"
    }
  }));
  setProgress(80);
}
}
catch(error){
  console.log(error);
  setProgress(80);
  context.setnotes((prevnote) => ({
    ...prevnote,
    alert: 4,
    props: {
      ...prevnote.props,
      message: error.response.data.message,
    },
  }));
}
finally{
  setProgress(100);
  setTimeout(() => {
    context.setnotes((prevnote) => ({
      ...prevnote,
      alert: 0,
    }));
  }, 2800);
setform(  {name:'',
  email:'',
  password:'',
  cofpass:''
  })
}
 
}

  return (
    <Container component="main" maxWidth="xs">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            type="text"
            onChange={handlechange}
            value={form.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            onChange={handlechange}
            value={form.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={ref == 2}
            helperText={
              ref == 2 ? "Password length should be grater than 4" : ""
            }
            autoComplete="current-password"
            onChange={handlepass}
            value={form.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cofpass"
            label="ConfirmPassword"
            type="password"
            error={ref == 1}
            helperText={
              ref == 1 ? "Confirm password should be same as password" : ""
            }
            id="confirmpassword"
            autoComplete="current-password"
            onChange={handlecof}
            value={form.cofpass}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handlesubmit}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;