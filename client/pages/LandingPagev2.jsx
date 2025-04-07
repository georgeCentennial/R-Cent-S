import React, { useState } from 'react';
import DynamicForm from '../components/dynamicForm';
import DynamicList from '../components/dynamicList';
import auth from '../lib/auth-helper.js';

const userId = auth.isAuthenticated()?.user?._id;

const apiUrl = '/api/posts/user/' + userId; //set your url
const rootUrl = '/api/posts';
console.log(apiUrl)
const fields = [
  { name: 'content', label: 'Content' },
];

const MyPostsPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleSuccess = () => {
    setEditItem(null);
    setRefresh(!refresh);
  };

  const showKeys = ["content"]; // show specific fields from model you want to display

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>My Posts</h2>
      <DynamicList
        apiUrl={apiUrl} // force refresh
        rootUrl={rootUrl} //for deleting/updating single items
        onEdit={(item) => setEditItem(item)} // for updating
        showKeys={showKeys} // show specific fields from model you want to display
      />
    </div>
  );
};

export default MyPostsPage;