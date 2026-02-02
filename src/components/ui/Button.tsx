import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-display font-semibold
    rounded-2xl
    transition-all duration-200
    active:scale-95
    focus:outline-none focus:ring-4 focus:ring-princess-gold/50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
    no-select
  `;

  const variantClasses = {
    primary: `
      bg-princess-pink text-white
      shadow-lg shadow-princess-pink/30
      hover:bg-princess-pink/90 hover:shadow-xl
    `,
    secondary: `
      bg-princess-lavender text-purple-800
      shadow-md shadow-princess-lavender/30
      hover:bg-princess-lavender/90
    `,
    ghost: `
      bg-white/30 text-purple-800
      hover:bg-white/50
    `,
  };

  const sizeClasses = {
    sm: 'min-h-10 min-w-10 px-4 py-2 text-sm',
    md: 'min-h-12 min-w-12 px-6 py-3 text-base',      // 48px touch target
    lg: 'min-h-14 min-w-14 px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
