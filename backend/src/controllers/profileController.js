const User = require('../models/userModel');
const Movies=require('../models/movieModel');
const { uploadBytesResumable } = require('firebase/storage');

// Profile route handler
const profile = async (req, res) => {
  try {
    console.log("reached"+req.params.id)
    const user = await User.findById(req.params.id);
    console.log(user)
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const watchlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("hey" + userId);
    // Fetch watchlist data for the specified user from the database
    const user = await User.findById(userId);

    // Check if user exists and has a watchlist
    if (!user || !user.watchList) {
      return res.status(404).json({ message: 'User or watchlist not found' });
    }

    // Use Promise.all to wait for all promises to resolve
    const watchListArr = await Promise.all(user.watchList.map(async (movieId) => {
      const movie = await Movies.findById(movieId);
      return movie;
    }));

    console.log(watchListArr);
    res.status(200).json(watchListArr);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = { profile,watchlist };