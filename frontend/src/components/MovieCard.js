import React, { useState, useEffect } from 'react';
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const MovieCard = ({ genre }) => { // Accept genre as a parameter
  const cookies = document.cookie;
  console.log("cookies=" + cookies);
  console.log("genre="+ genre);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);

  const addWatchList = async (movieId) => {
    setLoggedIn(document.cookie.includes("Login"));
    if (!loggedIn) {
      alert("Not Logged In. Please Login First");
    } else {
      console.log("MovieID", movieId);
      const response = await fetch("http://localhost:4000/AddWatchList", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cookies': cookies
        },
        body: JSON.stringify({ movieId }),
      });
      if (response.ok) {
        console.log("Movie Added to WatchList");
      } else {
        console.log("Error Adding Movie To WatchList");
        console.log("Status:", response.status);
      }
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/getMoviesByGenre', { // Fetch movies by genre
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ genre }),
           // Pass genre in the request body
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          
          if (Array.isArray(data)) {
            // Ensure that data is an array
            setMovies(data);
            console.log('Data:', data)
            console.log(movies);
          } else {
            console.error('Data is not an array');
          }
          
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
  }, [genre]); // Run effect whenever genre changes

  return (
    <div style={styles.moviesList}>
      {loading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}
      {movies.map((movie) => {
        console.log('Movie:', movie,"url=",movie); // Log each movie object
        return (
          <Nav key={movie}>
            <div style={styles.card}>
              <Nav.Link as={Link} to={`/movies/${movie._id}`}>
                <img src={movie.M_url} alt={movie.Mname} style={styles.image} />
              </Nav.Link>
              <div style={styles.details}>
                <h3 style={styles.title}>{movie.Mname}</h3>
                <p style={styles.genre}>Genre: {movie.genre_ids}</p>
                <p style={styles.rating}>Rating: {movie.rating}</p>
                <button onClick={() => addWatchList(movie._id)}>Add To WatchList</button>
              </div>
            </div>
          </Nav>
        );
      })}
    </div>
  );
  
  
  
};

const styles = {
  moviesList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowX: 'auto', // Enable horizontal scrolling
    maxHeight: 'calc(100vh - 100px)', // Adjust the max height as needed
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '16px',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
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
    display: 'inline-block',
    padding: '4px 8px',
    marginRight: '4px',
    marginBottom: '4px',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    marginBottom: '4px',
  },
};


export default MovieCard;
