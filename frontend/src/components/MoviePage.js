import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

export default function MoviePage() {
  const { movieId } = useParams(); // Retrieve the movieId parameter from the URL
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/movie/${movieId}`);
        if (response.ok) {
          const data = await response.json();
          setMovieData(data.movie); // Update state with the movie data
        } else {
          console.error('Error fetching movie data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);

  return (
    <div className="movie">
      <div className='moviePage'>
        {movieData ? (
          <div>
            <div className="title">
              <h1>{movieData.Mname}</h1>
            </div>
            <div className="desc1">
              <p>{movieData.Release_date} - PG-13</p>
            </div>
            <div className='video-section'>
              <div dangerouslySetInnerHTML={{ __html: movieData.Trailer_url }} />
            </div>
            <div className="poster-section">
              <img className='poster-img' src={movieData.M_url} alt={movieData.Mname} />
            </div>
            <div className="desc1">
              <h1>About</h1>
              <p>{movieData.Overview}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
