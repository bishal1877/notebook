import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';


function Login() {

let [email, setEmail] = useState("");
let [password, setPassword] = useState("");

let handleemailChange = (e) => {
  setEmail(e.target.value);
}

let handlepasswordChange = (e) => {
  setPassword(e.target.value);
}

let handlesubmit = async (e) => {
  e.preventDefault();
  try {
let response = await axios.get('http://localhost:3000/login',{params: {
  email,password}
  });
if(response.status === 200){
  alert('Login successful');
}
else if(response.status==401) {
  alert('Login failed. Please check your credentials and try again.');
}
else
{
  alert('Internal Server Error');
}
setEmail('');
setPassword('');
} catch (error) {
    console.error('Error during login:', error);
    alert('Login failed. Please check your credentials and try again.');
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