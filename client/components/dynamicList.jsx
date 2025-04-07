import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@material-ui/core';
import auth from '../lib/auth-helper.js';

const DynamicList = ({ apiUrl, rootUrl, onEdit, showKeys}) => {
    const [items, setItems] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({});

    const jwt = auth.isAuthenticated();
    const userId = auth.isAuthenticated().user._id;
    
    const fetchItems = async () => {
        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt.token
            }
        });
        const data = await res.json();
        setItems(data);
    };

    //add Auth
    const handleDelete = async (item) => {
        await fetch(`${rootUrl}/${item._id}`, { 
            method: 'DELETE', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt.token
            }
        });
        fetchItems();
    };

    //used to get items, readable
    useEffect(() => {
        fetchItems();
    }, [apiUrl]);


    const handleEditClick = (item, index) => {
        setEditIndex(index);
        setEditedItem({ ...item });
    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditedItem({});
    };

    const handleChange = (key, value) => {
        setEditedItem((prev) => ({ ...prev, [key]: value }));
    };

    //add auth
    const handleSave = async () => {
        const res = await fetch(`${rootUrl}/${editedItem._id}`, {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt.token
            },
            body: JSON.stringify(editedItem),
        });

        if (res.ok) {
            setEditIndex(null);
            setEditedItem({});
            fetchItems();
        }
    };

    return (
        <>
        {items.map((item, index) => (
            <Card key={item._id} style={{ marginBottom: '1rem' }}>
                <CardContent>
                    {/* will loop through a model's fields */}
                    {Object.entries(item).map(([key, value]) => { 
                            // display selected fields
                            if (!showKeys.includes(key)) return null;
                            return (editIndex === index ? (
                                <TextField
                                    key={key+index}
                                    label={key}
                                    value={editedItem[key] || ''}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    fullWidth
                                    margin="dense"
                                />
                                ) : (
                                    <Typography>{value}</Typography>
                                )
                            )
                        }
                    )}
                    {/* display selected buttons depending if edit or not */}
                    {/** due to different naming scheme for userId/user, added or */}
                    {(item?.userId?._id === userId || item?.user?._id === userId)? ( 
                            editIndex === index ? (
                                <>
                                <Button color="primary" onClick={handleSave}>
                                    Save
                                </Button>
                                <Button color="secondary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                </>
                            ) : (
                                <>
                                <Button color="primary" onClick={() => handleEditClick(item, index)}>
                                    Edit
                                </Button>
                                <Button color="secondary" onClick={() => handleDelete(item)}>
                                    Delete
                                </Button>
                                </>
                            )
                        ) : null
                    }
                </CardContent>
            </Card>
        ))}
        </>
    );
};

export default DynamicList;