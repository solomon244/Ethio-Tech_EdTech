import { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { fetchDashboardStats } from '../../services/adminService';
import type { DashboardStats } from '../../services/adminService';

const AdminOverviewPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const statsData = await fetchDashboardStats();
        setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard stats');
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-sm font-semibold text-stone-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-sm font-semibold text-danger">Error: {error}</p>
      </div>
    );
  }

  const insights = stats
    ? [
        { label: 'Total users', value: stats.userCount.toLocaleString(), helper: 'Registered users' },
        { label: 'Pending instructors', value: stats.instructorPending.toString(), helper: 'Awaiting review' },
        { label: 'Active courses', value: stats.courseCount.toString(), helper: `${stats.enrollmentCount} enrollments` },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {insights.map((item) => (
          <Card key={item.label} className="space-y-2">
            <p className="text-xs font-semibold uppercase text-primary">{item.label}</p>
            <p className="text-3xl font-display">{item.value}</p>
            <p className="text-xs text-stone-400">{item.helper}</p>
          </Card>
        ))}
      </div>
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-primary">Reports</p>
          <p className="text-xl font-display">Monthly performance digest</p>
        </div>
        <Button>Download PDF</Button>
      </Card>
    </div>
  );
};

export default AdminOverviewPage;


