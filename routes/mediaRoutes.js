const express = require('express');
const router = express.Router();
const multer = require('multer');
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middleware/authMiddleware');
const path = require('path');  // Add this line

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));  // Ensure the path module is used
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('file'), mediaController.uploadMedia);
router.get('/', authMiddleware, mediaController.getAllMedia);
router.get('/:id', authMiddleware, mediaController.getMediaById);
router.delete('/:id', authMiddleware, mediaController.deleteMedia);

module.exports = router;
