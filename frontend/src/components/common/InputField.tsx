import type { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  icon?: ReactNode;
}

const InputField = ({ label, hint, icon, className, ...props }: InputFieldProps) => {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-stone-600">{label}</span>
      <div
        className={clsx(
          'flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20',
          className
        )}
      >
        {icon && <span className="text-primary">{icon}</span>}
        <input
          className="w-full border-none bg-transparent text-sm font-medium text-stone-800 placeholder-stone-400 outline-none"
          {...props}
        />
      </div>
      {hint && <p className="text-xs text-stone-400">{hint}</p>}
    </label>
  );
};

export default InputField;

