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

const read = async (req, res) => {
    return res.json(req.comment);
}

const update = async (req, res) => {
    try{
        let comment = req.comment;
        comment = extend(comment, fields);
        comment.updated = Date.now();
        let result = await comment.save();
        res.json(result);
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const remove = async (req, res) => {
    try{
        let comment = req.comment;
        let deletedComment = await comment.remove();
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

//is comment by user
const isOwner = async (req, res) => {
    
}

export default {
    create, read, update, remove, listByPost, isOwner
}