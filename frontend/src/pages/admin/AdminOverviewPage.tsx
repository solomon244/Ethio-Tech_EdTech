import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const AdminOverviewPage = () => {
  const insights = [
    { label: 'Total users', value: '4,820', helper: '+8% vs last month' },
    { label: 'Pending instructors', value: '18', helper: 'Awaiting review' },
    { label: 'Active courses', value: '64', helper: '12 in draft' },
  ];

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

