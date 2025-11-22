import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import Badge from '../../components/common/Badge';
import { fetchCourse } from '../../services/courseService';
import { enrollInCourse } from '../../services/enrollmentService';
import type { Course, Lesson } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCourse(courseId);
        setCourse(data.course);
        setLessons(data.lessons);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course');
        console.error('Failed to load course:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!courseId || !user) {
      navigate('/login');
      return;
    }
    try {
      setEnrolling(true);
      await enrollInCourse(courseId);
      navigate('/student/courses');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">Loading course...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center text-red-600">Error: {error || 'Course not found'}</div>
      </div>
    );
  }

  const categoryName = typeof course.category === 'object' ? course.category.name : course.category;
  const instructorName = typeof course.instructor === 'object' 
    ? `${course.instructor.firstName} ${course.instructor.lastName}`
    : course.instructor?.name || 'Unknown Instructor';

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-primary/80">
            <Badge variant="info">{categoryName}</Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
            <Badge variant="success">{course.level}</Badge>
          </div>
          <h1 className="text-4xl font-display font-semibold">{course.title}</h1>
          <p className="text-stone-500">{course.description}</p>
          <img src={course.thumbnailUrl || '/placeholder-course.jpg'} alt={course.title} className="h-80 w-full rounded-3xl object-cover" />
          {lessons.length > 0 && (
            <div className="grid gap-6 md:grid-cols-3">
              {lessons.slice(0, 3).map((lesson) => (
                <Card key={lesson.id} className="space-y-2 bg-stone-50">
                  <p className="text-xs font-semibold uppercase text-stone-400">{lesson.duration || 'N/A'}</p>
                  <p className="text-sm font-semibold text-stone-700">{lesson.title}</p>
                  <ProgressBar value={0} />
                </Card>
              ))}
            </div>
          )}
        </Card>
        <Card className="space-y-6 bg-primary/5">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Instructor</p>
            <h3 className="text-2xl font-display text-stone-900">{instructorName}</h3>
            {typeof course.instructor === 'object' && course.instructor.bio && (
              <p className="text-sm text-stone-500">{course.instructor.bio}</p>
            )}
          </div>
          <ul className="space-y-3 text-sm text-stone-600">
            <li>• Live sessions, office hours, and peer review checkpoints.</li>
            <li>• Applied capstone solving Ethiopian education challenges.</li>
            <li>• Micro-internships with partner companies.</li>
          </ul>
          <Button fullWidth className="py-3 text-base" onClick={handleEnroll} disabled={enrolling}>
            {enrolling ? 'Enrolling...' : 'Enroll now'}
          </Button>
          <Button asChild variant="secondary" fullWidth className="py-3 text-base">
            <Link to="/contact">Talk to an advisor</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetailPage;


