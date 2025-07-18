
import React, { useState } from 'react';
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

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: 'أحمد محمد العلي',
      email: 'ahmed@email.com',
      phone: '+966501234567',
      location: 'الرياض، السعودية',
      summary: 'مطور برمجيات متخصص في تطوير تطبيقات الويب والهاتف المحمول مع خبرة 5 سنوات'
    },
    experience: [
      {
        title: 'مطور تطبيقات أول',
        company: 'شركة التقنية المتقدمة',
        startDate: '2022',
        current: true,
        description: 'تطوير وصيانة تطبيقات الويب باستخدام React و Node.js',
        achievements: [
          'تطوير 3 تطبيقات ويب رئيسية',
          'تحسين أداء التطبيقات بنسبة 40%',
          'قيادة فريق من 5 مطورين'
        ]
      }
    ],
    education: [
      {
        degree: 'بكالوريوس علوم الحاسوب',
        institution: 'جامعة الملك سعود',
        startDate: '2015',
        endDate: '2019',
        gpa: '3.8/4.0'
      }
    ],
    skills: [
      { name: 'JavaScript', level: 'expert' as const },
      { name: 'React', level: 'expert' as const },
      { name: 'Node.js', level: 'advanced' as const },
      { name: 'Python', level: 'intermediate' as const },
      { name: 'SQL', level: 'advanced' as const }
    ],
    certificates: [
      {
        name: 'شهادة AWS المطور المعتمد',
        issuer: 'Amazon Web Services',
        date: '2023'
      }
    ]
  });

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
                    setResumeData(data as ResumeData);
                    toast({
                      title: language === 'ar' ? 'تم الحفظ' : 'Saved',
                      description: language === 'ar' ? 'تم حفظ السيرة الذاتية بنجاح' : 'Resume saved successfully'
                    });
                  }}
                  onPreview={(data, lang) => {
                    setResumeData(data as ResumeData);
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
