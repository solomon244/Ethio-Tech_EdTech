import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { fetchCourses } from '../../services/courseService';
import { fetchCategories } from '../../services/categoryService';
import type { Course, Category } from '../../types';

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [coursesData, categoriesData] = await Promise.all([fetchCourses(), fetchCategories()]);
        setCourses(coursesData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };
    loadCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-sm font-semibold text-stone-500">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-sm font-semibold text-danger">Error: {error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-sm font-semibold text-stone-500">No courses found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {courses.map((course) => {
        const categoryName =
          typeof course.category === 'string'
            ? course.category
            : categories.find((c) => c.id === course.category)?.name || 'Uncategorized';
        return (
          <Card key={course.id} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-primary">{categoryName}</p>
                <h3 className="text-xl font-semibold">{course.title}</h3>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="secondary">
                  <Link to={`/courses/${course.id}`}>View</Link>
                </Button>
                <Button variant="ghost">Archive</Button>
              </div>
            </div>
            <p className="text-sm text-stone-500">{course.description}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminCoursesPage;


