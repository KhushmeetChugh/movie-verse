const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");


//to be used in firebase
const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};




// Login route handler
const login = async (req, res) => {
  // req.session.isAuth=true; 
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
      const token = jwt.sign({ email: existingUser.email, userId: existingUser.id,imgUrl:existingUser.profilePictureURL }, 'your-secret-key', { expiresIn: '1h' });

      // Set the cookie in the response header
      res.cookie('Login', token, {
        httpOnly: false,
        secure: true,
        maxAge: 3600000, // 1 hour expiration
      });

      res.json({
        uid:existingUser.id,
        imgUrl:existingUser.profilePictureURL,
        role:existingUser.role,
        message: 'Logged in'
      });
    } else {
      res.status(401).json({ message: 'Wrong password' });
    }

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error', errorType: error.constructor.name });
  }
};

// Logout route handler
const logout = (req, res) => {
  // Clear the authentication-related cookies
  res.clearCookie('user_id');
  res.clearCookie('token');
  res.clearCookie('Login');
  // Send a response to the client
  res.status(200).json({ message: 'Logout successful!' });
  // ... existing logout route logic ...
};


const uploadMiddleware = async (req, res, next) => {
  try {
    // Get the current date and time for creating a unique file name
    const dateTime = new Date().toISOString();

    // Initialize Firebase Storage
    const storage = getStorage();

    // Create a reference to the storage bucket with a unique file name
    const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file to the storage bucket
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

    // Get the public URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Store the download URL in the request object
    req.fileDownloadURL = downloadURL;

    console.log('File successfully uploaded.'+downloadURL);
    next();
  } catch (error) {
    console.error('Error in uploadMiddleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};






// Signup route handler
const signup = async (req, res) => {
  try {
    const profilePictureURL = req.fileDownloadURL; // Assuming you have the URL from the file upload middleware
    // console.log(`Profile Picture URL: ${profilePictureURL}`);

    // Destructuring user details from the request body
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePictureURL,
      role: "user",
    
    });

    await newUser.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
};



// Check email existence route handler
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email }, { timeout: false });
    res.status(200).json({ exists: !!existingUser });
  } catch (error) {
    console.error('Error checking email existence:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  // ... existing checkEmail route logic ...
};

const authenticate = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;

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
    if (!token) {
      return res.status(401).json({ message: 'No token found' });
    }


    const decodedToken = jwt.verify(token, 'your-secret-key');
    // Use decodedToken to fetch additional data from MongoDB or perform other authentication logic
    // console.log('User email:', decodedToken.email);
    // console.log('User details:', decodedToken);
    req.body = decodedToken;
    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal Server Error', errorType: error.constructor.name });
  }
};
const addWatchList = async (req, res) => {
  const { movieId } = req.body;
  
  try {
    // Extract the userId from the JWT payload in the 'Login' cookie
    const userId = getUserIdFromCookie(req);
    const initialUser = await User.findById(userId);
    const initialWatchlist = initialUser.watchList;
    if (initialWatchlist.includes(movieId)) {
      // console.log("ek kaam kitni vaar karega be")
      return res.status(400).json({ message: "Movie already present in watchlist." });
      
    }
    // console.log("userId="+userId)

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Perform database operation to add movieId to user's watchlist
    // Example code assuming you have a User model with a findByIdAndUpdate method
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { watchList: movieId } },
      { new: true }
    );
    // console.log("updatesuser"+updatedUser);
    
    if (updatedUser!=null) {
      // console.log("User updated:", updatedUser);
      // Send OK response
      res.status(201).json({message:"User updated successfully."});
    } else {
      // console.log("kuch galat ho raha hai");
      // Send message indicating that the movie is already present in the watchlist
      res.status(400).json({message:"kuch toh galat hai code mein"});
    }
    
    
    
  } catch (error) {
    console.error('Error adding movie to watchlist:', error);
    res.status(500).json({ message: 'Internal Server Error', errorType: error.constructor.name });
  }
};

// Example function to extract userId from the JWT payload in the 'Login' cookie
const getUserIdFromCookie = (req) => {
  // Get the 'Cookie' header from the request
  const cookieHeader = req.headers.cookies;

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


// Example usage



module.exports = { login, logout, signup, checkEmail, authenticate,uploadMiddleware,addWatchList};
