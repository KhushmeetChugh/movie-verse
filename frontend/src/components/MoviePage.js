import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../index.css';

export default function MoviePage() {
  const navigate = useNavigate();
  const { movieId } = useParams(); // Retrieve the movieId parameter from the URL
  const [movieData, setMovieData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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

    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:4000/getMovieComments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ movie_id: movieId }), // Send movieId in the request body
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(`body=${response}`)
          // console.log(`${data.comments}`);
          setComments(data.comments);
           // Update state with the comments data
        } else {
          console.error('Error fetching comments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);

      }
    };
    

    if (movieId) {
      fetchMovieData();
      fetchComments();
    }
  }, [movieId]);

  const handleCommentSubmit = async () => {
    const cookies=document.cookie;
    if(cookies.includes("Login")){    
    // console.log("cookies",cookies);
    try {
      const response = await fetch(`http://localhost:4000/comments/${movieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cookies':cookies,
        },
        body: JSON.stringify({ comment: newComment }),
      });
      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data.newComment]); // Update state with the new comment
        setNewComment(''); // Clear the comment input field after submission
      } else {
        console.error('Error submitting comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  }
  else{
    const confirmLogin = window.confirm('You need to login to view comments. Do you want to go to the login page?');
    if (confirmLogin) {
      navigate('/signin');
    }
  }
  };

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
            <div className="comments-section">
              <h2>Add a Comment</h2>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment..."
              />
              <button onClick={handleCommentSubmit}>Submit</button>
            </div>
            <div className="show-comments-section">
  <h2>Show Comments</h2>
  <div className="all-comments">
    <h3>All Comments</h3>
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>{comment.comment_text}</li>
      ))}
    </ul>
  </div>
</div>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
