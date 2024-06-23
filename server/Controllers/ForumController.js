const asyncHandler = require("express-async-handler");
const {ForumPost,Comment} = require("../models/Forum_Models/ForumPost");
const User = require("../models/userModel");
const createForumPost = asyncHandler(async (req, res) => {
    const forumPost = new ForumPost();
    
    forumPost.content = req.body.content;
    forumPost.author = req.user;
    forumPost.title = req.body.title;
    try {
        await forumPost.save();
        res.status(201).json(forumPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


async function populateReplies(comments) {
  if (!comments.length) return [];

  await Promise.all(comments.map(async (comment) => {
    const populatedComment = await Comment.findById(comment._id).populate('replies');
    comment.replies = populatedComment.replies;

    if (comment.replies && comment.replies.length > 0) {
      await populateReplies(comment.replies);
    }
  }));

  return comments;
}

const getAllForumPosts = asyncHandler(async (req, res) => {
  try {
    const forumPosts = await ForumPost.find({}).populate('comments');
    
    for (let post of forumPosts) {
      post.comments = await populateReplies(post.comments);
    }

    res.status(200).json(forumPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getForumPostById = asyncHandler(async (req, res) => {
    try {
        const forumPost = await ForumPost.findById(req.params.id);
        if (!forumPost) {
            res.status(404).json({ message: 'Forum post not found' });
        } else {
            res.status(200).json(forumPost);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateForumPostById = asyncHandler(async (req, res) => {
    try {
        const forumPost = await ForumPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!forumPost) {
            res.status(404).json({ message: 'Forum post not found' });
        } else {
            res.status(200).json(forumPost);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const deleteForumPostById = asyncHandler(async (req, res) => {
    try {
        const forumPost = await ForumPost.findByIdAndDelete(req.params.id);
        if (!forumPost) {
            res.status(404).json({ message: 'Forum post not found' });
        } else {
            res.status(200).json({ message: 'Forum post deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const createCommentOnPost = asyncHandler(async (req, res) => {
    try {
        
        const forumPost = await ForumPost.findById(req.params.id);
                                          

        if (!forumPost) {
            res.status(404).json({ message: 'Forum post not found' });
            return;
        }
        
        var newComment = await Comment.create({
            content: req.body.content,
            author: req.body.author
        });

        console.log(newComment);
        

        if (!newComment.author || !newComment.content) {
            res.status(400).json({ message: 'Both author and content are required for a comment.' });
            return;
        }
        await newComment.save();

        
        forumPost.comments.push(newComment._id);
        
       
        await forumPost.save();

        

        

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getAllCommentsOnPost = asyncHandler(async (req, res) => {
    try {
        const forumPost = await ForumPost.findById(req.params.id);
        if (!forumPost) {
            res.status(404).json({ message: 'Forum post not found' });
        } else {
            res.status(200).json(forumPost.comments);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateCommentOnPost = asyncHandler(async (req, res) => {
    try {
        const forumPost = await ForumPost.findById(req.params.postId);
        if (!forumPost) {
            return res.status(404).json({ message: 'Forum post not found' });
        }

        // Function to recursively find the parent comment and add a reply
        const addReplyToComment  = async (comments, parentId, reply) => {
           comment = await Comment.findById(parentId);
                
                console.log(comment);
                if (comment) {
                    comment.replies.push(reply._id);
                    await comment.save();
                    return true;
                }
                else {
                    res.status(404).json({ message: 'Parent comment not found' });
                }

        
        };

        // Create a new reply comment
        const content  = req.body.content;
        const user =  req.user
        const postId = req.params.postId; 
        const newComment = await Comment.create({ content : content, author : user });
        await newComment.save();
        // Attempt to add the reply to the specified comment
        const isAdded = await addReplyToComment(forumPost.comments, req.params.commentId, newComment);

        if (!isAdded) {
            return res.status(404).json({ message: 'Parent comment not found' });
        }

        await forumPost.save();
        res.status(200).json({ message: 'Reply added successfully', reply: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteCommentOnPost = asyncHandler(async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Find the index of the comment to be removed
        const commentIndex = post.comments.findIndex(c => c._id.toString() === req.params.commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Remove the comment from the array
        post.comments.splice(commentIndex, 1);
        console.log(post.comments);
        // Save the post
        await post.save();
        console.log("Comment deleted successfully.");
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = {
    createForumPost,
    getAllForumPosts,
    getForumPostById,
    updateForumPostById,
    deleteForumPostById,
    createCommentOnPost,
    getAllCommentsOnPost,
    updateCommentOnPost,
    deleteCommentOnPost
};