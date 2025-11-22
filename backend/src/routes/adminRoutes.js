const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../constants/roles');

const router = express.Router();

router.use(authenticate, authorize(USER_ROLES.ADMIN));

router.get('/stats', adminController.dashboardStats);
router.get('/users', adminController.listUsers);
router.get('/users/:userId', adminController.getUser);
router.patch('/users/:userId', adminController.updateUser);
router.delete('/users/:userId', adminController.deleteUser);
router.patch('/instructors/:instructorId', adminController.updateInstructorStatus);

module.exports = router;


