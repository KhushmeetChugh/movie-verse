const express = require("express");
const mongoose = require("mongoose");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const multer = require("multer");
// Import controllers
const authController = require('./controllers/authController');
const profileController = require('./controllers/profileController');

// Initialize Firebase
const firebaseConfig = require("./config/firebase-config");
initializeApp(firebaseConfig);

// Create Express app
const app = express();
const port = 4000;

// Connect to MongoDB
const mongoURI = 'mongodb+srv://Khushmeet:HN81zh74QFLme6q6@cluster0.jwzic4f.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend URL
  credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('your-secret-key'));

app.use(session({
  secret: 'hello movieVerse',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: true, sameSite: 'Lax' }, // Adjust cookie options based on your needs
}));

app.use(express.json({ limit: '500mb' }));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });
// Routes
app.post('/login', authController.login);
app.post('/logout', authController.logout);
app.post('/signup',  upload.single('file'),authController.uploadMiddleware, authController.signup);
app.post('/checkEmail', authController.checkEmail);
app.post('/profile', authController.authenticate, profileController.profile);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
