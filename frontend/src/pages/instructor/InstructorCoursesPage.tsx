import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { fetchCourses } from '../../services/courseService';
import { useAuth } from '../../hooks/useAuth';
import type { Course } from '../../types';

const InstructorCoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch all courses and filter by instructor (backend should support this)
        const data = await fetchCourses();
        // Filter courses where instructor matches current user
        const instructorCourses = data.filter(
          (course) => typeof course.instructor === 'object' && (course.instructor._id || course.instructor.id) === (user?._id || user?.id)
        );
        setCourses(instructorCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      loadCourses();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  if (courses.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p className="text-stone-500">You haven't created any courses yet.</p>
        <Button asChild>
          <Link to="/instructor/courses/create">Create your first course</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {courses.map((course) => {
        const categoryName = typeof course.category === 'object' ? course.category.name : course.category;
        return (
          <Card key={course._id || course.id} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-primary">{categoryName}</p>
                <h3 className="text-2xl font-semibold">{course.title}</h3>
              </div>
              <Button variant="secondary" asChild>
                <Link to={`/instructor/courses/${course.id}/edit`}>Edit course</Link>
              </Button>
            </div>
            <p className="text-sm text-stone-500">{course.description}</p>
            <div className="flex gap-6 text-sm">
              <p>{course.totalLessons || 0} lessons</p>
              <p>- students</p>
              <p>{course.totalDuration || 0} total hours</p>
            </div>
            <div className="flex gap-2">
              <Badge variant={course.isPublished ? 'success' : 'warning'}>
                {course.isPublished ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default InstructorCoursesPage;


