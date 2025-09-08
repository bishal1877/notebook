import React,{useState} from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

function Signup() {

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

let handlesubmit=()=>{
console.log(form)
}

  return (
    <Container component="main" maxWidth="xs">
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