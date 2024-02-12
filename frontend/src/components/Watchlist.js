import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import './Watchlist.css'; // Import CSS file for styling

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    console.log('userId:', userId);
    const fetchWatchlist = async () => {
      try {
        const response = await fetch(`http://localhost:4000/watchlist/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch watchlist');
        }
        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
    fetchWatchlist();
  }, [userId]);

  return (
    <div>
      <h1>My Watchlist</h1>
      <div className="watchlist-container">
        {watchlist.map(movie => (
          <div className="movie-card">
          <img src={movie.M_url} alt={movie.Mname} className="movie-img" />
          <div className="movie-details">
            <h2>{movie.Mname}</h2>
            <p>Rating: {movie.rating}</p>
            <p>Genre: {movie.genre_ids && movie.genre_ids[0]}</p>
            <p className="overview">Overview: {movie.Overview}</p>
            <button>Watch Now</button>
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
