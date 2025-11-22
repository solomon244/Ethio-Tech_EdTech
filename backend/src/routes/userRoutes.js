const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { changePasswordValidator } = require('../validators/userValidators');

const router = express.Router();

router.use(authenticate);

router.get('/me', userController.getProfile);
router.patch('/me', userController.updateProfile);

// Upload profile image
router.post('/me/profile-image', userController.uploadProfileImage);

// Change password
router.patch(
  '/me/password',
  changePasswordValidator,
  validateRequest,
  userController.changePassword
);

module.exports = router;


