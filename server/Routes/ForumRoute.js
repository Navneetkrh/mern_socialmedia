const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
    createForumPost, 
    getAllForumPosts, 
    getForumPostById,  
    updateForumPostById, 
    deleteForumPostById,
    createCommentOnPost,
    getAllCommentsOnPost,
    updateCommentOnPost,
    deleteCommentOnPost
} = require('../Controllers/ForumController');
const router = express.Router();

router.route('/for')
    .post(protect, createForumPost)
    .get(protect, getAllForumPosts);

router.route('/forums/:id')
    .get(protect, getForumPostById)
    .put(protect, updateForumPostById)
    .delete(protect, deleteForumPostById);


router.route('/forums/:id/comments')
    .post(protect, createCommentOnPost)
    .get(protect, getAllCommentsOnPost);

router.route('/forums/:postId/comments/:commentId')
    .put(protect, updateCommentOnPost)
    .delete(protect, deleteCommentOnPost);

module.exports = router;