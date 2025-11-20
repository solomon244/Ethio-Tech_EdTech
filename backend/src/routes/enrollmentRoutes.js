const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../constants/roles');

const router = express.Router();

router.use(authenticate);

router.post('/', authorize(USER_ROLES.STUDENT), enrollmentController.enroll);
router.get('/me', authorize(USER_ROLES.STUDENT), enrollmentController.myEnrollments);

module.exports = router;

