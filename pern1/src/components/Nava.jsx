import React,{useContext, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Notecontext from './Notescontext'
import { Link as RouterLink, useLocation } from 'react-router-dom'; // Import Link and rename to avoid conflict
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const pages = ['Home', 'About'];
const settings = ['Profile', 'Logout'];

function Nava() {
       let [alpha, setalpha] = useState('');
  const navigate=useNavigate();
const locate=useLocation();
  let check=useContext(Notecontext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  useEffect(()=>{ 
if(check.notes.userid>=0 )
  setalpha((check.notes.naam.slice(0, 1)).toUpperCase());
  }); 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 const handlelogout = async () => {
   await axios.get("http://localhost:3000/logout", { withCredentials: true });
   // Clear user info from context/state
   check.setnotes((prev) => ({
     ...prev,
     userid: -1,
     note: [],
     naam: "",
   }));
   navigate("/");
 };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Notebook
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {/* Wrap Typography with RouterLink */}
                    <RouterLink
                      to={`/${page.toLowerCase()}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {page}
                    </RouterLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink} // Use RouterLink for the component prop
            to="/" // Link to the home page
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Notebook
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={RouterLink} // Use RouterLink for the component prop
                to={`/home`} // Link to the correct page
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {check.notes.userid > 0 ? (
              <Tooltip title="Open menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      color: "white ",
                      border: " 2px solid black",
                      borderRadius: "50%  50%",
                      backgroundColor: "black",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ width: "40px", height: "max-content",fontSize:"30px" }}>
                      
                      {`${alpha}`}
                    </span>
                  </div>
                </IconButton>
              </Tooltip>
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
               {locate.pathname!='/' && <RouterLink to="/">
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "2vw" }}
                  >
                    Login
                  </Button>
                </RouterLink>}
                {locate.pathname!='/signup'&&  <RouterLink to="/signup">
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "2vw" }}
                  >
                    Signup
                  </Button>
                </RouterLink>}
              </div>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {setting === "Logout" ? (
                      <RouterLink
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handlelogout}
                      >
                        {setting}
                      </RouterLink>
                    ) : (
                      setting
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nava;