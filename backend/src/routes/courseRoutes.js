const express = require('express');
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../constants/roles');

const router = express.Router();

router.get('/', courseController.listCourses);
router.get('/:courseId', courseController.getCourse);

router.use(authenticate);

router.post('/', authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN), courseController.createCourse);
router.patch(
  '/:courseId',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  courseController.updateCourse
);
router.delete(
  '/:courseId',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  courseController.deleteCourse
);

router.post(
  '/:courseId/lessons',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  courseController.createLesson
);
router.patch(
  '/lessons/:lessonId',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  courseController.updateLesson
);
router.delete(
  '/lessons/:lessonId',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  courseController.deleteLesson
);

module.exports = router;

