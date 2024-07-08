// const express = require('express');
// const blogController = require('../controllers/blogController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// router.post('/',  upload.single('media') ,blogController.createBlog); // Create a new blog post

// router.get('/', blogController.getBlogs); // Get all blog posts
// router.get('/:id', blogController.getBlogById); // Get details of a specific blog post
// router.put('/:id', authMiddleware, blogController.updateBlog); // Update details of a specific blog post
// router.delete('/:id', authMiddleware, blogController.deleteBlog); // Delete a specific blog post

// module.exports = router;
const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Adjust the path as needed

const router = express.Router();

// Create a new blog post
router.post('/', upload.single('media'), blogController.createBlog);

// Get all blog posts
router.get('/', blogController.getBlogs);

// Get details of a specific blog post
router.get('/:id', blogController.getBlogById);

// Update details of a specific blog post
router.put('/:id', authMiddleware, blogController.updateBlog);

// Delete a specific blog post
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
