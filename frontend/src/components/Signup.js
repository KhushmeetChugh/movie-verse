import React, { useState } from 'react';
import '../index.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      setLoading(true);

      const response = await fetch('http://localhost:4000/signup', {
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
      <h2>Signup</h2>
      <form className="signup-form">
        <div>
          <img src=" https://firebasestorage.googleapis.com/v0/b/movieverse-f7355.appspot.com/o/files%2Fuse%20case%20diagram%20SIH%20(2).jpg%20%20%20%20%20%20%202024-02-01T21%3A02%3A31.237Z?alt=media&token=99f62777-d25f-4361-bada-2465a76ca7de" alt="Profile"
        className="rounded-circle"
        style={{
          width: '100px', // Set the width as per your requirement
          height: '50px', // Set the height as per your requirement
          objectFit: 'cover', // Preserve aspect ratio and cover container
        }}/>
          <h1>File Upload</h1>
          <input type="file" onChange={(event) => setFile(event.target.files[0])} />
        </div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="button" onClick={handleSignup} disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        {signupSuccess && <p className="success-message">Signup successful!</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
