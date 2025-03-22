import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    //comment content
    comment: { 
        type: String,
        required: true
    },
    //commented by
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    //commented on post
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
});

//export to be used outside
export default mongoose.model('Comment', CommentSchema);