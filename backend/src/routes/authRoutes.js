const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const {
  registerValidator,
  loginValidator,
  refreshValidator,
  passwordResetRequestValidator,
  passwordResetValidator,
  verifyEmailValidator,
} = require('../validators/authValidators');

const router = express.Router();

router.post('/register', registerValidator, validateRequest, authController.register);
router.post('/login', loginValidator, validateRequest, authController.login);
router.post('/refresh', refreshValidator, validateRequest, authController.refresh);
router.post('/logout', refreshValidator, validateRequest, authController.logout);
router.post(
  '/forgot-password',
  passwordResetRequestValidator,
  validateRequest,
  authController.requestPasswordReset
);
router.post('/reset-password', passwordResetValidator, validateRequest, authController.resetPassword);
router.post('/verify-email/request', authenticate, authController.requestEmailVerification);
router.post('/verify-email/confirm', verifyEmailValidator, validateRequest, authController.verifyEmail);

module.exports = router;

