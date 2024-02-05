const Movies = require('../models/movieModel'); // Adjust the import path based on your project structure

const addMovie = async (req, res) => {
  try {
    // Assuming req.fileDownloadURL is set by the upload middleware
    const M_url = req.fileDownloadURL;

    // Destructuring movie details from the request body
    const { Mname, genre, rating } = req.body;

    // Create a new Movies document
    const movie = new Movies({ Mname, genre, rating, M_url });
    await movie.save();

    res.status(200).json({ message: 'Movie added successfully' });
  } catch (error) {
    console.error('Error during movie addition:', error.message);
    res.status(500).json({ message: 'Movie addition failed' });
  }
};

const getAllMovies = async (req, res) => {
    try {
      const movies = await Movies.find();
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = { addMovie,getAllMovies };
