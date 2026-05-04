import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  // Base styles that all buttons share
  const baseStyles = "flex items-center justify-center gap-2 font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] py-3 px-6 rounded-xl transition-all duration-300 shadow-lg active:scale-95";

  // Different style versions
  const variants = {
    primary: "bg-black text-white hover:bg-black/90",
    outline: "border border-border text-foreground hover:bg-foreground hover:text-background",
    ghost: "bg-transparent text-foreground hover:bg-black/5 shadow-none"
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