import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { list } from './api-user.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchUsers() {
      try {
        const data = await list(signal);
        console.log('Fetched Users:', data); // Enhanced debugging for clarity
        if (data && data.error) {
          console.error('Error fetching users:', data.error);
        } else if (data) {
          setUsers(data); // Save users to state
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    fetchUsers();

    return () => abortController.abort(); // Cleanup API call
  }, []);

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.length > 0 ? (
          users.map((user) => (
            <ListItem key={user._id}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))
        ) : (
          <Typography>No users found</Typography>
        )}
      </List>
    </Paper>
  );
}