const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

exports.getProfile = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, 'Profile fetched', { user: req.user }));
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ['firstName', 'lastName', 'bio', 'skills', 'socialLinks', 'profileImage'];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  res.json(new ApiResponse(200, 'Profile updated', { user }));
});

