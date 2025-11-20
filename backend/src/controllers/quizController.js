const asyncHandler = require('../utils/asyncHandler');
const quizService = require('../services/quizService');

exports.createQuiz = asyncHandler(async (req, res) => {
  const response = await quizService.createQuiz(req.body);
  res.status(response.statusCode).json(response);
});

exports.submitQuiz = asyncHandler(async (req, res) => {
  const response = await quizService.submitQuiz({
    quizId: req.params.quizId,
    studentId: req.user.id,
    answers: req.body.answers,
  });
  res.status(response.statusCode).json(response);
});

exports.quizHistory = asyncHandler(async (req, res) => {
  const response = await quizService.fetchQuizHistory(req.user.id);
  res.status(response.statusCode).json(response);
});

