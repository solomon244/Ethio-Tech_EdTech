import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import { fetchCourseEnrollments } from '../../services/enrollmentService';
import { fetchCourseProgress } from '../../services/progressService';
import type { Enrollment, Progress } from '../../types';

const InstructorStudentsPage = () => {
  const { courseId } = useParams();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, Progress[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        setError(null);
        const enrollmentsData = await fetchCourseEnrollments(courseId);
        setEnrollments(enrollmentsData);

        // Load progress for each student
        const progressPromises = enrollmentsData.map((enrollment) => {
          const studentId = typeof enrollment.student === 'object' ? (enrollment.student._id || enrollment.student.id) : enrollment.student;
          return fetchCourseProgress(courseId).then((progress) => {
            const studentProgress = progress.filter(
              (p) => typeof p.student === 'object' && (p.student._id || p.student.id) === studentId
            );
            return { studentId, progress: studentProgress };
          });
        });
        const progressResults = await Promise.all(progressPromises);
        const progressMapData: Record<string, Progress[]> = {};
        progressResults.forEach(({ studentId, progress }) => {
          progressMapData[studentId] = progress;
        });
        setProgressMap(progressMapData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load students');
        console.error('Failed to load students:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [courseId]);

  const calculateProgress = (studentId: string): number => {
    const progress = progressMap[studentId] || [];
    if (progress.length === 0) return 0;
    const completed = progress.filter((p) => p.status === 'completed').length;
    return Math.round((completed / progress.length) * 100);
  };

  if (loading) {
    return <div className="text-center">Loading students...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-primary">Enrolled learners</p>
          <h3 className="text-xl font-display">Active students</h3>
        </div>
        <span className="text-sm font-semibold text-stone-500">{enrollments.length} total</span>
      </div>
      {enrollments.length === 0 ? (
        <div className="text-center text-stone-500 py-8">No students enrolled yet.</div>
      ) : (
        <div className="divide-y divide-stone-100">
          {enrollments.map((enrollment) => {
            const student = typeof enrollment.student === 'object' ? enrollment.student : null;
            if (!student) return null;
            const progress = calculateProgress(student._id || student.id);

            return (
              <div key={enrollment._id || enrollment.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-semibold">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-xs text-stone-400">Progress {progress}%</p>
                </div>
                <button className="text-sm font-semibold text-primary">Message</button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default InstructorStudentsPage;


