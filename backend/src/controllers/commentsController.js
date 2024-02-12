const jwt = require('jsonwebtoken');
const Comment = require('../models/CommentsModel');

// Function to handle adding a new comment
const addComment = async (req, res) => {
  const { movieId } = req.params;
  const { comment } = req.body;
  const userId = getUserIdFromCookie(req);
//   console.log(`movieId${movieId} comments ${comment}  userId ${userId}`);

  try {
    // Extract JWT token from the request headers
    

    // Create a new comment using the Comment model
    const newComment = new Comment({
      movie_id: movieId,
      user_id: userId, // Assuming you have a valid user ID in the JWT token
      comment_text: comment,
    });

    // Save the new comment to the database
    const savedComment = await newComment.save();
    
    // Send the response with the saved comment
    res.status(201).json({ success: true, newComment: savedComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getMovieComments= async (req, res) => {
    // console.log("GetMovieComments");
    try {
      const { movie_id } = req.body;
      // Find all comments with the specified movie_id
      const comments = await Comment.find({ movie_id });
    //   console.log(`comments=${comments}`)
      res.json({ comments });
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getUserIdFromCookie = (req) => {
    // Get the 'Cookie' header from the request
    const cookieHeader = req.headers.cookies;
    // console.log(`cookieheader=${cookieHeader}`)
  
    if (!cookieHeader) {
      return null;
    }
  
    // Split the 'Cookie' header string into individual cookies
    const cookies = cookieHeader.split(';');
  
    // Find the cookie containing the JWT
    const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('Login='));
  
    if (!jwtCookie) {
      return null;
    }
  
    // Extract the JWT from the cookie
    const token = jwtCookie.split('=')[1];
    // console.log("tok"+token);
  
    try {
      // Verify the JWT
      const decoded = jwt.verify(token, 'your-secret-key');
  
      // Extract the user ID from the decoded JWT payload
      const userId = decoded.userId;
  
      return userId;
    } catch (error) {
      console.error('Error verifying JWT:', error);
      return null;
    }
  };

module.exports = {
  addComment,
  getMovieComments
};
