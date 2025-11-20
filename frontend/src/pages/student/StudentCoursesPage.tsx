import Card from '../../components/common/Card';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';
import { featuredCourses, mockEnrollments } from '../../data/mockData';

const StudentCoursesPage = () => {
  return (
    <div className="space-y-6">
      {mockEnrollments.map((enrollment) => {
        const course = featuredCourses.find((item) => item.id === enrollment.courseId)!;
        return (
          <Card key={enrollment.id} className="flex flex-col gap-6 md:flex-row">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="h-40 w-full rounded-2xl object-cover md:w-64"
            />
            <div className="flex flex-1 flex-col gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-primary">{course.category}</p>
                <h3 className="text-2xl font-display font-semibold">{course.title}</h3>
                <p className="text-sm text-stone-500">{course.description}</p>
              </div>
              <ProgressBar value={enrollment.progress} label="Course progress" />
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary">Open curriculum</Button>
                <Button>Resume lesson</Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StudentCoursesPage;

