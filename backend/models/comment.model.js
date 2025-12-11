import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema(
  {
    content: { 
      type: String, required: true 
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
    },
    post: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true 
    },
    parentComment: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null 
    }, 
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
