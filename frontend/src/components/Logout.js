import React from 'react';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Perform a fetch to the /logout route on your server
      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include',  // Include credentials for sending cookies
      });

      if (response.ok) {
        // Handle successful logout, e.g., redirect the user
        console.log('Logout successful!');
      } else {
        // Handle failed logout, e.g., display an error message
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
