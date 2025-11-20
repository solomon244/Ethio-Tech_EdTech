import Card from '../../components/common/Card';
import { mockEnrollments } from '../../data/mockData';

const InstructorStudentsPage = () => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-primary">Enrolled learners</p>
          <h3 className="text-xl font-display">Active students</h3>
        </div>
        <span className="text-sm font-semibold text-stone-500">{mockEnrollments.length} total</span>
      </div>
      <div className="divide-y divide-stone-100">
        {mockEnrollments.map((enrollment) => (
          <div key={enrollment.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-semibold">Student {enrollment.id}</p>
              <p className="text-xs text-stone-400">Progress {enrollment.progress}%</p>
            </div>
            <button className="text-sm font-semibold text-primary">Message</button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InstructorStudentsPage;

