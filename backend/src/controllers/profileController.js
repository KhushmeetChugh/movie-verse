const User = require('../models/userModel');

// Profile route handler
const profile = async (req, res) => {
    const {email}=req.body;
    const isUser=await User.findOne({email});
    res.status(200).json({user:isUser});
  // ... existing profile route logic ...
};

module.exports = { profile };
