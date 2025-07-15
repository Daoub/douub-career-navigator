import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Languages, 
  Globe, 
  Copy, 
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';

interface BilingualData {
  ar: {
    name: string;
    summary: string;
    experience: Array<{
      title: string;
      company: string;
      description: string;
    }>;
    education: Array<{
      degree: string;
      institution: string;
    }>;
    skills: string[];
  };
  en: {
    name: string;
    summary: string;
    experience: Array<{
      title: string;
      company: string;
      description: string;
    }>;
    education: Array<{
      degree: string;
      institution: string;
    }>;
    skills: string[];
  };
}

interface BilingualResumeBuilderProps {
  onSave?: (data: BilingualData) => void;
  onPreview?: (data: BilingualData, language: 'ar' | 'en' | 'both') => void;
  initialData?: Partial<BilingualData>;
}

const BilingualResumeBuilder: React.FC<BilingualResumeBuilderProps> = ({
  onSave,
  onPreview,
  initialData
}) => {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [activeLanguage, setActiveLanguage] = useState<'ar' | 'en'>('ar');
  const [syncMode, setSyncMode] = useState(false);

  const [bilingualData, setBilingualData] = useState<BilingualData>({
    ar: {
      name: '',
      summary: '',
      experience: [],
      education: [],
      skills: []
    },
    en: {
      name: '',
      summary: '',
      experience: [],
      education: [],
      skills: []
    },
    ...initialData
  });

  // AI Translation Simulation
  const translateText = async (text: string, fromLang: 'ar' | 'en', toLang: 'ar' | 'en') => {
    // Simulated AI translation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple translation examples (in real app, use actual translation service)
    const translations: Record<string, Record<string, string>> = {
      'ar->en': {
        'مطور برمجيات': 'Software Developer',
        'مهندس برمجيات': 'Software Engineer',
        'مطور تطبيقات': 'Application Developer',
        'مطور ويب': 'Web Developer',
        'مدير مشروع': 'Project Manager',
        'محلل أنظمة': 'Systems Analyst'
      },
      'en->ar': {
        'Software Developer': 'مطور برمجيات',
        'Software Engineer': 'مهندس برمجيات',
        'Application Developer': 'مطور تطبيقات',
        'Web Developer': 'مطور ويب',
        'Project Manager': 'مدير مشروع',
        'Systems Analyst': 'محلل أنظمة'
      }
    };

    const translationKey = `${fromLang}->${toLang}`;
    return translations[translationKey]?.[text] || `[${toLang.toUpperCase()}] ${text}`;
  };

  const autoTranslate = async (field: string, value: string) => {
    if (!value.trim()) return;

    try {
      const otherLang = activeLanguage === 'ar' ? 'en' : 'ar';
      const translatedValue = await translateText(value, activeLanguage, otherLang);
      
      setBilingualData(prev => ({
        ...prev,
        [otherLang]: {
          ...prev[otherLang],
          [field]: translatedValue
        }
      }));

      toast({
        title: language === 'ar' ? 'تمت الترجمة' : 'Translation Complete',
        description: language === 'ar' 
          ? `تم ترجمة ${field} تلقائياً`
          : `${field} has been auto-translated`,
      });
    } catch (error) {
      toast({
        title: language === 'ar' ? 'خطأ في الترجمة' : 'Translation Error',
        description: language === 'ar' 
          ? 'فشلت الترجمة التلقائية'
          : 'Auto-translation failed',
        variant: 'destructive'
      });
    }
  };

  const copyFromOtherLanguage = (field: string) => {
    const otherLang = activeLanguage === 'ar' ? 'en' : 'ar';
    const otherValue = bilingualData[otherLang][field as keyof typeof bilingualData.ar];
    
    setBilingualData(prev => ({
      ...prev,
      [activeLanguage]: {
        ...prev[activeLanguage],
        [field]: otherValue
      }
    }));

    toast({
      title: language === 'ar' ? 'تم النسخ' : 'Copied',
      description: language === 'ar' 
        ? 'تم نسخ المحتوى من اللغة الأخرى'
        : 'Content copied from other language',
    });
  };

  const getCompletionPercentage = (lang: 'ar' | 'en') => {
    const data = bilingualData[lang];
    let completed = 0;
    let total = 4; // name, summary, experience, education

    if (data.name) completed++;
    if (data.summary) completed++;
    if (data.experience.length > 0) completed++;
    if (data.education.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const updateField = (field: string, value: any) => {
    setBilingualData(prev => ({
      ...prev,
      [activeLanguage]: {
        ...prev[activeLanguage],
        [field]: value
      }
    }));

    // Auto-translate if sync mode is enabled
    if (syncMode && typeof value === 'string') {
      autoTranslate(field, value);
    }
  };

  const addExperience = () => {
    setBilingualData(prev => ({
      ...prev,
      [activeLanguage]: {
        ...prev[activeLanguage],
        experience: [
          ...prev[activeLanguage].experience,
          { title: '', company: '', description: '' }
        ]
      }
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setBilingualData(prev => ({
      ...prev,
      [activeLanguage]: {
        ...prev[activeLanguage],
        experience: prev[activeLanguage].experience.map((exp, i) => 
          i === index ? { ...exp, [field]: value } : exp
        )
      }
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="card-vision">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary text-primary-foreground p-2 rounded-lg">
                <Languages className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-hero gradient-text-hero">
                  {language === 'ar' ? 'منشئ السيرة الذاتية ثنائية اللغة' : 'Bilingual Resume Builder'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'أنشئ سيرتك الذاتية بالعربية والإنجليزية مع الترجمة الذكية'
                    : 'Create your resume in Arabic and English with smart translation'
                  }
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={syncMode ? "default" : "outline"}
                size="sm"
                onClick={() => setSyncMode(!syncMode)}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${syncMode ? 'animate-spin' : ''}`} />
                {language === 'ar' ? 'ترجمة تلقائية' : 'Auto Translate'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPreview?.(bilingualData, 'both')}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {language === 'ar' ? 'معاينة ثنائية' : 'Bilingual Preview'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Language Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'اللغة النشطة:' : 'Active Language:'}
              </span>
            </div>
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={activeLanguage === 'ar' ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveLanguage('ar')}
                className="flex items-center gap-2"
              >
                🇸🇦 العربية
              </Button>
              <Button
                variant={activeLanguage === 'en' ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveLanguage('en')}
                className="flex items-center gap-2"
              >
                🇺🇸 English
              </Button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇸🇦</span>
                    <span className="font-medium">العربية</span>
                  </div>
                  <Badge variant={getCompletionPercentage('ar') >= 75 ? "default" : "secondary"}>
                    {getCompletionPercentage('ar')}%
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getCompletionPercentage('ar')}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇺🇸</span>
                    <span className="font-medium">English</span>
                  </div>
                  <Badge variant={getCompletionPercentage('en') >= 75 ? "default" : "secondary"}>
                    {getCompletionPercentage('en')}%
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-secondary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getCompletionPercentage('en')}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card className="card-vision">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {activeLanguage === 'ar' ? 'المحتوى العربي' : 'English Content'}
                </span>
                <div className="flex items-center gap-2">
                  {activeLanguage === 'ar' ? '🇸🇦' : '🇺🇸'}
                  <Badge variant="outline">
                    {activeLanguage === 'ar' ? 'عربي' : 'English'}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</Label>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyFromOtherLanguage('name')}
                          className="h-6 px-2"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => autoTranslate('name', bilingualData[activeLanguage].name)}
                          className="h-6 px-2"
                        >
                          <Languages className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Input
                      value={bilingualData[activeLanguage].name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder={activeLanguage === 'ar' ? 'أحمد محمد العلي' : 'Ahmed Mohammed Al-Ali'}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>{language === 'ar' ? 'الملخص المهني' : 'Professional Summary'}</Label>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyFromOtherLanguage('summary')}
                          className="h-6 px-2"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => autoTranslate('summary', bilingualData[activeLanguage].summary)}
                          className="h-6 px-2"
                        >
                          <Languages className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={bilingualData[activeLanguage].summary}
                      onChange={(e) => updateField('summary', e.target.value)}
                      placeholder={
                        activeLanguage === 'ar' 
                          ? 'مطور برمجيات متخصص في تطوير تطبيقات الويب...'
                          : 'Software developer specialized in web application development...'
                      }
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {language === 'ar' ? 'الخبرة المهنية' : 'Professional Experience'}
                  </h3>
                  <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    {language === 'ar' ? 'إضافة خبرة' : 'Add Experience'}
                  </Button>
                </div>

                {bilingualData[activeLanguage].experience.map((exp, index) => (
                  <Card key={index} className="border border-border">
                    <CardContent className="p-4 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>{language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}</Label>
                          <Input
                            value={exp.title}
                            onChange={(e) => updateExperience(index, 'title', e.target.value)}
                            placeholder={
                              activeLanguage === 'ar' 
                                ? 'مطور برمجيات أول'
                                : 'Senior Software Developer'
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{language === 'ar' ? 'اسم الشركة' : 'Company Name'}</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            placeholder={
                              activeLanguage === 'ar' 
                                ? 'شركة التقنية المتقدمة'
                                : 'Advanced Technology Company'
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'وصف المهام' : 'Job Description'}</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(index, 'description', e.target.value)}
                          placeholder={
                            activeLanguage === 'ar' 
                              ? 'تطوير وصيانة تطبيقات الويب...'
                              : 'Develop and maintain web applications...'
                          }
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Comparison */}
        <div className="space-y-6">
          <Card className="card-vision">
            <CardHeader>
              <CardTitle className="text-base">
                {language === 'ar' ? 'مقارنة اللغات' : 'Language Comparison'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span>🇸🇦</span>
                    <span className="text-sm font-medium">العربية</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {bilingualData.ar.name || 'لا يوجد اسم'}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-3 mt-1">
                    {bilingualData.ar.summary || 'لا يوجد ملخص مهني'}
                  </p>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span>🇺🇸</span>
                    <span className="text-sm font-medium">English</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {bilingualData.en.name || 'No name provided'}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-3 mt-1">
                    {bilingualData.en.summary || 'No professional summary'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Translation Status */}
          <Card className="card-vision">
            <CardHeader>
              <CardTitle className="text-base">
                {language === 'ar' ? 'حالة الترجمة' : 'Translation Status'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { field: 'name', label: language === 'ar' ? 'الاسم' : 'Name' },
                { field: 'summary', label: language === 'ar' ? 'الملخص' : 'Summary' }
              ].map(item => {
                const arExists = Boolean(bilingualData.ar[item.field as keyof typeof bilingualData.ar]);
                const enExists = Boolean(bilingualData.en[item.field as keyof typeof bilingualData.en]);
                const isComplete = arExists && enExists;
                
                return (
                  <div key={item.field} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <div className="flex items-center gap-1">
                      {isComplete ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {isComplete 
                          ? (language === 'ar' ? 'مكتمل' : 'Complete')
                          : (language === 'ar' ? 'ناقص' : 'Incomplete')
                        }
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="card-vision">
            <CardContent className="p-4 space-y-3">
              <Button
                onClick={() => onPreview?.(bilingualData, 'ar')}
                variant="outline"
                className="w-full justify-start"
              >
                🇸🇦 {language === 'ar' ? 'معاينة النسخة العربية' : 'Preview Arabic Version'}
              </Button>
              <Button
                onClick={() => onPreview?.(bilingualData, 'en')}
                variant="outline"
                className="w-full justify-start"
              >
                🇺🇸 {language === 'ar' ? 'معاينة النسخة الإنجليزية' : 'Preview English Version'}
              </Button>
              <Button
                onClick={() => onSave?.(bilingualData)}
                className="w-full bg-gradient-primary btn-gradient-hover"
              >
                {language === 'ar' ? 'حفظ السيرة الذاتية' : 'Save Resume'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BilingualResumeBuilder;