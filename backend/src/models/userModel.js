const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePictureURL: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  watchList:{
    type: [],
    default: null
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
