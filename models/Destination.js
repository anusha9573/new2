const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  guides: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Destination = mongoose.model('Destination', DestinationSchema);
module.exports = Destination;