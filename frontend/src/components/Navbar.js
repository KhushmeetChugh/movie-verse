// Navcomp.js
import React from "react";
import { Link } from "react-router-dom";
import {Navbar,Container} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

function Navcomp() {
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MovieVerse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/movies">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/feedback">
              Feedback
            </Nav.Link>
            <Nav.Link as={Link} to="/aboutus">
              About_us
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/signin">
              Signin
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
            <Nav.Link as={Link} to="/logout">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navcomp;
