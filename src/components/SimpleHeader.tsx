
import React from 'react';
import { Button } from '@/components/ui/button';

interface SimpleHeaderProps {
  title?: string;
  showAuth?: boolean;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({ 
  title = "منصة دؤوب المهنية", 
  showAuth = false 
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h1>
          
          {showAuth && (
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <a href="/login">تسجيل الدخول</a>
              </Button>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700" asChild>
                <a href="/signup">إنشاء حساب</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
