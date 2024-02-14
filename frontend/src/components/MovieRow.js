import React from 'react';
import MovieCard from './MovieCard';

const HomePage = () => {
  // Define an array of genres
  const genres = [
    'Action', 'Thriller', 'Romance', 'Family',
    'Sci-fi', 'Fantasy', 'Horror', 'Crime', 'Sports'
  ];

  return (
    <div style={styles.homePage}>
      {/* Map over the genres array and render MovieCard for each genre */}
      {genres.map((genre, index) => (
        <div key={index} style={styles.genreSection}>
          <h2 style={styles.genreTitle}>{genre}</h2>
          <MovieCard genre={genre} /> {/* Pass genre as a prop to MovieCard */}
        </div>
      ))}
    </div>
  );
};

const styles = {
  homePage: {
    background: '#111', // Dark background color
    color: '#fff', // Light text color
    padding: '20px',
  },
  genreSection: {
    marginBottom: '30px',
  },
  genreTitle: {
    fontSize: '24px',
    marginBottom: '10px',
  },
};

export default HomePage;
