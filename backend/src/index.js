const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors=require('cors')
const cookie=require('cookie')
const corsOptions = {
  origin: 'http://localhost:3000',  // Replace with your frontend URL
  credentials: true,
};


const User = require('./models/userModel.js');
const cookieParser = require('cookie-parser');
const port = 4000;
const app = express();
app.use(cors(corsOptions));
const secretKey = 'your-secret-key'; // Replace with an actual secret key

// Cookies setup
const session = require('express-session'); 
app.use(cookieParser('your-secret-key')); 
// Middleware for CORS
app.use((req, res, next) => {
  console.log("middleware executed");
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true'); // Set to 'true' to allow credentials
  next();
});
// app.use(
//   cors({
//       origin: "http://localhost:3000",
//       credentials: true
//   })
//   );

// app.use(cookieParser());

// const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    console.log(cookies)

    if (!cookies) {
      console.log("error h phir to")
      return res.status(401).json({ message: 'Unauthorized bhai' });
    }

    // Parse the cookies
    const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    // Extract the 'token' cookie
    const token = parsedCookies.token;
    console.log(parsedCookies)
    console.log("kau"+token);

    if (!token) {
      return res.status(401).json({ message: 'No token found' });
    }

    // Assuming 'your-secret-key' is the secret key used for signing the cookie
    const  decodedToken= jwt.verify(token, 'your-secret-key');

    // Use decodedToken to fetch additional data from MongoDB or perform other authentication logic
    console.log('User email:', decodedToken.email);
    console.log('User details:', decodedToken);
    req.body= decodedToken;
    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal Server Error', errorType: error.constructor.name });
  }
};

app.post('/profile',authenticate,async(req,res)=>{
  console.log("profile section"+req.body)
  const {email}=req.body;
  console.log(email)
  const isUser=await User.findOne({email});
  console.log(isUser)
  res.status(200).json({user:isUser});
})
app.use(session({
  secret: 'hello movieVerse',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: true, sameSite: 'Lax' }, // Adjust cookie options based on your needs
}));

// Middleware for JSON Parsing
app.use(express.json());


const mongoURI = 'mongodb+srv://Khushmeet:HN81zh74QFLme6q6@cluster0.jwzic4f.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true, // This line is optional, but you can keep it if needed
})

  .then(() => console.log("mongoose connected"))
  .catch(error => console.error('MongoDB connection error:', error));

  // app.get('/',(req,res)=>{
  //   req.session.isAuth=true;
  //   console.log(req.session.id);
  //   res.json({msg:"hello"})
  // })
  // Login route
  app.post('/login', async (req, res) => {
    req.session.isAuth=true; 
    try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(401).json({ message: 'Authentication failed. No user exists.' });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (isPasswordMatch) {
      // Set a cookie with the user's name
      const token = jwt.sign({ email: existingUser.email, userId: existingUser.id }, 'your-secret-key', { expiresIn: '1h' });

      // Set the cookie in the response header
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour expiration
      });
  res.json({
      message: 'Logged in'
  });
} else {
    res.status(401).json({ message: 'Wrong password' });
}

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error', errorType: error.constructor.name });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  // Clear the authentication-related cookies
  res.clearCookie('user_id');
  res.clearCookie('token');

  // Send a response to the client
  res.status(200).json({ message: 'Logout successful!' });
});

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const role = "user";
    const hashPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = new User({ username, email, password: hashPassword, role });
    await newUser.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Check email existence route
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
