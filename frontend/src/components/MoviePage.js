// MoviePage.js

import React from 'react';
import '../index.css'; // Import the CSS file

export default function MoviePage() {
  return (
    <div className="movie">

    <div className='moviePage'>
    <div className="title">
        <h1>Title</h1>
      </div>
    <div className="desc1">
        2023 - PG-13 
      </div>
        {/* Video Section */}
        <div className='video-section'>
          <video
            controls
            width="100%"
            height="450px"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
          >
            <source
              src="https://www.example.com/your-video.mp4"  // Replace with your video URL
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Poster Section */}
        <div className="poster-section">
          <img className='poster-img' src='https://www.shutterstock.com/image-vector/illustrating-marvel-avengers-endgame-characters-260nw-2353268123.jpg' alt="kjhukk" />

          {/* Add more poster details as needed */}
        </div>
        <div className="desc1">
        <h1>About</h1>
      </div>
      <div className='borderDiv'>
      {/* Your content inside the bordered div */}
    </div>
        <div className="desc1">
        <h1>Review And Ratings</h1>
      </div>
      <div className='borderDiv'>
      {/* Your content inside the bordered div */}
    </div>
        <div className="desc1">
        <h1>Cast</h1>
      </div>
      <div className='borderDiv'>
      {/* Your content inside the bordered div */}
    </div>
        <div className="desc1">
        <h1>StoryLine</h1>
      </div>
      <div className='borderDiv'>
      {/* Your content inside the bordered div */}
    </div>
      </div>
      </div>
  );
}
