import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe, Languages, Check } from 'lucide-react';
import { useTranslation, Language } from '@/hooks/useTranslation';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'button' | 'icon' | 'inline';
  showLabel?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '',
  variant = 'button',
  showLabel = true 
}) => {
  const { language, setLanguage, t } = useTranslation();

  const languages = [
    {
      code: 'ar' as Language,
      name: 'العربية',
      nameEn: 'Arabic',
      flag: '🇸🇦',
      direction: 'rtl'
    },
    {
      code: 'en' as Language,
      name: 'English',
      nameEn: 'English',
      flag: '🇺🇸',
      direction: 'ltr'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    
    // Apply direction to document
    const selectedLang = languages.find(lang => lang.code === newLanguage);
    if (selectedLang) {
      document.documentElement.dir = selectedLang.direction;
      document.documentElement.lang = selectedLang.code;
    }
  };

  if (variant === 'icon') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={className}>
            <Globe className="h-4 w-4" />
            <span className="sr-only">Select language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">
                  {language === 'ar' ? lang.name : lang.nameEn}
                </span>
              </div>
              {language === lang.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : "ghost"}
            size="sm"
            onClick={() => handleLanguageChange(lang.code)}
            className="h-8 px-2 text-xs"
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.code.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`flex items-center gap-2 ${className}`}>
          <Languages className="h-4 w-4" />
          {showLabel && currentLanguage && (
            <>
              <span className="text-lg">{currentLanguage.flag}</span>
              <span className="font-medium">
                {language === 'ar' ? currentLanguage.name : currentLanguage.nameEn}
              </span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="p-2">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            {language === 'ar' ? 'اختر اللغة' : 'Select Language'}
          </p>
        </div>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">
                  {language === 'ar' ? lang.name : lang.nameEn}
                </span>
                <span className="text-xs text-muted-foreground">
                  {lang.code === 'ar' ? 'اللغة العربية' : 'English Language'}
                </span>
              </div>
            </div>
            {language === lang.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;