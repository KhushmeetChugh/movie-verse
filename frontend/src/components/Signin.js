// Signin.js

import React, { useState } from 'react';
import '../index.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token,setToken]=useState('');

  const handleLogin = async () => {
    // In a real application, you would handle login logic here
    console.log(`Logging in with email: ${email} and password: ${password}`);
    try {
      const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const token=data.token;
        setToken(token)
      } else {
        console.log(await response.text());  // Log the response text for error cases
      }
    } catch (err) {
      console.log("error=", err);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
