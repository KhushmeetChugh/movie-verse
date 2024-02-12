const Movies = require('../models/movieModel');
const Genre = require('../models/genreModel');

const addMovie = async (req, res) => {
  try {
    const M_url = req.fileDownloadURL;
    const { Mname, genre_ids, type, rating, Adult, Overview, Popularity, Release_date, Original_language, Trailer_url } = req.body;

    const movie = new Movies({
      Mname,
      genre_ids: genre_ids.split(','),
      type,
      rating,
      M_url,
      Adult,
      Overview,
      Popularity,
      Release_date,
      Original_language,
      Trailer_url
    });

    await movie.save();

    // Add movie to genre
    genre_ids.split(',').forEach(async (genreId) => {
      await addMovieToGenre(genreId, movie._id);
    });

    res.status(200).json({ message: 'Movie added successfully' });
  } catch (error) {
    console.error('Error during movie addition:', error.message);
    res.status(500).json({ message: 'Movie addition failed' });
  }
};

const moviepage = async (req, res) => {
  const { m_id } = req.params;
  try {
    const movie = await Movies.findById(m_id);
    res.status(200).json({ movie });
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Internal server error' });
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

const addMovieToGenre = async (genreName, movieId) => {
  try {
    const trimmedGenreName = genreName.split(/["[\]]/).join('');
    // Find the genre document by name
    let genre = await Genre.findOne({ name:trimmedGenreName });

    // If the genre does not exist, create a new one
    if (!genre) {
      genre = new Genre({ name: trimmedGenreName, movieIds: [movieId] });
    } else {
      // If the genre already exists, add the movie ID to its movieIds array
      genre.movieIds.push(movieId);
    }

    // Save the genre document
    await genre.save();

    console.log(`Movie with ID ${movieId} added to genre ${trimmedGenreName}`);
  } catch (error) {
    console.error('Error adding movie to genre:', error);
  }
};


const getMoviesByGenre = async (req, res) => {
  const { genre } = req.body;
  console.log("genre=" + genre);

  try {
    const genreDocument = await Genre.findOne({ name: genre });
    console.log("genreDocument=" + genreDocument);
    if (!genreDocument) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    const movieIds = genreDocument.movieIds;
    console.log("moviesIds=" + movieIds);

    // Fetch all movie documents corresponding to the movieIds array
    const movies = await Movies.find({ _id: { $in: movieIds } });

    // Send the array of movie documents as the response
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { addMovie, getAllMovies, moviepage, addMovieToGenre, getMoviesByGenre };
