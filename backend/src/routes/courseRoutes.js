const express = require('express');
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../constants/roles');
const validateRequest = require('../middleware/validateRequest');
const {
  createCourseValidator,
  updateCourseValidator,
  createLessonValidator,
} = require('../validators/courseValidators');

const router = express.Router();

router.get('/', courseController.listCourses);
router.get('/:courseId', courseController.getCourse);

router.use(authenticate);

router.post(
  '/',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  createCourseValidator,
  validateRequest,
  courseController.createCourse
);
router.patch(
  '/:courseId',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  updateCourseValidator,
  validateRequest,
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
  createLessonValidator,
  validateRequest,
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

// Publish/Unpublish course
router.patch(
  '/:courseId/publish',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  courseController.publishCourse
);

// Upload course thumbnail
router.post(
  '/:courseId/thumbnail',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  courseController.uploadThumbnail
);

// Upload lesson video
router.post(
  '/lessons/:lessonId/video',
  authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN),
  courseController.uploadLessonVideo
);

module.exports = router;


