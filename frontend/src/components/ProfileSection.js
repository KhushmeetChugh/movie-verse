import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card,Button } from "react-bootstrap";

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLogout = async () => {
    try {
      // Perform a fetch to the /logout route on your server
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include", // Include credentials for sending cookies
      });
  
      if (response.ok) {
        // Handle successful logout, e.g., redirect the user
        console.log("Logout successful!");
  
        // Refresh the page and go to the home page
        window.location.href = "/";
      } else {
        // Handle failed logout, e.g., display an error message
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  useEffect(() => {
    const checkCookies = () => {
      const cookies = document.cookie;
      console.log(cookies);
      // Example: Check for a cookie named "your_cookie_name"
      if (!cookies.includes("Login")) {
        // Cookie not present, handle accordingly (prevent fetching user profile)
        console.error("Cookies are not present");
        setShowProfile(false);
        return;
      } else {
        console.log("cokkies found");
      }
      // Continue with fetching user profile if cookies are present
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
        setShowProfile(true); // Display the profile when user data is available
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkCookies();
  }, [userId]);

  const handleCardClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    // Toggle the profile visibility on a single press
    if (clickCount === 1) {
      setShowProfile((prevShowProfile) => !prevShowProfile);
    }

    // Reset click count after a short delay
    setTimeout(() => setClickCount(0), 300);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          {showProfile && (
            <Card onClick={handleCardClick}>
              <Card.Img variant="top" src={user?.profilePictureURL} />
              <Card.Body>
                <Card.Title>{user?.username}</Card.Title>
                <Card.Text>Emaile: {user?.email}</Card.Text>
                <Card.Text>Role: {user?.role}</Card.Text>
                <Button className="danger" onClick={handleLogout}>Logout</Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
