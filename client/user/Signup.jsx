import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { create } from './api-user';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password : '',
    open: false,
    error: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = { 
      firstname: values.firstname || undefined,
      lastname: values.lastname || undefined,
      email: values.email || undefined,
      username: values.username || undefined,
      password: values.password || undefined
    };
    create(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, open: true });
      }
    });
  };

  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Sign Up</Typography>
          <TextField
            id="firstname"
            label="First Name"
            className={classes.textField}
            value={values.firstname}
            onChange={handleChange('firstname')}
            margin="normal"
          />
                    <TextField
            id="lastname"
            label="Last Name"
            className={classes.textField}
            value={values.lastname}
            onChange={handleChange('lastname')}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
          />
          <TextField
            id="username"
            label="Username"
            className={classes.textField}
            value={values.username}
            onChange={handleChange('username')}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            type="password"
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
          />
          {values.error && (
            <Typography component="p" color="error">
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} onClose={handleClose}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained" onClick={handleClose}>
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
