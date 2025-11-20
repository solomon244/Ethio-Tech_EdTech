const slugify = require('slugify');
const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');
const AppError = require('../utils/appError');

const createCategory = async (payload) => {
  const slug = slugify(payload.name, { lower: true, strict: true });
  const category = await Category.create({
    ...payload,
    slug,
  });
  return new ApiResponse(201, 'Category created', { category });
};

const listCategories = async () => {
  const categories = await Category.find().sort('name');
  return new ApiResponse(200, 'Categories fetched', { categories });
};

const updateCategory = async (id, payload) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
  if (payload.name) {
    category.slug = slugify(payload.name, { lower: true, strict: true });
    category.name = payload.name;
  }
  if (payload.description) {
    category.description = payload.description;
  }
  if (payload.icon) {
    category.icon = payload.icon;
  }
  await category.save();
  return new ApiResponse(200, 'Category updated', { category });
};

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
};

