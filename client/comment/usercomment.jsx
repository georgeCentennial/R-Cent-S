import React, { useState, useEffect } from 'react'              
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'  
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteComment from './deletecomment.jsx'
import auth from '../lib/auth-helper.js'
import {read} from './api-comment.js'
import {useLocation, Navigate, Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';

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
}))
export default function Usercomment() {
const location = useLocation();
const classes = useStyles()
const [comment, setComment] = useState({})
const [redirectToSignin, setRedirectToSignin] = useState(false)
const jwt = auth.isAuthenticated()
const { commentId } = useParams();
useEffect(() => {
const abortController = new AbortController()
const signal = abortController.signal
read({
commentId: commentId
}, {t: jwt.token}, signal).then((data) => {
if (data && data.error) {
setRedirectToSignin(true)
} else {
setComment(data)
}
})
return function cleanup(){
abortController.abort()
}
}, [commentId])
if (redirectToSignin) {
return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
}
if (auth.isAuthenticated()) {
console.log( auth.isAuthenticated().comment._id)
console.log(comment._id)
}
return (
<Paper className={classes.root} elevation={4}>
<Typography variant="h6" className={classes.title}>user comment</Typography>
<List dense><ListItem><ListItemAvatar><Avatar><Person/></Avatar></ListItemAvatar><ListItemText primary={comment.Id} secondary={user.Id}/> {auth.isAuthenticated().comment && auth.isAuthenticated().comment._id == comment._id && (<ListItemSecondaryAction>
<Link to={"/comment/edit/" + comment._id}><IconButton aria-label="Edit" color="primary"><Edit/></IconButton></Link>
<DeleteComment commentId={comment._id}/></ListItemSecondaryAction>) }</ListItem>
<Divider/><ListItem><ListItemText primary={"Joined: " + ( new Date(comment.created)).toDateString()}/></ListItem>
</List>
</Paper>
)
}

