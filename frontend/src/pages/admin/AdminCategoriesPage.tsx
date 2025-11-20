import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';

const categories = ['Web Development', 'Data Science', 'Programming Fundamentals', 'UI/UX Design'];

const AdminCategoriesPage = () => {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
      <Card className="space-y-3">
        <p className="text-xs font-semibold uppercase text-primary">Existing categories</p>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category} className="flex items-center justify-between">
              <span className="font-semibold text-stone-800">{category}</span>
              <button className="text-sm text-danger">Remove</button>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="space-y-4">
        <p className="text-xs font-semibold uppercase text-primary">Create category</p>
        <InputField label="Name" placeholder="Cybersecurity" />
        <Button>Add category</Button>
      </Card>
    </div>
  );
};

export default AdminCategoriesPage;

