const Quiz = require('../models/Quiz');
const Lesson = require('../models/Lesson');
const QuizAttempt = require('../models/QuizAttempt');
const AppError = require('../utils/appError');
const ApiResponse = require('../utils/apiResponse');

const createQuiz = async (payload) => {
  const lesson = await Lesson.findById(payload.lesson).populate('course');
  if (!lesson) {
    throw new AppError('Lesson not found', 404);
  }

  const quiz = await Quiz.create(payload);
  return new ApiResponse(201, 'Quiz created', { quiz });
};

const submitQuiz = async ({ quizId, studentId, answers }) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new AppError('Quiz not found', 404);
  }

  let score = 0;
  const mappedAnswers = answers.map((answer) => {
    const question = quiz.questions[answer.questionIndex];
    const isCorrect = question?.correctAnswerIndex === answer.selectedOptionIndex;
    if (isCorrect) {
      score += 1;
    }
    return {
      ...answer,
      isCorrect,
    };
  });

  const attempt = await QuizAttempt.create({
    quiz: quiz._id,
    student: studentId,
    score,
    totalQuestions: quiz.questions.length,
    answers: mappedAnswers,
    completedAt: new Date(),
  });

  return new ApiResponse(200, 'Quiz submitted', { attempt });
};

const fetchQuizHistory = async (studentId) => {
  const attempts = await QuizAttempt.find({ student: studentId })
    .populate('quiz', 'title')
    .sort('-createdAt');

  return new ApiResponse(200, 'Quiz history fetched', { attempts });
};

module.exports = {
  createQuiz,
  submitQuiz,
  fetchQuizHistory,
};

