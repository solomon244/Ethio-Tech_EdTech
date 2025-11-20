const asyncHandler = require('../utils/asyncHandler');
const courseService = require('../services/courseService');
const lessonService = require('../services/lessonService');

exports.createCourse = asyncHandler(async (req, res) => {
  const response = await courseService.createCourse(req.body, req.user.id);
  res.status(response.statusCode).json(response);
});

exports.listCourses = asyncHandler(async (req, res) => {
  const response = await courseService.listCourses(req.query);
  res.status(response.statusCode).json(response);
});

exports.getCourse = asyncHandler(async (req, res) => {
  const response = await courseService.getCourse(req.params.courseId);
  res.status(response.statusCode).json(response);
});

exports.updateCourse = asyncHandler(async (req, res) => {
  const response = await courseService.updateCourse(req.params.courseId, req.body, req.user.id);
  res.status(response.statusCode).json(response);
});

exports.deleteCourse = asyncHandler(async (req, res) => {
  const response = await courseService.deleteCourse(req.params.courseId, req.user.id);
  res.status(response.statusCode).json(response);
});

exports.createLesson = asyncHandler(async (req, res) => {
  const response = await lessonService.createLesson(
    { ...req.body, course: req.params.courseId },
    req.user.id
  );
  res.status(response.statusCode).json(response);
});

exports.updateLesson = asyncHandler(async (req, res) => {
  const response = await lessonService.updateLesson(req.params.lessonId, req.body, req.user.id);
  res.status(response.statusCode).json(response);
});

exports.deleteLesson = asyncHandler(async (req, res) => {
  const response = await lessonService.deleteLesson(req.params.lessonId, req.user.id);
  res.status(response.statusCode).json(response);
});

