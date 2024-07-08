const Media = require('../models/Media');
const fs = require('fs');
const path = require('path');
const User = require('../models/User'); 

// Define the absolute path for the uploads directory
const uploadDir = path.resolve(__dirname, '..', 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// @desc    Upload a new media file
// @route   POST /api/media
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const { filename } = req.file;
    const username = req.body.username;

    // Fetch the user document by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Create the media document using the user's ObjectId
    const media = new Media({
      url: `/uploads/${filename}`, // Make sure this path is correct
      description: req.body.description, // Assuming description is sent in the body
      uploader: user._id
    });

    await media.save();
       
    res.json(media);
  } catch (err) {
    console.error('Upload Media Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all media files
// @route   GET /api/media
exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    console.error('Get All Media Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get media by ID
// @route   GET /api/media/:id
exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ msg: 'Media not found' });
    }
    res.json(media);
  } catch (err) {
    console.error('Get Media By ID Error:', err.message);
    res.status(500).send('Server Error');
  }
};


//



 exports.deleteMedia = async (req, res) => {
  try {
    // Find the media document
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ msg: 'Media not found' });
    }

    // Construct the correct file path
    const filePath = path.resolve(__dirname, '..', 'uploads', media.url.replace('/uploads/', ''));
    console.log('File Path:', filePath);

    // Check if the file exists before deleting
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('File deleted successfully');
    } else {
      console.error('File does not exist:', filePath);
      return res.status(404).json({ msg: 'File does not exist' });
    }

    // Remove the media document from the database
    await media.deleteOne();
    console.log('Media document deleted from database');

    res.json({ msg: 'Media removed' });
  } catch (err) {
    console.error('Delete Media Error:', err.message);
    res.status(500).send('Server Error');
  }
};

