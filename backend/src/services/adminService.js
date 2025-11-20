const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const ApiResponse = require('../utils/apiResponse');
const AppError = require('../utils/appError');
const { USER_ROLES } = require('../constants/roles');

const dashboardStats = async () => {
  const [userCount, instructorPending, courseCount, enrollmentCount] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ 'instructorProfile.status': 'pending' }),
    Course.countDocuments(),
    Enrollment.countDocuments(),
  ]);

  return new ApiResponse(200, 'Admin stats', {
    stats: {
      userCount,
      instructorPending,
      courseCount,
      enrollmentCount,
    },
  });
};

const listUsers = async () => {
  const users = await User.find().sort('-createdAt');
  return new ApiResponse(200, 'Users fetched', { users });
};

const updateInstructorStatus = async ({ instructorId, status }) => {
  if (!['approved', 'rejected'].includes(status)) {
    throw new AppError('Invalid status', 400);
  }

  const user = await User.findOneAndUpdate(
    { _id: instructorId, role: USER_ROLES.INSTRUCTOR },
    { 'instructorProfile.status': status },
    { new: true }
  );

  if (!user) {
    throw new AppError('Instructor not found', 404);
  }

  return new ApiResponse(200, `Instructor ${status}`, { user });
};

module.exports = {
  dashboardStats,
  listUsers,
  updateInstructorStatus,
};

