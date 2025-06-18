import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, onClick, type = 'button', className = '', disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg transition ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
      }`}
    >
      {children}
    </button>
  );
};

export default Button;