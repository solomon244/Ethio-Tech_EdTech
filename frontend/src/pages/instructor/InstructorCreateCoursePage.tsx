import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';

const InstructorCreateCoursePage = () => {
  return (
    <form className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <InputField label="Course title" placeholder="Full-Stack Engineering Studio" required />
        <InputField label="Category" placeholder="Web Development" required />
        <InputField label="Level" placeholder="Intermediate" />
        <InputField label="Language" placeholder="English & Amharic" />
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-stone-600">Course description</span>
        <textarea
          className="min-h-[160px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          placeholder="Outline the learning outcomes, key projects, and resources..."
          required
        />
      </label>
      <InputField label="Thumbnail URL" placeholder="https://images..." />
      <Button type="submit" className="px-6 py-3">
        Publish course
      </Button>
    </form>
  );
};

export default InstructorCreateCoursePage;


