import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavLink from "react-bootstrap/esm/NavLink";
import {
  FaGithub,
  FaInstagram,
  FaMailBulk,
  FaMobile,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
const styles = {
  body: {
    overflowX: "hidden",
  },
};

function Footercomp() {
  return (
    <div className="bg-dark text-light" style={styles.body}>
      <Row>
        <Col xs={12} md={4}>
          <h4 style={{ textDecoration: 'underline' }}>About_us</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum tempore id harum eum inventore? Quisquam maxime facere
            rem aspernatur a provident, nesciunt quia voluptatum, ipsa explicabo
            cupiditate? Illum, ipsam eveniet.
          </p>
          <div style={{ display: 'flex' }}>
            <NavLink as={NavLink} to="/blogs" style={{ marginLeft: '0px', color: 'red' }}>
              <FaInstagram />
            </NavLink>
            <NavLink as={NavLink} to="/blogs" style={{ marginLeft: '0px', color: 'blue' }}>
              <FaTwitter />
            </NavLink>
            <NavLink as={NavLink} to="/blogs" style={{ marginLeft: '0px', color: 'blue' }}>
              <FaGithub />
            </NavLink>
            <NavLink as={NavLink} to="/blogs" style={{ marginLeft: '0px', color: 'red' }}>
              <FaYoutube />
            </NavLink>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div style={{ fontSize: '14px' }}>
            <h4 style={{ textDecoration: 'underline' }}>QuickLinks</h4>
            <NavLink as={NavLink} to="/blogs">
              About_us
            </NavLink>
            <NavLink as={NavLink} to="/blogs">
              FAQs
            </NavLink>
            <NavLink as={NavLink} to="/blogs">
              Terms & Conditions
            </NavLink>
            <NavLink as={NavLink} to="/blogs">
              Help
            </NavLink>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <h4 style={{ textDecoration: 'underline' }}>Contacts_Info</h4>
          <NavLink as={NavLink} to="/blogs">
            <FaMobile /> 100034394889
          </NavLink>
          <NavLink as={NavLink} to="/blogs">
            <FaMailBulk /> movievers@gmail.com
          </NavLink>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-center">
          <div>All rights are reserved to MovieVerse @ 2023</div>
        </Col>
      </Row>
    </div>
  );
}

export default Footercomp;
