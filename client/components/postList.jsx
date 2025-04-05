import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography } from '@material-ui/core';

function PostsList({ posts }) {
    
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
                        <Typography variant="caption">{post.userId.firstname}</Typography>
                        <Typography variant="h3" color="text.secondary">
                            {post.content}
                        </Typography>
                        <Typography align='right'>{new Date(post.created).toLocaleDateString()}</Typography>
                    </CardContent>
                </Card>
                )))
            }
        </Container>
    );
}

export default PostsList;