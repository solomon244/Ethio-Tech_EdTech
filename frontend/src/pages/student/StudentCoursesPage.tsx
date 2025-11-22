import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';
import { fetchMyEnrollments } from '../../services/enrollmentService';
import { fetchCourseProgress } from '../../services/progressService';
import type { Enrollment, Progress } from '../../types';

const StudentCoursesPage = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, Progress[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const enrollmentsData = await fetchMyEnrollments();
        setEnrollments(enrollmentsData);

        // Load progress for each course
        const progressPromises = enrollmentsData.map((enrollment) => {
          const courseId = typeof enrollment.course === 'object' ? (enrollment.course._id || enrollment.course.id) : enrollment.course;
          return fetchCourseProgress(courseId).then((progress) => ({ courseId, progress }));
        });
        const progressResults = await Promise.all(progressPromises);
        const progressMapData: Record<string, Progress[]> = {};
        progressResults.forEach(({ courseId, progress }) => {
          progressMapData[courseId] = progress;
        });
        setProgressMap(progressMapData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load enrollments');
        console.error('Failed to load enrollments:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const calculateProgress = (courseId: string): number => {
    const progress = progressMap[courseId] || [];
    if (progress.length === 0) return 0;
    const completed = progress.filter((p) => p.status === 'completed').length;
    return Math.round((completed / progress.length) * 100);
  };

  if (loading) {
    return <div className="text-center">Loading your courses...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  if (enrollments.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p className="text-stone-500">You haven't enrolled in any courses yet.</p>
        <Button asChild>
          <Link to="/courses">Browse courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {enrollments.map((enrollment) => {
        const course = typeof enrollment.course === 'object' ? enrollment.course : null;
        if (!course) return null;
        const courseId = course.id;
        const progress = calculateProgress(courseId);
        const categoryName = typeof course.category === 'object' ? course.category.name : course.category;

        return (
          <Card key={enrollment._id || enrollment.id} className="flex flex-col gap-6 md:flex-row">
            <img
              src={course.thumbnailUrl || '/placeholder-course.jpg'}
              alt={course.title}
              className="h-40 w-full rounded-2xl object-cover md:w-64"
            />
            <div className="flex flex-1 flex-col gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-primary">{categoryName}</p>
                <h3 className="text-2xl font-display font-semibold">{course.title}</h3>
                <p className="text-sm text-stone-500">{course.description}</p>
              </div>
              <ProgressBar value={progress} label="Course progress" />
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" asChild>
                  <Link to={`/courses/${courseId}`}>Open curriculum</Link>
                </Button>
                <Button asChild>
                  <Link to={`/courses/${courseId}`}>Resume lesson</Link>
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StudentCoursesPage;


