const path = require('path');
const multer = require('multer');

// Define the absolute path for the uploads directory
const uploadDir = path.resolve(__dirname, '..', 'uploads');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
