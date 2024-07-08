const Destination = require('../models/Destination');
const Blog = require('../models/Blog');

// @desc    Create a new destination
// @route   POST /api/destinations
exports.createDestination = async (req, res) => {
  const { name, description, guides } = req.body;
  try {
    const newDestination = new Destination({
      name,
      description,
      guides
    });

    await newDestination.save();
    res.json(newDestination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @desc    Search blogs
// @route   GET /api/destinations/search
exports.searchBlogs = async (req, res) => {
  const { location } = req.query;
  try {
    let query = {};
    if (location) {
      query = { location: new RegExp(location, 'i') };
    }
    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .populate('comments')
      .populate('media');
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all destinations
// @route   GET /api/destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const blogs = await Blog.find()
    .populate('author', 'username')
    .populate('media'); // Populate media references
  res.json(blogs);
} catch (err) {
  console.error('Error fetching blogs:', err.message);
  res.status(500).send('Server Error');
}
};

// @desc    Get destination by ID
// @route   GET /api/destinations/:id
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found' });
    }
    res.json(destination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a destination
// @route   PUT /api/destinations/:id
exports.updateDestination = async (req, res) => {
  const { name, description, guides } = req.body;
  try {
    let destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found' });
    }

    destination.name = name;
    destination.description = description;
    destination.guides = guides;

    await destination.save();
    res.json(destination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a destination
// @route   DELETE /api/destinations/:id
exports.deleteDestination = async (req, res) => {
  try {
    let destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found' });
    }

    await destination.remove();
    res.json({ msg: 'Destination removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};