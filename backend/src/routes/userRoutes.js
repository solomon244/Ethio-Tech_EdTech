const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.get('/me', userController.getProfile);
router.patch('/me', userController.updateProfile);

module.exports = router;

