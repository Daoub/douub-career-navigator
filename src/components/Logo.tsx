
import React from 'react';
import { Briefcase, Star, Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
    xl: 'h-16 w-16'
  };

  const LogoIcon = () => (
    <div className="relative">
      <div className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
        <Briefcase className={`${iconSizes[size]} text-white`} />
      </div>
      <div className="absolute -top-1 -right-1">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
          <Star className="h-3 w-3 text-white fill-current" />
        </div>
      </div>
    </div>
  );

  const LogoText = () => (
    <div className="flex flex-col">
      <h1 className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight`}>
        دؤوب
      </h1>
      <p className="text-xs text-gray-600 font-medium tracking-wide">
        Dooub
      </p>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={className}>
        <LogoIcon />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={className}>
        <LogoText />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 rtl:space-x-reverse ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  );
};

export default Logo;
