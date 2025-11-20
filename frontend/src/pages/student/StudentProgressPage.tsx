import Card from '../../components/common/Card';
import ProgressBar from '../../components/common/ProgressBar';
import { mockEnrollments, featuredCourses } from '../../data/mockData';

const StudentProgressPage = () => {
  const averageProgress =
    mockEnrollments.reduce((sum, enrollment) => sum + enrollment.progress, 0) / mockEnrollments.length;

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase text-primary">Overall performance</p>
          <p className="text-4xl font-display">{Math.round(averageProgress)}%</p>
          <p className="text-sm text-stone-500">Average completion rate across all enrollments.</p>
        </div>
        <ProgressBar value={Math.round(averageProgress)} />
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {mockEnrollments.map((enrollment) => {
          const course = featuredCourses.find((item) => item.id === enrollment.courseId)!;
          return (
            <Card key={enrollment.id} className="space-y-4">
              <h3 className="text-xl font-semibold text-stone-900">{course.title}</h3>
              <p className="text-sm text-stone-500">Updated {new Date(enrollment.updatedAt).toLocaleDateString()}</p>
              <ProgressBar value={enrollment.progress} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StudentProgressPage;

