const mongoose = require('mongoose');

// Define schema for genres
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the genre
  movieIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] // Array of movie IDs associated with the genre
});

// Create Genre model
const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
