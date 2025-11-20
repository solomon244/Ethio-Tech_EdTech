const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const ApiResponse = require('../utils/apiResponse');
const AppError = require('../utils/appError');

const enrollStudent = async ({ courseId, studentId }) => {
  const course = await Course.findById(courseId);
  if (!course || !course.isPublished) {
    throw new AppError('Course not available', 400);
  }

  const enrollment = await Enrollment.findOneAndUpdate(
    { course: courseId, student: studentId },
    { status: 'active' },
    { new: true, upsert: true }
  );

  return new ApiResponse(200, 'Enrollment successful', { enrollment });
};

const listEnrollments = async (studentId) => {
  const enrollments = await Enrollment.find({ student: studentId })
    .populate('course')
    .sort('-createdAt');

  return new ApiResponse(200, 'Enrollments fetched', { enrollments });
};

module.exports = {
  enrollStudent,
  listEnrollments,
};

