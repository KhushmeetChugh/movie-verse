
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel.js');
const port = 4000;
const app = express();
const secretKey = 'your_secret_key';
console.log(User);

// Middleware for JSON Parsing
app.use(express.json());
app.use((req, res, next) => {
    console.log("middleware executed")
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const mongoURI = 'mongodb+srv://Khushmeet:HN81zh74QFLme6q6@cluster0.jwzic4f.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log("mongoose conneected"))

app.post('/login', async (req, res) => {
    try {
  const { email, password } = req.body;
  console.log("hey"+email+password);

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(401).json({ message: 'Authentication failed. No user exists.' });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (isPasswordMatch) {
      const token = jwt.sign({ userId: existingUser.id, username: existingUser.username }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Authentication success', data:token });
    } else {
      res.status(401).json({ message: 'Wrong password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error',errorType: error.constructor.name});
  }
});

app.post('/signup', async (req, res) => {
    try {
      const {username, email, password } = req.body;
      const role="user";
      const hashPassword= await bcrypt.hash(password,10);
  
      // Save the user to the database
      const newUser = new User({ username,email, password:hashPassword,role });
      await newUser.save();
  
      res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Signup failed' });
    }
  });
  // Add this route in your server.js
  app.post('/checkEmail', async (req, res) => {
      try {
        const { email } = req.body;
    
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
    
        res.status(200).json({ exists: !!existingUser });
      } catch (error) {
        console.error('Error checking email existence:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
