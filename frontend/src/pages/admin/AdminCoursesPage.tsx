import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { featuredCourses } from '../../data/mockData';

const AdminCoursesPage = () => {
  return (
    <div className="space-y-6">
      {featuredCourses.map((course) => (
        <Card key={course.id} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-primary">{course.category}</p>
              <h3 className="text-xl font-semibold">{course.title}</h3>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary">View</Button>
              <Button variant="ghost">Archive</Button>
            </div>
          </div>
          <p className="text-sm text-stone-500">{course.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default AdminCoursesPage;

