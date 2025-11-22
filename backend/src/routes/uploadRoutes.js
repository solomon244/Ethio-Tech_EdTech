const express = require('express');
const uploadController = require('../controllers/uploadController');
const { authenticate } = require('../middleware/authMiddleware');
const {
  handleProfileImageUpload,
  handleThumbnailUpload,
  handleVideoUpload,
  handleResourceUpload,
} = require('../middleware/uploadMiddleware');

const router = express.Router();

// All upload routes require authentication
router.use(authenticate);

// Profile image upload
router.post('/profile-image', handleProfileImageUpload, uploadController.uploadProfileImage);

// Course thumbnail upload
router.post('/thumbnail', handleThumbnailUpload, uploadController.uploadThumbnail);

// Video upload
router.post('/video', handleVideoUpload, uploadController.uploadVideo);

// Resource upload (PDF, DOC, etc.)
router.post('/resource', handleResourceUpload, uploadController.uploadResource);

module.exports = router;

