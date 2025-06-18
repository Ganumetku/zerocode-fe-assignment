import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        {...props}
        className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${props.className || ''}`}
      />
    </div>
  );
};

export default Input;