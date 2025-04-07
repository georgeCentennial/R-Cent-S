import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import auth from '../lib/auth-helper.js';

const CommentList = ({ postId, refresh }) => {
  const [comments, setComments] = useState([]);
  const jwt = auth.isAuthenticated();
  const userId = auth.isAuthenticated().user._id;

  const fetchComments = async () => {
    const res = await fetch(`/api/comments/post/${postId}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt.token
        }
    });
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [postId, refresh]);

  return (
    <>
      {comments.map((comment) => (
        <>
        <Typography key={comment._id + comment.user._id} variant="caption">
            By {comment.user.username}
        </Typography>
        <Typography key={comment._id} variant="h6">
          - {comment.comment}
        </Typography>
        </>
      ))}
    </>
  );
};

export default CommentList;