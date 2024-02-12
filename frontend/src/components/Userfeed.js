import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../index.css";

const UserFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the submission logic here
    // console.log("User feedback submitted:", feedback);
    // Clear the feedback field after submission if needed
    setFeedback("");
    // You can navigate the user or show a thank you message
    navigate("/thank-you");
  };

  return (
    <div>
      <h2>your Feedback</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="feedbackForm.ControlTextarea">
          <Form.Control
            as="textarea"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Feedback
        </Button>
      </Form>
    </div>
  );
};

export default UserFeedback;
