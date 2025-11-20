import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';

const InstructorProfilePage = () => {
  return (
    <form className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <InputField label="First name" placeholder="Selam" />
        <InputField label="Last name" placeholder="Kebede" />
        <InputField label="Email" type="email" placeholder="selam@ethio.tech" />
        <InputField label="Years of experience" type="number" min={1} max={40} />
      </div>
      <InputField label="Specialization" placeholder="Frontend Engineering, UI Systems" />
      <label className="block space-y-2">
        <span className="text-sm font-medium text-stone-600">Instructor bio</span>
        <textarea
          className="min-h-[160px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          placeholder="Share your teaching philosophy, Ethiopian context projects, and mentorship highlights."
        />
      </label>
      <Button type="submit" className="px-6 py-3">
        Update profile
      </Button>
    </form>
  );
};

export default InstructorProfilePage;

