const asyncHandler = require('../utils/asyncHandler');
const enrollmentService = require('../services/enrollmentService');

exports.enroll = asyncHandler(async (req, res) => {
  const response = await enrollmentService.enrollStudent({
    courseId: req.body.courseId,
    studentId: req.user.id,
  });
  res.status(response.statusCode).json(response);
});

exports.myEnrollments = asyncHandler(async (req, res) => {
  const response = await enrollmentService.listEnrollments(req.user.id);
  res.status(response.statusCode).json(response);
});

