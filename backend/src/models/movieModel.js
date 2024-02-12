const mongoose = require('mongoose');

// Define the schema for the Movies model
const movieSchema = new mongoose.Schema({
    Mname: {
        type: String,
        required: true,
        trim: true // Remove any leading or trailing whitespace
    },
    genre_ids: {
        type: [String], // Assuming genre_ids are strings
        default: [] // Default value for genre_ids as an empty array
    },
    type: {
        type: String,
        default: 'Stockimg',
        lowercase: true // Convert type to lowercase
    },
    rating: {
        type: Number,
        min: 0, // Minimum rating value
        max: 10 // Maximum rating value
    },
    M_url: String,
    Adult: {
        type: Boolean,
        default: false // Default value for Adult as false
    },
    Overview: String,
    Popularity: Number,
    Release_date: Date,
    Upvotes: {
        type: Number,
        default: 0 // Default value for Upvotes as 0
    },
    Downvotes: {
        type: Number,
        default: 0 // Default value for Downvotes as 0
    },
    Original_language: String,
    Trailer_url: String // New field for storing the trailer URL
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Movies model
const Movies = mongoose.model('Movies', movieSchema);

module.exports = Movies;
