import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function IconButton({
  children,
  label,
  variant = 'ghost',
  className = '',
  ...props
}: IconButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    min-h-12 min-w-12
    rounded-full
    transition-all duration-200
    active:scale-90
    focus:outline-none focus:ring-4 focus:ring-princess-gold/50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
    no-select
  `;

  const variantClasses = {
    primary: `
      bg-princess-pink text-white
      shadow-lg shadow-princess-pink/30
      hover:bg-princess-pink/90
    `,
    secondary: `
      bg-princess-lavender text-purple-800
      shadow-md shadow-princess-lavender/30
      hover:bg-princess-lavender/90
    `,
    ghost: `
      bg-white/40 text-purple-800
      hover:bg-white/60
    `,
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
}
