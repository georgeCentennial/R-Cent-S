import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import DeleteUser from './DeleteUser';
import auth from '../lib/auth-helper.js';
import { read } from './api-user.js';
import { useLocation, Navigate, Link, useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    }
}));

export default function Profile() {
    const location = useLocation();
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const jwt = auth.isAuthenticated();
    const { userId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true);
            } else {
                setUser(data);
            }
        });

        return function cleanup() {
            abortController.abort();
        };
    }, [userId, jwt?.token]);

    if (redirectToSignin) {
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${user?.firstname} ${user?.lastname}`} secondary={user?.email} />
                    {auth.isAuthenticated()?.user?._id === userId && user?._id && (
                        <ListItemSecondaryAction>
                            <Link to={`/user/edit/${userId}`}>
                                <IconButton aria-label="Edit" color="primary">
                                    <Edit />
                                </IconButton>
                            </Link>
                            <DeleteUser userId={userId} />
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={"Joined: " + (user?.created ? new Date(user.created).toDateString() : 'N/A')} />
                </ListItem>
            </List>
        </Paper>
    );
}
