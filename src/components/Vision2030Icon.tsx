import React from 'react';

interface Vision2030IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Vision2030Icon: React.FC<Vision2030IconProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#visionGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Geometric Pattern - Inspired by Saudi Heritage */}
        <g transform="translate(50,50)">
          {/* Central Star */}
          <path
            d="M0,-20 L5,-5 L20,0 L5,5 L0,20 L-5,5 L-20,0 L-5,-5 Z"
            fill="hsl(var(--secondary))"
            className="opacity-90"
          />
          
          {/* Surrounding Elements */}
          <circle cx="0" cy="0" r="12" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1" className="opacity-60" />
          <circle cx="0" cy="0" r="25" fill="none" stroke="hsl(var(--primary-light))" strokeWidth="0.5" className="opacity-40" />
        </g>

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="visionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--primary-light))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Vision 2030 Pattern Component for backgrounds
export const Vision2030Pattern: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => {
  return (
    <div className={`absolute inset-0 opacity-5 ${className}`}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <defs>
          <pattern id="vision-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="hsl(var(--primary))" />
            <path d="M10,5 L12,10 L10,15 L8,10 Z" fill="hsl(var(--secondary))" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vision-pattern)" />
      </svg>
    </div>
  );
};