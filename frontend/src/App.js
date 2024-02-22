import React, { useState, useEffect } from "react";
import Navcomp from "./components/Navbar";
import Footercomp from "./components/Footer";
import Signin from "./components/Signin.js";
import Signup from "./components/Signup";
import Carosal from "./components/Carosal";
import LogoutButton from "./components/Logout.js";
import ImageUpload from "./components/ImageUpload.js";
import Addmovies from "./components/admincomp/Addmovies.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfileSection.js";
import Adminfeed from "./components/Adminfeed.js";
import Userfeed from "./components/Userfeed.js";
import MoviePage from "./components/MoviePage.js";
import HomePage from "./components/MovieRow.js";
import Watchlist from "./components/Watchlist.js";

function App() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    // Retrieve user information from local storage on component mount
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    const storedProfileUrl = localStorage.getItem("profileUrl");

    if (storedUserId) setUserId(storedUserId);
    if (storedRole) setRole(storedRole);
    if (storedProfileUrl) setProfileUrl(storedProfileUrl);
  }, []); // Run only once on component mount

  const handleLogin = async (email, password, setToken) => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });

      const responseData = await response.json();

      setUserId(responseData.uid);
      setProfileUrl(responseData.imgUrl);
      setRole(responseData.role);

      // Store user information in local storage
      localStorage.setItem("userId", responseData.uid);
      localStorage.setItem("role", responseData.role);
      localStorage.setItem("profileUrl", responseData.imgUrl);

      if (response.ok) {
        const token = responseData.token;
        setToken(token);
        return {
          uid: responseData.uid,
          imgUrl: responseData.imgUrl,
          role: responseData.role,
        };
      } else {
        console.log(await response.text());
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <>
      <Router>
        <Navcomp userId={userId} profileUrl={profileUrl} role={role}/>
        <Routes>
          <Route path="/" element={<Carosal />} />
          <Route path="/signin" element={<Signin handleLogin={handleLogin}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addmovies" element={<Addmovies/>}/>
          <Route path="/movies" element={<HomePage />} />
          <Route path="/userfeedback" element={<Userfeed/>} />
          <Route path="/adminfeedback" element={<Adminfeed />} />
          <Route path="/imgupload" element={<ImageUpload  />} />
          <Route path="/profile/:id" element={<ProfilePage userId={userId} />} />
          <Route path="/logout" element={<LogoutButton/>} />
          <Route path="/movies/:movieId" element={<MoviePage/>} />
          <Route path="/watchlist/:userId" element={<Watchlist/>} />
        </Routes>
        <Footercomp />
      </Router>
    </>
  );
}

export default App;
