import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from '../lib/auth-helper.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const isActive = (location, path) => {
  return location.pathname === path ? { color: '#ff4081' } : { color: '#ffffff' };
};

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const home = auth.isAuthenticated() ? "/feed" : "/";
  const userId = auth.isAuthenticated()?.user?._id;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          R-Cent-S
        </Typography>

        <Link to={home}>
          <IconButton aria-label="Home" style={isActive(location, home)}>
            <HomeIcon />
          </IconButton>
        </Link>

        {!auth.isAuthenticated() && (
          <>
            <Link to="/signup">
              <Button style={isActive(location, "/signup")}>Sign Up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(location, "/signin")}>Sign In</Button>
            </Link>
          </>
        )}

        {auth.isAuthenticated() && (
          <>
            <Link to="/feed">
              <Button style={isActive(location, "/feed")}>Feed</Button>
            </Link>
            <Link to="/myposts">
              <Button style={isActive(location, "/myposts")}>My Posts</Button>
            </Link>
            <Link to="/mycomments">
              <Button style={isActive(location, "/mycomments")}>My Comments</Button>
            </Link>
            <Link to="/users">
              <Button style={isActive(location, "/users")}>Users</Button>
            </Link>
            {userId && (
              <Link to={`/users/${userId}`}>
                <Button style={isActive(location, `/users/${userId}`)}>My Profile</Button>
              </Link>
            )}
            <Button color="inherit" onClick={() => {
              auth.clearJWT(() => navigate('/'));
            }}>
              Sign Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
