import React from "react";
import Navcomp from "./components/Navbar";
import Footercomp from "./components/Footer";
import Signin from "./components/Signin.js"
import Signup from "./components/Signup"
import Carosal from "./components/Carosal";
import MoviePage from "./components/MoviePage";

import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';  
import Profile from "./components/ProfileSection.js";
import FileUpload from "./components/AddFile.js";

function App() {
  return (
    <>
      <Navcomp /> 
      {/* <Carosal/> */}
      {/* <Signin/> */}
      {/* <Profile/> */}
      <FileUpload/>
      {/* <MoviePage/> */}

      <Footercomp/>    
    </>
  );
}

export default App;
