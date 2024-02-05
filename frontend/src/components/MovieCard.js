import React, { useState, useEffect } from 'react';

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/getAllMovies', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});// Adjust the API endpoint
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          setError('Failed to fetch movies.');
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={styles.moviesList}>
      {loading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}
      {movies.map((movie) => (
        <div key={movie._id} style={styles.card}>
          <img src={movie.M_url} alt={movie.Mname} style={styles.image} />
          <div style={styles.details}>
            <h3 style={styles.title}>{movie.Mname}</h3>
            <p style={styles.genre}>Genre: {movie.genre}</p>
            <p style={styles.rating}>Rating: {movie.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  moviesList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '16px',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',

    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  details: {
    padding: '16px',
  },
  title: {
    fontSize: '1.2em',
    marginBottom: '8px',
  },
  genre: {
    marginBottom: '4px',
  },
  rating: {
    marginBottom: '4px',
  },
};

export default MovieCard;
