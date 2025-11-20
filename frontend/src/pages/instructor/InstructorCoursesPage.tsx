import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { featuredCourses } from '../../data/mockData';

const InstructorCoursesPage = () => {
  return (
    <div className="space-y-6">
      {featuredCourses.map((course) => (
        <Card key={course.id} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-primary">{course.category}</p>
              <h3 className="text-2xl font-semibold">{course.title}</h3>
            </div>
            <Button variant="secondary">Edit course</Button>
          </div>
          <p className="text-sm text-stone-500">{course.description}</p>
          <div className="flex gap-6 text-sm">
            <p>{course.stats.lessons} lessons</p>
            <p>{course.stats.students} students</p>
            <p>{course.stats.duration} total hours</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InstructorCoursesPage;

