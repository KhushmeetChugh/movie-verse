const User = require('../models/userModel');

// Profile route handler
const profile = async (req, res) => {
  try {
    // console.log("reached"+req.params.id)
    const user = await User.findById(req.params.id);
    // console.log(user)
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { profile };
