import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import auth from '../lib/auth-helper.js';

const CommentForm = ({ postId, onCommentAdded }) => {
  const { register, handleSubmit, reset } = useForm();
  const userId = auth.isAuthenticated().user._id;

  const onSubmit = async (data) => {
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, post: postId, user: userId }),
    });
    console.log(JSON.stringify({ ...data, post: postId, user: userId }))
    reset();
    onCommentAdded(); // Refresh comments
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Write a comment"
        fullWidth
        multiline
        margin="dense"
        {...register('comment', { required: true })}
      />
      <Button type="submit" color="primary" variant="contained">
        Post Comment
      </Button>
    </form>
  );
};

export default CommentForm;