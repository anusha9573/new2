const Comment = require('../models/Comment');

// @desc    Retrieve comments for a specific blog post
// @route   GET /api/comments/:post_id/comments
exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.post_id });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a new comment to a specific blog post
// @route   POST /api/comments/:post_id/comments
exports.createComment = async (req, res) => {
  const { content } = req.body;
  try {
    const newComment = new Comment({
      content,
      author: req.user.id, // Assuming you have user authentication middleware
      post: req.params.post_id
    });
    await newComment.save();
    res.json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a specific comment
// @route   PUT /api/comments/:id
exports.updateComment = async (req, res) => {
  const { content } = req.body;
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a specific comment
// @route   DELETE /api/comments/:id
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    await comment.remove();
    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
