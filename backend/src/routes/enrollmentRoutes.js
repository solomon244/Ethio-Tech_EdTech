const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../constants/roles');

const router = express.Router();

router.use(authenticate);

// Student endpoints
router.post('/', authorize(USER_ROLES.STUDENT), enrollmentController.enroll);
router.get('/me', authorize(USER_ROLES.STUDENT), enrollmentController.myEnrollments);
router.get('/:enrollmentId', authorize(USER_ROLES.STUDENT), enrollmentController.getEnrollment);
router.delete('/:enrollmentId', authorize(USER_ROLES.STUDENT), enrollmentController.deleteEnrollment);

// Instructor endpoint
router.get(
  '/course/:courseId',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  enrollmentController.getCourseEnrollments
);

module.exports = router;


