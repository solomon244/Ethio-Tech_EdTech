const express = require('express');
const quizController = require('../controllers/quizController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../constants/roles');

const router = express.Router();

router.use(authenticate);

router.post('/', authorize(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN), quizController.createQuiz);
router.post('/:quizId/submit', authorize(USER_ROLES.STUDENT), quizController.submitQuiz);
router.get('/history/me', authorize(USER_ROLES.STUDENT), quizController.quizHistory);

module.exports = router;

