
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Plus,
  Briefcase,
  User,
  GraduationCap,
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Save,
  Languages,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResumeAnalyzer from '@/components/ResumeAnalyzer';
import ResumeBuilder from '@/components/ResumeBuilder';
import BilingualResumeBuilder from '@/components/BilingualResumeBuilder';
import ResumeTemplates from '@/components/ResumeTemplates';
import ResumeExporter from '@/components/ResumeExporter';
import ResumePreview from '@/components/ResumePreview';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { ResumeData, ExportOptions } from '@/services/exportService';

// BilingualData interface for the bilingual resume builder
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

// Convert BilingualData to ResumeData based on current language
const convertBilingualToResumeData = (bilingualData: BilingualData, currentLanguage: 'ar' | 'en'): ResumeData => {
  const data = bilingualData[currentLanguage];
  return {
    personalInfo: {
      name: data.name,
      summary: data.summary,
    },
    experience: data.experience.map(exp => ({
      title: exp.title,
      company: exp.company,
      description: exp.description,
      startDate: '',
      current: true,
    })),
    education: data.education.map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      startDate: '',
      endDate: '',
    })),
    skills: data.skills.map(skill => ({ name: skill, level: 'intermediate' as const })),
    certificates: [],
  };
};

const Resume = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('builder');
  const [builderMode, setBuilderMode] = useState<'standard' | 'bilingual'>('standard');
  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/');
  };

  // Enhanced resume data with more realistic and complete information
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: 'أحمد محمد العلي',
      email: 'ahmed.ali@email.com',
      phone: '+966501234567',
      location: 'الرياض، المملكة العربية السعودية',
      summary: 'مطور برمجيات متخصص في تطوير تطبيقات الويب والهاتف المحمول مع خبرة 5 سنوات في بناء حلول تقنية مبتكرة. أتمتع بخبرة واسعة في JavaScript, React, Node.js وتقنيات الحوسبة السحابية. أسعى لتطوير تطبيقات عالية الجودة تلبي احتياجات المستخدمين وتحقق أهداف الأعمال.'
    },
    experience: [
      {
        title: 'مطور تطبيقات أول',
        company: 'شركة التقنية المتقدمة',
        startDate: '2022-01',
        current: true,
        location: 'الرياض، السعودية',
        description: 'قيادة فريق تطوير التطبيقات والمسؤولية عن تطوير وصيانة تطبيقات الويب باستخدام React و Node.js',
        achievements: [
          'تطوير 3 تطبيقات ويب رئيسية خدمت أكثر من 50,000 مستخدم',
          'تحسين أداء التطبيقات بنسبة 40% من خلال تحسين الكود والاستعلامات',
          'قيادة فريق من 5 مطورين وتدريبهم على أفضل الممارسات',
          'تطبيق منهجيات Agile و DevOps لتسريع دورة التطوير'
        ]
      },
      {
        title: 'مطور ويب',
        company: 'شركة الحلول الرقمية',
        startDate: '2020-03',
        endDate: '2021-12',
        location: 'جدة، السعودية',
        description: 'تطوير مواقع ومتاجر إلكترونية للشركات المحلية باستخدام أحدث التقنيات',
        achievements: [
          'تطوير أكثر من 15 موقع إلكتروني ومتجر إلكتروني',
          'تحسين SEO للمواقع وزيادة الزيارات بنسبة 60%',
          'تطوير نظام إدارة المحتوى المخصص'
        ]
      }
    ],
    education: [
      {
        degree: 'بكالوريوس علوم الحاسوب',
        institution: 'جامعة الملك سعود',
        startDate: '2015-09',
        endDate: '2019-06',
        gpa: '3.8/4.0',
        description: 'تخصص في هندسة البرمجيات وقواعد البيانات مع التركيز على تطوير التطبيقات'
      }
    ],
    skills: [
      { name: 'JavaScript', level: 'expert' as const },
      { name: 'React.js', level: 'expert' as const },
      { name: 'Node.js', level: 'advanced' as const },
      { name: 'TypeScript', level: 'advanced' as const },
      { name: 'Python', level: 'intermediate' as const },
      { name: 'SQL/NoSQL', level: 'advanced' as const },
      { name: 'AWS', level: 'intermediate' as const },
      { name: 'Docker', level: 'intermediate' as const }
    ],
    certificates: [
      {
        name: 'شهادة AWS المطور المعتمد',
        issuer: 'Amazon Web Services',
        date: '2023-08'
      },
      {
        name: 'شهادة React Developer',
        issuer: 'Meta',
        date: '2022-12'
      }
    ]
  });

  // Auto-switch to preview tab when exporting PDF to ensure the preview is visible
  const handleExportSuccess = (options: ExportOptions) => {
    toast({
      title: language === 'ar' ? 'تم التصدير بنجاح' : 'Export Successful',
      description: language === 'ar' 
        ? `تم تصدير السيرة الذاتية بصيغة ${options.format.toUpperCase()}`
        : `Resume exported as ${options.format.toUpperCase()}`,
    });
  };

  const handleShareSuccess = () => {
    toast({
      title: language === 'ar' ? 'تم إنشاء رابط المشاركة' : 'Share Link Created',
      description: language === 'ar' ? 'تم إنشاء رابط مشاركة السيرة الذاتية بنجاح' : 'Resume share link has been created successfully',
    });
  };

  // Auto-switch to preview when PDF export is attempted
  const handlePDFExportAttempt = () => {
    if (activeTab !== 'preview') {
      setActiveTab('preview');
      toast({
        title: language === 'ar' ? 'التبديل للمعاينة' : 'Switching to Preview',
        description: language === 'ar' 
          ? 'تم التبديل إلى تبويب المعاينة لضمان جودة تصدير PDF'
          : 'Switched to preview tab to ensure PDF export quality',
      });
    }
  };

  const templates = [
    { id: 1, name: 'النموذج الكلاسيكي', preview: '/placeholder.svg' },
    { id: 2, name: 'النموذج الحديث', preview: '/placeholder.svg' },
    { id: 3, name: 'النموذج الإبداعي', preview: '/placeholder.svg' },
    { id: 4, name: 'النموذج المهني', preview: '/placeholder.svg' }
  ];

  return (
    <div className="min-h-screen bg-gradient-vision" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-gradient-primary text-primary-foreground p-2 rounded-lg">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <Link to="/dashboard">
                  <h1 className="text-2xl font-bold gradient-text-hero hover:opacity-80 transition-opacity">
                    {language === 'ar' ? 'دؤوب' : 'Doaub'}
                  </h1>
                </Link>
                <p className="text-sm text-muted-foreground">{t('resume.title')}</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4 rtl:space-x-reverse">
              <LanguageSelector variant="icon" />
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">{t('nav.dashboard')}</Button>
              </Link>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Mode Selector */}
          <Card className="card-vision">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-hero gradient-text-hero">
                    {t('resume.title')}
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'اختر نمط بناء السيرة الذاتية المناسب لاحتياجاتك'
                      : 'Choose the resume building mode that fits your needs'
                    }
                  </CardDescription>
                </div>
                <div className="flex bg-muted rounded-lg p-1">
                  <Button
                    variant={builderMode === 'standard' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setBuilderMode('standard')}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    {language === 'ar' ? 'عادي' : 'Standard'}
                  </Button>
                  <Button
                    variant={builderMode === 'bilingual' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setBuilderMode('bilingual')}
                    className="flex items-center gap-2"
                  >
                    <Languages className="h-4 w-4" />
                    {language === 'ar' ? 'ثنائي اللغة' : 'Bilingual'}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="builder" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {language === 'ar' ? 'منشئ السيرة' : 'Resume Builder'}
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t('resume.templates')}
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {language === 'ar' ? 'تصدير ومشاركة' : 'Export & Share'}
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                {t('resume.analysis')}
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {language === 'ar' ? 'معاينة' : 'Preview'}
              </TabsTrigger>
            </TabsList>

            {/* Resume Builder Tab */}
            <TabsContent value="builder">
              {builderMode === 'bilingual' ? (
                <BilingualResumeBuilder 
                  onSave={(data) => {
                    setResumeData(convertBilingualToResumeData(data, language as 'ar' | 'en'));
                    toast({
                      title: language === 'ar' ? 'تم الحفظ' : 'Saved',
                      description: language === 'ar' ? 'تم حفظ السيرة الذاتية بنجاح' : 'Resume saved successfully'
                    });
                  }}
                  onPreview={(data, lang) => {
                    const previewLanguage = (lang === 'both' || !lang) ? language as 'ar' | 'en' : lang;
                    setResumeData(convertBilingualToResumeData(data, previewLanguage));
                    setActiveTab('preview');
                  }}
                />
              ) : (
                <ResumeBuilder 
                  onSave={(data) => {
                    setResumeData(data as ResumeData);
                    toast({
                      title: language === 'ar' ? 'تم الحفظ' : 'Saved',
                      description: language === 'ar' ? 'تم حفظ السيرة الذاتية بنجاح' : 'Resume saved successfully'
                    });
                  }}
                  onPreview={(data) => {
                    setResumeData(data as ResumeData);
                    setActiveTab('preview');
                  }}
                  onExport={(data) => {
                    setResumeData(data as ResumeData);
                    handlePDFExportAttempt();
                    setActiveTab('export');
                  }}
                />
              )}
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates">
              <ResumeTemplates 
                onSelectTemplate={(templateId) => console.log('Selected template:', templateId)}
                selectedTemplate="vision-professional"
              />
            </TabsContent>

            {/* Export & Share Tab */}
            <TabsContent value="export">
              <ResumeExporter 
                resumeData={resumeData}
                onExport={handleExportSuccess}
                onShare={handleShareSuccess}
              />
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis">
              <ResumeAnalyzer />
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview">
              <ResumePreview 
                resumeData={resumeData}
                selectedTemplate="vision-professional"
                onExport={(format) => {
                  console.log('Quick export format:', format);
                  if (format === 'pdf') {
                    handlePDFExportAttempt();
                  }
                  setActiveTab('export');
                }}
                onShare={() => {
                  console.log('Share resume');
                  setActiveTab('export');
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Resume;
