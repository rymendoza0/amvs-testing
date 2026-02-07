import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", color = "currentColor", onClick }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} onClick={onClick}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <path d="M50 10L10 90H30L50 50L70 90H90L50 10Z" fill={color} />
        <path d="M50 50L30 90H70L50 50Z" fill="white" fillOpacity="0.2" />
      </svg>
      <span className={`font-display font-semibold tracking-[0.2em] text-xl ${color === 'white' ? 'text-white' : 'text-stone-900'}`}>
        AMVS
      </span>
    </div>
  );
};