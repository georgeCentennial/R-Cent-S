import { useForm } from "react-hook-form"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import auth from '../lib/auth-helper.js';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // width: 'flex',
      marginTop: theme.spacing(4),
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
}));

export default function PostForm({ onPostCreated }) {
  const { register, handleSubmit, reset } = useForm();

  const classes = useStyles();
  const onSubmit = async (data) => {
    const userId = auth.isAuthenticated().user._id;
    const formData = {userId, ...data};
    try {
      const response = await fetch("api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      reset(); // Clear form after submission
      onPostCreated(); // Notify parent to update post list
    }catch(err){

    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root} >
      <Container maxWidth="sm">
          <TextField
          id="outlined-multiline-static"
          label="Post"
          multiline
          rows={6}
          placeholder="Post what's on your mind..."
          variant="outlined"
          {...register("content")}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
      </Container>
    </form>
  )
}