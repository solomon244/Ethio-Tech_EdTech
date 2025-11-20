import { Link, useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import Badge from '../../components/common/Badge';
import { featuredCourses } from '../../data/mockData';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const course = featuredCourses.find((item) => item.id === courseId) ?? featuredCourses[0];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-primary/80">
            <Badge variant="info">{course.category}</Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
            <Badge variant="success" key="level">
              {course.level}
            </Badge>
          </div>
          <h1 className="text-4xl font-display font-semibold">{course.title}</h1>
          <p className="text-stone-500">{course.description}</p>
          <img src={course.thumbnailUrl} alt={course.title} className="h-80 w-full rounded-3xl object-cover" />
          <div className="grid gap-6 md:grid-cols-3">
            {course.lessons.slice(0, 3).map((lesson) => (
              <Card key={lesson.id} className="space-y-2 bg-stone-50">
                <p className="text-xs font-semibold uppercase text-stone-400">{lesson.duration}</p>
                <p className="text-sm font-semibold text-stone-700">{lesson.title}</p>
                <ProgressBar value={70} />
              </Card>
            ))}
          </div>
        </Card>
        <Card className="space-y-6 bg-primary/5">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Instructor</p>
            <h3 className="text-2xl font-display text-stone-900">{course.instructor.name}</h3>
            <p className="text-sm text-stone-500">{course.instructor.title}</p>
          </div>
          <ul className="space-y-3 text-sm text-stone-600">
            <li>• Live sessions, office hours, and peer review checkpoints.</li>
            <li>• Applied capstone solving Ethiopian education challenges.</li>
            <li>• Micro-internships with partner companies.</li>
          </ul>
          <Button fullWidth className="py-3 text-base">Enroll now</Button>
          <Button asChild variant="secondary" fullWidth className="py-3 text-base">
            <Link to="/contact">Talk to an advisor</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetailPage;

