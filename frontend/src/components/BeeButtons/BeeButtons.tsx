import { BeeButtonProps } from './BeeButtons.props';

export const BeeButton = ({
  label,
  icon,
  variant = 'primary',
  onClick,
  disabled = false,
}: BeeButtonProps) => {
  const baseClasses =
    'flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200';
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-teal-500 text-white hover:bg-teal-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-yellow-400 text-white hover:bg-yellow-500',
    neutral: 'bg-gray-300 text-black hover:bg-gray-400',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${
    disabled ? disabledClasses : ''
  }`;

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
