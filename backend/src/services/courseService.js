const slugify = require('slugify');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const AppError = require('../utils/appError');
const ApiResponse = require('../utils/apiResponse');

const createCourse = async (payload, instructorId) => {
  const slug = slugify(payload.title, { lower: true, strict: true });
  const course = await Course.create({
    ...payload,
    slug,
    instructor: instructorId,
  });

  return new ApiResponse(201, 'Course created', { course });
};

const listCourses = async (query = {}) => {
  const filters = {};
  if (query.category) {
    filters.category = query.category;
  }
  if (query.level) {
    filters.level = query.level;
  }
  if (query.isPublished !== undefined) {
    filters.isPublished = query.isPublished === 'true';
  }

  const courses = await Course.find(filters)
    .populate('instructor', 'firstName lastName')
    .populate('category', 'name');

  return new ApiResponse(200, 'Courses fetched', { courses });
};

const getCourse = async (id) => {
  const course = await Course.findById(id)
    .populate('instructor', 'firstName lastName bio')
    .populate('category', 'name description');

  if (!course) {
    throw new AppError('Course not found', 404);
  }

  const lessons = await Lesson.find({ course: course._id }).sort('order');

  return new ApiResponse(200, 'Course fetched', {
    course,
    lessons,
  });
};

const updateCourse = async (id, payload, userId) => {
  const course = await Course.findOne({ _id: id, instructor: userId });
  if (!course) {
    throw new AppError('Course not found or not authorized', 404);
  }

  Object.assign(course, payload);
  if (payload.title) {
    course.slug = slugify(payload.title, { lower: true, strict: true });
  }
  await course.save();

  return new ApiResponse(200, 'Course updated', { course });
};

const deleteCourse = async (id, userId) => {
  const course = await Course.findOne({ _id: id, instructor: userId });
  if (!course) {
    throw new AppError('Course not found or not authorized', 404);
  }

  await Lesson.deleteMany({ course: course._id });
  await course.deleteOne();

  return new ApiResponse(200, 'Course removed');
};

module.exports = {
  createCourse,
  listCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};

