import React, { useState } from 'react';
import MovieCard from './MovieCard';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Define an array of genres
  const genres = [
    'Action', 'Thriller', 'Romance', 'Family',
    'Sci-fi', 'Fantasy', 'Horror', 'Crime', 'Sports'
  ];

  // Function to handle search submission
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      // If search query is empty, show default homepage
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Call backend API to search for movies
    try {
      setIsSearching(true);
      const response = await fetch("http://localhost:4000/searchMovies", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieString: searchQuery }),
      });
      const data = await response.json();
      setSearchResults(data.movies);
    } catch (error) {
      console.error('Error searching for movies:', error);
      // Handle error
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={styles.homePage}>
      {/* Search section */}
      <div style={styles.searchSection}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display search results or default homepage */}
      {isSearching ? (
        <p>Loading...</p>
      ) : searchQuery.trim() !== '' ? (
        <div>
          {/* Display search results */}
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div>
          {/* Display all movies */}
          {genres.map((genre, index) => (
            <div key={index} style={styles.genreSection}>
              <h2 style={styles.genreTitle}>{genre}</h2>
              {/* Render all movies for this genre */}
              {genres.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  homePage: {
    background: '#111', // Dark background color
    color: '#fff', // Light text color
    padding: '20px',
  },
  searchSection: {
    marginBottom: '20px',
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
