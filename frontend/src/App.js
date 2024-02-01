import React from "react";
import Navcomp from "./components/Navbar";
import Footercomp from "./components/Footer";
import Signin from "./components/Signin.js";
import Signup from "./components/Signup";
import Carosal from "./components/Carosal";
import MoviePage from "./components/MoviePage";
import Profile from "./components/ProfileSection.js";
import LogoutButton from "./components/Logout.js";
import ImageUpload from "./components/ImageUpload.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <Navcomp />
        <Routes>
          <Route path="/" element={<Carosal />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<ImageUpload  />} />
          <Route path="/imageUpload" element={<ImageUpload />} />
        </Routes>
        <Footercomp />
      </Router>
    </>
  );
}

export default App;
