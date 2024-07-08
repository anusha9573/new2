const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Media = mongoose.model('Media', MediaSchema);
module.exports = Media;
