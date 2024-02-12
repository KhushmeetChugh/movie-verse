const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Comment schema
const commentSchema = new Schema({
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment_text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
