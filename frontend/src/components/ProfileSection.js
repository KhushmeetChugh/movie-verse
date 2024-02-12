import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "./ind"; // Import the CSS file for styling

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const checkCookies = async () => {
      const cookies = document.cookie;
      if (!cookies.includes("Login")) {
        setShowProfile(false);
        return;
      }

      fetchUser();
    };

    const fetchUser = async () => {
      if (!userId) {
        console.error("User ID is not available");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${userId}`
        );
        const data = await response.json();
        setUser(data);
        setShowProfile(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkCookies();
  }, [userId]);

  const handleCardClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 1) {
      setShowProfile((prevShowProfile) => !prevShowProfile);
    }

    setTimeout(() => setClickCount(0), 300);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <Col md={6}>
          {showProfile && (
            <Card onClick={handleCardClick}>
              <Card.Img variant="top" src={user?.profilePictureURL} />
              <Card.Body>
                <Card.Title>{user?.username}</Card.Title>
                <Card.Text>Email: {user?.email}</Card.Text>
                <Card.Text>Role: {user?.role}</Card.Text>
                <Link to={`/watchlist/${userId}`} className="watchlist-link">
                  My Watchlist
                </Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
