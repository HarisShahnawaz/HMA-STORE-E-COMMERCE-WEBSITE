import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  // REMOVED: uppercase and tracking-[0.2em] to allow normal-case text
  const baseStyles = "flex items-center justify-center gap-2 font-sans text-[11px] font-bold py-3 px-8 rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 shadow-xl border-none",
    outline: "border border-gray-200 text-black hover:bg-black hover:text-white hover:border-black",
    ghost: "bg-transparent text-black hover:bg-black/5 shadow-none"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};