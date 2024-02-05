import React, { useState } from 'react';
import '../../index.css'

const Addmovies = () => {
  const [Mname, setMname] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const handleSignup = async () => {
    try {
      const formData = new FormData();

      // Append file to FormData
      formData.append("file", file);

      // Append other form fields
      formData.append("Mname", Mname);
      formData.append("genre", genre);
      formData.append("rating", rating);

      setLoading(true);

      const response = await fetch('http://localhost:4000/moviesUpload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSignupSuccess(true);
        setError('');
        console.log('Signup successful!');
      } else {
        setSignupSuccess(false);
        setError('Signup failed. Please try again.');
        console.error('Signup failed');
      }
    } catch (error) {
      setSignupSuccess(false);
      setError(`Error during signup: ${error.message}`);
      console.error('Error during signup:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Addmovies</h1><hr/>
      <form className="signup-form">
        <div>
          <h4>File Upload</h4>
          <input type="file" onChange={(event) => setFile(event.target.files[0])} />
        </div>
        <label>Movie Name:</label>
        <input type="text" value={Mname} onChange={(e) => setMname(e.target.value)} />

        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />

        <label>Rating:</label>
        <input type="Number" value={rating} onChange={(e) => setRating(e.target.value)} />

        <button type="button" onClick={handleSignup} disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        {signupSuccess && <p className="success-message">Signup successful!</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Addmovies;
