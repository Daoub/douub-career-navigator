import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Plus, 
  Trash2, 
  Edit, 
  Save,
  Eye,
  Download,
  Upload,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
  CheckCircle
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedIn?: string;
  website?: string;
  nationality?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
  description?: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'technical' | 'soft' | 'language';
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certificates: Certificate[];
  projects?: any[];
  languages?: any[];
  template: string;
  lastModified: Date;
}

interface ResumeBuilderProps {
  onSave?: (data: ResumeData) => void;
  onPreview?: (data: ResumeData) => void;
  onExport?: (data: ResumeData) => void;
  initialData?: Partial<ResumeData>;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  onSave,
  onPreview,
  onExport,
  initialData
}) => {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedIn: '',
      website: '',
      nationality: '',
      dateOfBirth: '',
      maritalStatus: ''
    },
    experience: [],
    education: [],
    skills: [],
    certificates: [],
    template: 'vision-professional',
    lastModified: new Date(),
    ...initialData
  });

  useEffect(() => {
    // Auto-save functionality
    const autoSave = setTimeout(() => {
      handleAutoSave();
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSave);
  }, [resumeData]);

  const handleAutoSave = async () => {
    try {
      localStorage.setItem('resume_draft', JSON.stringify(resumeData));
      toast({
        title: t('common.success'),
        description: language === 'ar' ? 'تم حفظ المسودة تلقائياً' : 'Draft saved automatically',
      });
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedData = {
        ...resumeData,
        lastModified: new Date()
      };
      setResumeData(updatedData);
      onSave?.(updatedData);
      
      toast({
        title: t('common.success'),
        description: language === 'ar' ? 'تم حفظ السيرة الذاتية بنجاح' : 'Resume saved successfully',
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: language === 'ar' ? 'فشل في حفظ السيرة الذاتية' : 'Failed to save resume',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (name: string, level: Skill['level'], category: Skill['category']) => {
    if (!name.trim()) return;
    
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: name.trim(),
      level,
      category
    };
    
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      verificationUrl: ''
    };
    setResumeData(prev => ({
      ...prev,
      certificates: [...prev.certificates, newCertificate]
    }));
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: any) => {
    setResumeData(prev => ({
      ...prev,
      certificates: prev.certificates.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertificate = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(cert => cert.id !== id)
    }));
  };

  const getSkillLevelBadge = (level: Skill['level']) => {
    const levels = {
      beginner: { label: language === 'ar' ? 'مبتدئ' : 'Beginner', variant: 'secondary' as const },
      intermediate: { label: language === 'ar' ? 'متوسط' : 'Intermediate', variant: 'outline' as const },
      advanced: { label: language === 'ar' ? 'متقدم' : 'Advanced', variant: 'default' as const },
      expert: { label: language === 'ar' ? 'خبير' : 'Expert', variant: 'default' as const }
    };
    return levels[level];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between bg-card rounded-lg p-4 shadow-sm">
        <div>
          <h2 className="text-hero gradient-text-hero">
            {t('resume.title')}
          </h2>
          <p className="text-muted-foreground text-sm">
            {language === 'ar' 
              ? `آخر تحديث: ${resumeData.lastModified.toLocaleString('ar-SA')}`
              : `Last updated: ${resumeData.lastModified.toLocaleString('en-US')}`
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onPreview?.(resumeData)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {language === 'ar' ? 'معاينة' : 'Preview'}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Save className="h-4 w-4 animate-pulse" />
                {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {t('common.save')}
              </>
            )}
          </Button>
          <Button 
            onClick={() => onExport?.(resumeData)}
            className="bg-gradient-primary btn-gradient-hover flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {t('resume.download_pdf')}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Resume Builder Tabs */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{t('resume.personal_info')}</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">{t('resume.experience')}</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">{t('resume.education')}</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">{t('resume.skills')}</span>
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">{t('resume.certificates')}</span>
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    {t('resume.personal_info')}
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'أدخل معلوماتك الشخصية والمهنية الأساسية'
                      : 'Enter your basic personal and professional information'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</Label>
                      <Input
                        id="name"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, name: e.target.value }
                        }))}
                        placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value }
                        }))}
                        placeholder={language === 'ar' ? 'your@email.com' : 'your@email.com'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">{language === 'ar' ? 'الموقع' : 'Location'}</Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, location: e.target.value }
                        }))}
                        placeholder={language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}
                      />
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">{language === 'ar' ? 'ملف LinkedIn' : 'LinkedIn Profile'}</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.linkedIn || ''}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, linkedIn: e.target.value }
                        }))}
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">{language === 'ar' ? 'الموقع الشخصي' : 'Personal Website'}</Label>
                      <Input
                        id="website"
                        value={resumeData.personalInfo.website || ''}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, website: e.target.value }
                        }))}
                        placeholder="www.yourwebsite.com"
                      />
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="space-y-2">
                    <Label htmlFor="summary">{language === 'ar' ? 'الملخص المهني' : 'Professional Summary'}</Label>
                    <Textarea
                      id="summary"
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, summary: e.target.value }
                      }))}
                      placeholder={language === 'ar' 
                        ? 'اكتب ملخصاً مختصراً عن خبراتك ومهاراتك المهنية...'
                        : 'Write a brief summary of your professional experience and skills...'
                      }
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <Card className="card-vision">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        {t('resume.experience')}
                      </CardTitle>
                      <CardDescription>
                        {language === 'ar' 
                          ? 'أضف خبراتك المهنية والوظائف السابقة'
                          : 'Add your professional experience and previous positions'
                        }
                      </CardDescription>
                    </div>
                    <Button onClick={addExperience} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة خبرة' : 'Add Experience'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experience.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>{language === 'ar' ? 'لم تتم إضافة أي خبرة مهنية بعد' : 'No work experience added yet'}</p>
                      <Button onClick={addExperience} variant="outline" className="mt-3">
                        {language === 'ar' ? 'إضافة أول خبرة' : 'Add First Experience'}
                      </Button>
                    </div>
                  ) : (
                    resumeData.experience.map((exp) => (
                      <Card key={exp.id} className="border border-border">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-foreground">
                              {exp.title || (language === 'ar' ? 'خبرة جديدة' : 'New Experience')}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}</Label>
                              <Input
                                value={exp.title}
                                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                placeholder={language === 'ar' ? 'مطور برمجيات' : 'Software Developer'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'اسم الشركة' : 'Company Name'}</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                placeholder={language === 'ar' ? 'شركة التقنية المتقدمة' : 'Advanced Tech Company'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'الموقع' : 'Location'}</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                placeholder={language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'تاريخ البداية' : 'Start Date'}</Label>
                              <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                id={`current-${exp.id}`}
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                className="rounded border-border"
                              />
                              <Label htmlFor={`current-${exp.id}`}>
                                {language === 'ar' ? 'أعمل حالياً في هذا المنصب' : 'Currently working in this position'}
                              </Label>
                            </div>
                            {!exp.current && (
                              <div className="space-y-2">
                                <Label>{language === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}</Label>
                                <Input
                                  type="month"
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                />
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>{language === 'ar' ? 'وصف المهام والمسؤوليات' : 'Job Description & Responsibilities'}</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              placeholder={language === 'ar' 
                                ? 'اكتب وصفاً تفصيلياً لمهامك ومسؤولياتك في هذا المنصب...'
                                : 'Write a detailed description of your tasks and responsibilities in this position...'
                              }
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card className="card-vision">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        {t('resume.education')}
                      </CardTitle>
                      <CardDescription>
                        {language === 'ar' 
                          ? 'أضف مؤهلاتك التعليمية والأكاديمية'
                          : 'Add your educational qualifications and academic background'
                        }
                      </CardDescription>
                    </div>
                    <Button onClick={addEducation} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة تعليم' : 'Add Education'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.education.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>{language === 'ar' ? 'لم تتم إضافة أي مؤهل تعليمي بعد' : 'No education added yet'}</p>
                      <Button onClick={addEducation} variant="outline" className="mt-3">
                        {language === 'ar' ? 'إضافة أول مؤهل' : 'Add First Education'}
                      </Button>
                    </div>
                  ) : (
                    resumeData.education.map((edu) => (
                      <Card key={edu.id} className="border border-border">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-foreground">
                              {edu.degree || (language === 'ar' ? 'مؤهل تعليمي جديد' : 'New Education')}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'الدرجة العلمية' : 'Degree'}</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder={language === 'ar' ? 'بكالوريوس علوم الحاسوب' : 'Bachelor of Computer Science'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'اسم المؤسسة' : 'Institution'}</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                placeholder={language === 'ar' ? 'جامعة الملك سعود' : 'King Saud University'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'الموقع' : 'Location'}</Label>
                              <Input
                                value={edu.location}
                                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                                placeholder={language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'سنة التخرج' : 'Graduation Year'}</Label>
                              <Input
                                type="month"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'المعدل التراكمي' : 'GPA'}</Label>
                              <Input
                                value={edu.gpa || ''}
                                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                placeholder="3.8/4.0"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'التقديرات والأوسمة' : 'Honors & Awards'}</Label>
                              <Input
                                value={edu.honors || ''}
                                onChange={(e) => updateEducation(edu.id, 'honors', e.target.value)}
                                placeholder={language === 'ar' ? 'مرتبة الشرف' : 'Magna Cum Laude'}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    {t('resume.skills')}
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'أضف مهاراتك التقنية والشخصية واللغوية'
                      : 'Add your technical, soft, and language skills'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Skill Form */}
                  <Card className="border-dashed border-2 border-muted-foreground/25">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <Input
                          id="new-skill"
                          placeholder={language === 'ar' ? 'اسم المهارة' : 'Skill name'}
                        />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'ar' ? 'المستوى' : 'Level'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">{language === 'ar' ? 'مبتدئ' : 'Beginner'}</SelectItem>
                            <SelectItem value="intermediate">{language === 'ar' ? 'متوسط' : 'Intermediate'}</SelectItem>
                            <SelectItem value="advanced">{language === 'ar' ? 'متقدم' : 'Advanced'}</SelectItem>
                            <SelectItem value="expert">{language === 'ar' ? 'خبير' : 'Expert'}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'ar' ? 'الفئة' : 'Category'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">{language === 'ar' ? 'تقنية' : 'Technical'}</SelectItem>
                            <SelectItem value="soft">{language === 'ar' ? 'شخصية' : 'Soft Skills'}</SelectItem>
                            <SelectItem value="language">{language === 'ar' ? 'لغوية' : 'Language'}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={() => {
                            const input = document.getElementById('new-skill') as HTMLInputElement;
                            const levelSelect = document.querySelector('[data-state="closed"][role="combobox"]') as HTMLSelectElement;
                            const categorySelect = document.querySelectorAll('[data-state="closed"][role="combobox"]')[1] as HTMLSelectElement;
                            
                            if (input?.value) {
                              addSkill(input.value, 'intermediate', 'technical');
                              input.value = '';
                            }
                          }}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          {language === 'ar' ? 'إضافة' : 'Add'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills Display */}
                  {resumeData.skills.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>{language === 'ar' ? 'لم تتم إضافة أي مهارة بعد' : 'No skills added yet'}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {['technical', 'soft', 'language'].map(category => {
                        const categorySkills = resumeData.skills.filter(skill => skill.category === category);
                        if (categorySkills.length === 0) return null;

                        const categoryNames = {
                          technical: language === 'ar' ? 'المهارات التقنية' : 'Technical Skills',
                          soft: language === 'ar' ? 'المهارات الشخصية' : 'Soft Skills',
                          language: language === 'ar' ? 'المهارات اللغوية' : 'Language Skills'
                        };

                        return (
                          <div key={category}>
                            <h4 className="font-medium text-foreground mb-3">
                              {categoryNames[category as keyof typeof categoryNames]}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {categorySkills.map(skill => {
                                const levelInfo = getSkillLevelBadge(skill.level);
                                return (
                                  <div key={skill.id} className="flex items-center gap-2 bg-muted rounded-lg p-2">
                                    <span className="text-sm font-medium">{skill.name}</span>
                                    <Badge variant={levelInfo.variant} className="text-xs">
                                      {levelInfo.label}
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeSkill(skill.id)}
                                      className="h-auto p-1 text-muted-foreground hover:text-destructive"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates">
              <Card className="card-vision">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        {t('resume.certificates')}
                      </CardTitle>
                      <CardDescription>
                        {language === 'ar' 
                          ? 'أضف شهاداتك المهنية والدورات التدريبية'
                          : 'Add your professional certificates and training courses'
                        }
                      </CardDescription>
                    </div>
                    <Button onClick={addCertificate} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة شهادة' : 'Add Certificate'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.certificates.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>{language === 'ar' ? 'لم تتم إضافة أي شهادة بعد' : 'No certificates added yet'}</p>
                      <Button onClick={addCertificate} variant="outline" className="mt-3">
                        {language === 'ar' ? 'إضافة أول شهادة' : 'Add First Certificate'}
                      </Button>
                    </div>
                  ) : (
                    resumeData.certificates.map((cert) => (
                      <Card key={cert.id} className="border border-border">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-foreground">
                              {cert.name || (language === 'ar' ? 'شهادة جديدة' : 'New Certificate')}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCertificate(cert.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'اسم الشهادة' : 'Certificate Name'}</Label>
                              <Input
                                value={cert.name}
                                onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)}
                                placeholder={language === 'ar' ? 'شهادة AWS المطور المعتمد' : 'AWS Certified Developer'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'الجهة المانحة' : 'Issuing Organization'}</Label>
                              <Input
                                value={cert.issuer}
                                onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                                placeholder={language === 'ar' ? 'أمازون ويب سيرفيسز' : 'Amazon Web Services'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'تاريخ الإصدار' : 'Issue Date'}</Label>
                              <Input
                                type="month"
                                value={cert.date}
                                onChange={(e) => updateCertificate(cert.id, 'date', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'تاريخ انتهاء الصلاحية' : 'Expiry Date'}</Label>
                              <Input
                                type="month"
                                value={cert.expiryDate || ''}
                                onChange={(e) => updateCertificate(cert.id, 'expiryDate', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'رقم الشهادة' : 'Credential ID'}</Label>
                              <Input
                                value={cert.credentialId || ''}
                                onChange={(e) => updateCertificate(cert.id, 'credentialId', e.target.value)}
                                placeholder="ABC123456"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{language === 'ar' ? 'رابط التحقق' : 'Verification URL'}</Label>
                              <Input
                                value={cert.verificationUrl || ''}
                                onChange={(e) => updateCertificate(cert.id, 'verificationUrl', e.target.value)}
                                placeholder="https://verify.example.com"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Resume Preview/Tips Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="card-vision">
            <CardHeader>
              <CardTitle className="text-base">
                {language === 'ar' ? 'تقدم السيرة الذاتية' : 'Resume Progress'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { 
                    section: 'personal', 
                    label: language === 'ar' ? 'المعلومات الشخصية' : 'Personal Info',
                    completed: resumeData.personalInfo.name && resumeData.personalInfo.email
                  },
                  { 
                    section: 'experience', 
                    label: language === 'ar' ? 'الخبرة العملية' : 'Experience',
                    completed: resumeData.experience.length > 0
                  },
                  { 
                    section: 'education', 
                    label: language === 'ar' ? 'التعليم' : 'Education',
                    completed: resumeData.education.length > 0
                  },
                  { 
                    section: 'skills', 
                    label: language === 'ar' ? 'المهارات' : 'Skills',
                    completed: resumeData.skills.length >= 3
                  }
                ].map(item => (
                  <div key={item.section} className="flex items-center gap-2">
                    <CheckCircle 
                      className={`h-4 w-4 ${
                        item.completed ? 'text-green-500' : 'text-muted-foreground'
                      }`} 
                    />
                    <span className={`text-sm ${
                      item.completed ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="card-vision">
            <CardHeader>
              <CardTitle className="text-base">
                {language === 'ar' ? 'نصائح مهمة' : 'Important Tips'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'اكتب ملخصاً مهنياً قوياً يبرز خبراتك الرئيسية'
                      : 'Write a strong professional summary that highlights your key experiences'
                    }
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'استخدم كلمات مفتاحية متعلقة بمجال عملك'
                      : 'Use keywords relevant to your field of work'
                    }
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'احرص على دقة المعلومات وتواريخ العمل'
                      : 'Ensure accuracy of information and work dates'
                    }
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'أضف إنجازات محددة بأرقام عندما أمكن'
                      : 'Add specific achievements with numbers when possible'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;