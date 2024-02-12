import React from 'react';
import MovieCard from './MovieCard';

const HomePage = () => {
  // Define an array of genres
  const genres = [
    'Action', 'Thriller', 'Romance', 'Family',
    'Sci-fi', 'Fantasy', 'Horror', 'Crime', 'Sports'
  ];

  return (
    <div>
      {/* Map over the genres array and render MovieCard for each genre */}
      {genres.map((genre, index) => (
        <div key={index}>
          <h2>{genre}</h2>
          <MovieCard genre={genre} /> {/* Pass genre as a prop to MovieCard */}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
