const express = require('express');
const quizController = require('../controllers/quizController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../constants/roles');

const router = express.Router();

router.use(authenticate);

// Get quiz by lesson (any authenticated user)
router.get('/lesson/:lessonId', quizController.getQuizByLesson);

// Get quiz details (any authenticated user)
router.get('/:quizId', quizController.getQuiz);

// Create quiz (instructor/admin)
router.post('/', authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN), quizController.createQuiz);

// Update quiz (instructor/admin)
router.patch('/:quizId', authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN), quizController.updateQuiz);

// Delete quiz (instructor/admin)
router.delete('/:quizId', authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN), quizController.deleteQuiz);

// Get quiz attempts (instructor/admin)
router.get('/:quizId/attempts', authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN), quizController.getQuizAttempts);

// Submit quiz (student)
router.post('/:quizId/submit', authorize(USER_ROLES.STUDENT), quizController.submitQuiz);

// Get quiz history (student)
router.get('/history/me', authorize(USER_ROLES.STUDENT), quizController.quizHistory);

module.exports = router;


