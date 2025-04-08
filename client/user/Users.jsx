import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { list } from './api-user.js';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  userLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.error(data.error);
      } else {
        setUsers(data);
      }
    });

    return () => abortController.abort();
  }, []);

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((user) => (
          <ListItem key={user._id}>
            <Link to={`/users/${user._id}`} className={classes.userLink}>
              <ListItemText primary={`${user.firstname} ${user.lastname.charAt(0)}.`} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
