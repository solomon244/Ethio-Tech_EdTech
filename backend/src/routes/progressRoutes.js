const express = require('express');
const progressController = require('../controllers/progressController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../constants/roles');

const router = express.Router();

router.use(authenticate, authorize(USER_ROLES.STUDENT));

router.post('/', progressController.updateProgress);
router.get('/:courseId', progressController.getCourseProgress);

module.exports = router;


