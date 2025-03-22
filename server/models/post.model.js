import mongoose from 'mongoose'
//import crypto from 'crypto'          20250318

const PostSchema = new mongoose.Schema({
   userId: {
      type: String,
      trim: true,
      required: 'UserId is required'
   },  
   content: {
      type: String,
      trim: true,
      required: 'content is required'
   },
   created: {
      type: Date,
      default: Date.now
   },
   updated: {
      type: Date,
      default: Date.now
   }
});

export default mongoose.model('Post', PostSchema);
