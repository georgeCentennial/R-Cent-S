import express from 'express';
import commentCtrl from '../controllers/comment.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();
router.route('/api/comments')
.get(commentCtrl.list)
.post(commentCtrl.create)

router.route('/api/comments/:commentId')
.get(commentCtrl.read)
.put(authCtrl.requireSignin, commentCtrl.isOwner, commentCtrl.update)
.delete(authCtrl.requireSignin, commentCtrl.isOwner, commentCtrl.remove)

router.param('commentId', commentCtrl.commentById);

router.route('/api/comments/user/:userId')
.get(authCtrl.requireSignin, commentCtrl.commentsByUser)

router.route('/api/comments/post/:postId')
.get(authCtrl.requireSignin, commentCtrl.commentsByPost)


export default router;