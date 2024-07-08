const express = require('express');
const { check } = require('express-validator');
const commentController = require('../controllers/commentController');
// const interactionController = require('../controllers/interactionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Comments
router.get('/:post_id/comments', commentController.getCommentsByPostId); // Retrieve comments for a specific blog post
router.post('/:post_id/comments', authMiddleware, commentController.createComment); // Add a new comment to a specific blog post
router.put('/comments/:id', authMiddleware, commentController.updateComment); // Update a specific comment
router.delete('/comments/:id', authMiddleware, commentController.deleteComment); // Delete a specific comment

// Interactions
// router.post('/:post_id/like', authMiddleware, interactionController.likePost); // Like a specific blog post
// router.post('/:post_id/share', authMiddleware, interactionController.sharePost); // Share a specific blog post

module.exports = router;
