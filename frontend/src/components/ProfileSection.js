import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const Profile = () => {
  const hclick=async()=>{
    const response = await fetch("http://localhost:4000/profile", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Cookie': document.cookie,
          },
          credentials: "include",
          // body: JSON.stringify({
          //   email: email,
          //   password: password,
          // }),
        });
        
        const responseData = await response.json();

      // Do something with the responseData, e.g., update UI, redirect, etc.
      console.log(responseData);

  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          {/* Profile Photo */}
          <div className="text-center mb-4">
            <img src="https://www.the-sun.com/wp-content/uploads/sites/6/2022/08/MF-Netflix-Wednesday-Cast-OFFPLAT.jpg?strip=all&quality=100&w=1920&h=1080&crop=1" alt="Profile Photo" className="img-fluid rounded-circle" style={{ width: '150px', height: '150px' }} />
          </div>
        </div>
        <div className="col-md-8">
          {/* Username */}
          <h2 className="mb-3" onClick={hclick}>Username</h2>

          {/* Movies Reviewed */}
          <div className="mb-4">
            <h4>Movies Reviewed</h4>
            <ul>
              <li>Movie 1</li>
              <li>Movie 2</li>
              <li>Movie 3</li>
              {/* Add more movies as needed */}
            </ul>
          </div>

          {/* Points Section */}
          <div>
            <h4>Points</h4>
            <p>Points: 100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
