const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// User routes
router.get('/users', authMiddleware, adminController.getAllUsers);
router.delete('/users/:id', authMiddleware, adminController.deleteUser);

// Post routes
router.get('/posts', authMiddleware, adminController.getAllPosts);
router.delete('/posts/:id', authMiddleware, adminController.deletePost);

// Comment routes
router.get('/comments', authMiddleware, adminController.getAllComments);
router.delete('/comments/:id', authMiddleware, adminController.deleteComment);

// Report routes
router.get('/reports', authMiddleware, adminController.getAllReports);

module.exports = router;
