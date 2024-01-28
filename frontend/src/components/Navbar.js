import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "react-bootstrap/esm/NavLink";

function Navcomp() {
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="#home">MovieVerse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink as={NavLink} to="/">
              Home
            </NavLink>
            <NavLink as={NavLink} to="/movies">
              Movies
            </NavLink>
            <NavLink as={NavLink} to="/blogs">
              Blogs
            </NavLink>
            <NavLink as={NavLink} to="/feedback">
              Feedback
            </NavLink>
            <NavLink as={NavLink} to="/aboutus">
              About_us
            </NavLink>
          </Nav>
          <Nav>
            <NavLink as={NavLink} to="/signin">
              Signin
            </NavLink>
            <NavLink as={NavLink} to="/signup">
              Signup
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navcomp;
