import Card from '../../components/common/Card';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';
import StatCard from '../../components/common/StatCard';
import { heroStats, mockEnrollments, featuredCourses } from '../../data/mockData';

const StudentOverviewPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {heroStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-primary">Continue learning</p>
            <h3 className="text-xl font-display">Resume where you left off</h3>
          </div>
          <Button variant="secondary">View all</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {mockEnrollments.map((enrollment) => {
            const course = featuredCourses.find((item) => item.id === enrollment.courseId)!;
            return (
              <div key={enrollment.id} className="rounded-2xl border border-stone-100 p-4">
                <p className="text-sm font-semibold text-stone-900">{course.title}</p>
                <p className="text-xs text-stone-400">Last lesson: {enrollment.lastLesson}</p>
                <div className="mt-4">
                  <ProgressBar value={enrollment.progress} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default StudentOverviewPage;

