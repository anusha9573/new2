const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all users
router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsersByUsername);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user profile
router.put('/:id', authMiddleware, [ /* Validation checks if required */ ], userController.updateUserProfile);

// Delete user
router.delete('/:id', authMiddleware, userController.deleteUser);

// Get followers for a specific user
router.get('/:id/followers', userController.getUserFollowers);

// Get users a specific user is following
router.get('/:id/following', userController.getUserFollowing);

module.exports = router;
