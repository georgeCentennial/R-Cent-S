import React ,{useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from '../lib/auth-helper.js'
import { read, update } from './api-comment.js'
import { Navigate } from 'react-router-dom' 
import { useParams } from 'react-router-dom'
const useStyles = makeStyles( theme => ({
card: {
maxWidth: 600,
margin: 'auto',
textAlign: 'center',
marginTop: theme.spacing(5),
paddingBottom: theme.spacing(2)
},
title: {
margin: theme.spacing(2),
color: theme.palette.protectedTitle
},
error: {
verticalAlign: 'middle'
},
textField: {
marginLeft: theme.spacing(1),
marginRight: theme.spacing(1),
width: 300
},
submit: {
margin: 'auto',
marginBottom: theme.spacing(2)
}
}))
export default function Editcomment() {
const classes = useStyles()
const { commentId } = useParams();
const [ values, setValues] = useState( {
commentId: '',
open: false,
error: '',
NavigationToProfile: false
} )
const jwt = auth.isAuthenticated()
useEffect( () => {
const abortController = new AbortController()
const signal = abortController.signal
read( { commentId: commentId }, { t: jwt.token }, signal).then ((data) => {
if( data && data.error) {
setValues({ ...values, error:data.error })
}
else {
setValues({ ...values, commentId: data.commentId, comment: data.comment})
}
} )
return function cleanup() {
abortController.abort()
}}, [commentId])
const clickSubmit = () => {
const user = {
commentId: values.commentId || underfined,
comment: values.comment || underfined,
//password: values.password || underfined
}
update ({ commentId: commentId }, { t: jwt.token}, comment).then((date) => {
if (data && data.error) { setValues( {...values, error: data.error})
} else { setValues( {...values, commentId: data._Id, Navigfile: true})
 }
 } ) 
 } 
 const handleChange = name => event => {
setValues({ ...values, [ name ]:event.target.value})
 }
if(values.NavigateToProfile){
return ( <Navigate to = {'/comment'+values.commentId}/>)
}
return (
<Card className = {classes.card}>
<CardContent>
<Typography variant = "h6" className = {classes.title}>
EditProfileateToPro
</Typography>
<TextField id = "userId" label = "UserId" className = {classes.textField} value = {values.userId} onChange = {handleChange('userId')} margin = "normal"/><br/>
<TextField id = "comment" label = "Comment" className = {classes.textField} value = {values.comment} onChange = {handleChange('comment')} margin = "normal"/><br/>
{ values.error && (
<Typography component = "p" color = "error">
<Icon color = "error" className = {classes.error} > error</Icon>
{values.error}
</Typography>
)}
</CardContent>
<CardActions>
<Button color = "primary" variant = "contained" onClick = {clickSubmit} className = {classes.submit}>Submit </Button>
</CardActions>
</Card>
)
}
