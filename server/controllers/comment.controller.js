import Comment from '../models/comment.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
    //assign new comment to comment
    const comment = new Comment(req.body);
    //try catch
    try{
        //create comment
        await comment.save();
        //return res, no message needed
        return res.status(200).json({
            message: "Commented"
        });
    }
    catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }   
}

const list = async (req, res) => { 
    try {
        let comments = await Comment.find().select('user post comment created updated') 
        res.json(comments)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const read = (req, res) => {
    return res.json(req.comment);
}

const update = async (req, res) => {
    try{
        let comment = req.comment;
        comment = extend(comment, req.body) //just update comment
        comment.updated = Date.now();
        await comment.save();
        res.json(comment);
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const remove = async (req, res) => {
    try{
        let comment = req.comment;
        let deletedComment = await comment.deleteOne();
        res.json(deletedComment);
    }catch(err){
        return res.json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

//get comments by post
const listByPost = async (req, res) => {
    try{
        let comments = await Comment.find({post: req.comment.post});
        res.json(comments);
    }catch(err){
        return res.json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const commentById = async (req, res, next, id) => {
    try {
      let comment = await Comment.findById(id).select('user post comment created updated'); 
      if (!comment) {
        return res.status(400).json({
          error: "Comment not found"
        });
      }
      req.comment = comment; 
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      return res.status(400).json({
        error: "Could not retrieve comment"
      });
    }
}

//is comment by user
const isOwner = (req, res, next) => {
    const authorized = req.comment && req.auth && req.auth._id == req.comment.user;
    if (!authorized) {
        return res.status(403).json({ error: "User is not authorized" });
    }
    next();
}


const commentsByUser = async (req, res)  => {
    const {userId} = req.params;
    try {
        let comments = await Comment.find({ user: userId }).select('user comment created updated')
        .populate('user', 'lastname firstname username')
        .sort({created: -1})
        res.json(comments)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const commentsByPost = async (req, res)  => {
    const {postId} = req.params;
    try {
        let comments = await Comment.find({ post: postId }).select('user post comment created updated')
        .populate('user', 'lastname firstname username')
        .sort({created: -1})
        res.json(comments)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

export default {
    create, list, commentById, read, update, remove, listByPost, isOwner, commentsByUser, commentsByPost
}