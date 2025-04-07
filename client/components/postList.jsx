import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, IconButton, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { ChatBubbleOutline } from '@material-ui/icons';
import CommentForm from './commentForm';
import CommentList from './commentList';

function PostsList({ posts }) {
    const [openComments, setOpenComments] = useState({});
    const [refreshTrigger, setRefreshTrigger] = useState(Date.now());

    const toggleComments = (postId) => {
        setOpenComments((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };
    return (
        <Container maxWidth="sm" >
            {
                posts.length === 0 ? (
                <Typography align="center" mt={4}>
                    No posts available.
                </Typography>
                ) : (
                posts.map((post) => (
                <Card key={post._id} style={{ marginTop: 10}}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <Typography variant="caption">{post.userId.firstname}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="caption">{new Date(post.created).toDateString()}</Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h3" color="text.secondary">
                            {post.content}
                        </Typography>
                        <IconButton onClick={() => toggleComments(post._id)}>
                        <ChatBubbleOutline />
                        {openComments[post._id] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>

                        <Collapse in={openComments[post._id]}>
                        <Divider style={{ margin: '0.5rem 0' }} />
                        <CommentList postId={post._id} refresh={refreshTrigger} />
                        <CommentForm
                            postId={post._id}
                            onCommentAdded={() => setRefreshTrigger(Date.now())}
                        />
                        </Collapse>
                    </CardContent>
                </Card>
                )))
            }
        </Container>
    );
}

export default PostsList;