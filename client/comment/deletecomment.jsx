import React, {useState} from 'react'       
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from '../lib/auth-helper.js'
import {remove} from './api-comment.js'
import {Navigate} from 'react-router-dom'
export default function Deletecomment(props) {
const [open, setOpen] = useState(false)
const [redirect, setRedirect] = useState(false)
const jwt = auth.isAuthenticated()
const clickButton = () => {
setOpen(true)
}
const deleteAccount = () => {
remove({
commentId: props.commentId
}, {t: jwt.token}).then((data) => {
if (data && data.error) {
console.log(data.error)
} else {
auth.clearJWT(() => console.log('deleted'))
setRedirect(true)
}
})
}
 const handleRequestClose = () => {
 setOpen(false)
 }
if (redirect) {
return <Navigate to='/'/>
}
return (<span>
<IconButton aria-label="Delete" onClick={clickButton} color="secondary"><DeleteIcon/></IconButton>

<Dialog open={open} onClose={handleRequestClose}><DialogTitle>{"Delete Comment"}</DialogTitle>
<DialogContent><DialogContentText>Confirm to delete your comment.</DialogContentText></DialogContent>
<DialogActions><Button onClick={handleRequestClose} color="primary">Cancel</Button>
<Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">Confirm</Button>
</DialogActions>
</Dialog>
</span>)
}
Deletecomment.propTypes = {
commentId: PropTypes.string.isRequired
}
