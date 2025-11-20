const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../constants/roles');

const router = express.Router();

router.get('/', categoryController.listCategories);

router.use(authenticate, authorize(USER_ROLES.ADMIN));

router.post('/', categoryController.createCategory);
router.patch('/:categoryId', categoryController.updateCategory);

module.exports = router;

