import express from 'express';
import commentCtlr from '../controllers/comment.controller.js';

const router = express.Router();
router.route('/api/comments').post(commentCtlr.create);
// router.route('/api/comments').get(commentCtlr.list);//


export default router;