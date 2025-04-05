import PostForm from '../components/postForm';
import PostList from '../components/postList';
import React, { useState, useEffect } from "react";

function FeedPage() {
    const [posts, setPosts] = useState([]);

    // Fetch posts from API
    const fetchPosts = async () => {
        try {
            const response = await fetch("api/posts"); // Replace with your API URL
            if (!response.ok) throw new Error("Failed to fetch posts");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return(
        <>
        <PostForm onPostCreated={fetchPosts}/>
        <PostList posts={posts}/>
        </>
    )
}

export default FeedPage;