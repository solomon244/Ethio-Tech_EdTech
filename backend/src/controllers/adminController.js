const asyncHandler = require('../utils/asyncHandler');
const adminService = require('../services/adminService');

exports.dashboardStats = asyncHandler(async (req, res) => {
  const response = await adminService.dashboardStats();
  res.status(response.statusCode).json(response);
});

exports.listUsers = asyncHandler(async (req, res) => {
  const response = await adminService.listUsers();
  res.status(response.statusCode).json(response);
});

exports.updateInstructorStatus = asyncHandler(async (req, res) => {
  const response = await adminService.updateInstructorStatus({
    instructorId: req.params.instructorId,
    status: req.body.status,
  });
  res.status(response.statusCode).json(response);
});

