const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Comment'
  }] 
}, {
  timestamps: true 
});

const Comment = mongoose.model('Comment', CommentSchema);


const ForumPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'Comment'
    }
  ], 
  created_at: {
    type: Date,
    default: Date.now
  }
});

const ForumPost = mongoose.model('ForumPost', ForumPostSchema);
module.exports = {ForumPost,Comment};