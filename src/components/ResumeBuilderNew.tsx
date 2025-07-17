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
  FileText,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { skillCategories, getAllSkills, getAllSkills_Ar } from '@/data/commonSkills';
import { jobCategories } from '@/data/jobCategories';
import { saudiCities } from '@/data/saudiCities';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  summary: string;
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
  category: 'technical' | 'business' | 'communication' | 'creative' | 'languages' | 'industry-specific';
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  description?: string;
}

interface Course {
  id: string;
  title: string;
  provider: string;
  date: string;
  description?: string;
  hours?: number;
  skills: string[];
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certificates: Certificate[];
  courses: Course[];
  template: string;
  lastModified: Date;
}

interface ResumeBuilderProps {
  onSave?: (data: ResumeData) => void;
  onPreview?: (data: ResumeData) => void;
  onExport?: (data: ResumeData) => void;
  initialData?: Partial<ResumeData>;
  mode?: 'new' | 'update';
}

const ResumeBuilderNew: React.FC<ResumeBuilderProps> = ({
  onSave,
  onPreview,
  onExport,
  initialData,
  mode = 'new'
}) => {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skillLevel, setSkillLevel] = useState<Skill['level']>('intermediate');
  const [skillCategory, setSkillCategory] = useState<Skill['category']>('technical');

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedin: '',
      nationality: '',
      dateOfBirth: '',
      maritalStatus: ''
    },
    experience: [],
    education: [],
    skills: [],
    certificates: [],
    courses: [],
    template: 'vision-professional',
    lastModified: new Date(),
    ...initialData
  });

  useEffect(() => {
    // Auto-save functionality
    const autoSave = setTimeout(() => {
      handleAutoSave();
    }, 30000);

    return () => clearTimeout(autoSave);
  }, [resumeData]);

  useEffect(() => {
    // Load existing draft on component mount
    if (mode === 'update') {
      const savedDraft = localStorage.getItem('resume_draft');
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          setResumeData(prev => ({ ...prev, ...draft }));
        } catch (error) {
          console.error('Failed to load draft:', error);
        }
      }
    }
  }, [mode]);

  const handleAutoSave = async () => {
    try {
      localStorage.setItem('resume_draft', JSON.stringify(resumeData));
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
        title: language === 'ar' ? 'نجح الحفظ' : 'Success',
        description: language === 'ar' ? 'تم حفظ السيرة الذاتية بنجاح' : 'Resume saved successfully',
      });
    } catch (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
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

  const addSkill = () => {
    if (!skillInput.trim()) return;
    
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: skillInput.trim(),
      level: skillLevel,
      category: skillCategory
    };
    
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    
    setSkillInput('');
  };

  const addPredefinedSkill = (skillName: string) => {
    const existingSkill = resumeData.skills.find(skill => skill.name === skillName);
    if (existingSkill) return;

    const newSkill: Skill = {
      id: Date.now().toString(),
      name: skillName,
      level: 'intermediate',
      category: skillCategory
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
      verificationUrl: '',
      description: ''
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

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: '',
      provider: '',
      date: '',
      description: '',
      hours: 0,
      skills: []
    };
    setResumeData(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setResumeData(prev => ({
      ...prev,
      courses: prev.courses.map(course => 
        course.id === id ? { ...course, [field]: value } : course
      )
    }));
  };

  const removeCourse = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.id !== id)
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

  const suggestedSkills = language === 'ar' ? getAllSkills_Ar() : getAllSkills();
  const filteredSkills = suggestedSkills.filter(skill => 
    skill.toLowerCase().includes(skillInput.toLowerCase()) && 
    !resumeData.skills.some(existingSkill => existingSkill.name === skill)
  ).slice(0, 8);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between bg-card rounded-lg p-4 shadow-sm">
        <div>
          <h2 className="text-hero gradient-text-hero">
            {mode === 'update' 
              ? (language === 'ar' ? 'تحديث السيرة الذاتية' : 'Update Resume')
              : (language === 'ar' ? 'إنشاء سيرة ذاتية جديدة' : 'Create New Resume')
            }
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
                {language === 'ar' ? 'حفظ' : 'Save'}
              </>
            )}
          </Button>
          <Button 
            onClick={() => onExport?.(resumeData)}
            className="bg-gradient-primary btn-gradient-hover flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Resume Builder Tabs */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'المعلومات' : 'Personal'}</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'الخبرة' : 'Experience'}</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'التعليم' : 'Education'}</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'المهارات' : 'Skills'}</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'الدورات' : 'Courses'}</span>
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'الشهادات' : 'Certificates'}</span>
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'أدخل معلوماتك الشخصية والمهنية الأساسية'
                      : 'Enter your basic personal and professional information'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{language === 'ar' ? 'الاسم الأول' : 'First Name'}</Label>
                      <Input
                        id="firstName"
                        value={resumeData.personalInfo.firstName}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                        }))}
                        placeholder={language === 'ar' ? 'الاسم الأول' : 'First Name'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{language === 'ar' ? 'اسم العائلة' : 'Last Name'}</Label>
                      <Input
                        id="lastName"
                        value={resumeData.personalInfo.lastName}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                        }))}
                        placeholder={language === 'ar' ? 'اسم العائلة' : 'Last Name'}
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
                        placeholder="your@email.com"
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
                      <Label htmlFor="location">{language === 'ar' ? 'المدينة' : 'City'}</Label>
                      <Select
                        value={resumeData.personalInfo.location}
                        onValueChange={(value) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, location: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'ar' ? 'اختر المدينة' : 'Select City'} />
                        </SelectTrigger>
                        <SelectContent>
                          {saudiCities.map(city => (
                            <SelectItem key={city.id} value={city.id}>
                              {language === 'ar' ? city.nameAr : city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">{language === 'ar' ? 'ملف LinkedIn' : 'LinkedIn Profile'}</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.linkedin || ''}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                        }))}
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>

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
                        ? 'اكتب ملخصاً مهنياً موجزاً يسلط الضوء على خبراتك ومهاراتك الرئيسية...'
                        : 'Write a brief professional summary highlighting your key experiences and skills...'
                      }
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {language === 'ar' ? 'الخبرة العملية' : 'Work Experience'}
                    </div>
                    <Button onClick={addExperience} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة خبرة' : 'Add Experience'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.experience.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{language === 'ar' ? 'لم تتم إضافة أي خبرة عملية بعد' : 'No work experience added yet'}</p>
                      <Button onClick={addExperience} variant="outline" className="mt-4">
                        {language === 'ar' ? 'إضافة خبرة عملية' : 'Add Work Experience'}
                      </Button>
                    </div>
                  ) : (
                    resumeData.experience.map((exp, index) => (
                      <Card key={exp.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium">
                            {language === 'ar' ? `الخبرة ${index + 1}` : `Experience ${index + 1}`}
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
                              placeholder={language === 'ar' ? 'مطور البرمجيات' : 'Software Developer'}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{language === 'ar' ? 'اسم الشركة' : 'Company'}</Label>
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
                          <div className="space-y-2">
                            <Label>{language === 'ar' ? 'تاريخ النهاية' : 'End Date'}</Label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              disabled={exp.current}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`current-${exp.id}`}
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              />
                              <Label htmlFor={`current-${exp.id}`}>
                                {language === 'ar' ? 'أعمل حالياً' : 'Currently working here'}
                              </Label>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Label>{language === 'ar' ? 'وصف المهام' : 'Job Description'}</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder={language === 'ar' 
                              ? 'صف مهامك ومسؤولياتك في هذا المنصب...'
                              : 'Describe your responsibilities and tasks in this role...'
                            }
                            className="min-h-[80px]"
                          />
                        </div>
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
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      {language === 'ar' ? 'التعليم' : 'Education'}
                    </div>
                    <Button onClick={addEducation} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة تعليم' : 'Add Education'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.education.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{language === 'ar' ? 'لم تتم إضافة أي مؤهلات تعليمية بعد' : 'No education added yet'}</p>
                      <Button onClick={addEducation} variant="outline" className="mt-4">
                        {language === 'ar' ? 'إضافة مؤهل تعليمي' : 'Add Education'}
                      </Button>
                    </div>
                  ) : (
                    resumeData.education.map((edu, index) => (
                      <Card key={edu.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium">
                            {language === 'ar' ? `التعليم ${index + 1}` : `Education ${index + 1}`}
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
                              placeholder={language === 'ar' ? 'بكالوريوس علوم الحاسب' : 'Bachelor of Computer Science'}
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
                              type="number"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                              placeholder="2024"
                            />
                          </div>
                        </div>
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
                    {language === 'ar' ? 'المهارات' : 'Skills'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'أضف مهاراتك التقنية والشخصية'
                      : 'Add your technical and soft skills'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Skill Section */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'المهارة' : 'Skill'}</Label>
                        <Input
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          placeholder={language === 'ar' ? 'أدخل اسم المهارة' : 'Enter skill name'}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addSkill();
                            }
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'المستوى' : 'Level'}</Label>
                        <Select value={skillLevel} onValueChange={(value: Skill['level']) => setSkillLevel(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">{language === 'ar' ? 'مبتدئ' : 'Beginner'}</SelectItem>
                            <SelectItem value="intermediate">{language === 'ar' ? 'متوسط' : 'Intermediate'}</SelectItem>
                            <SelectItem value="advanced">{language === 'ar' ? 'متقدم' : 'Advanced'}</SelectItem>
                            <SelectItem value="expert">{language === 'ar' ? 'خبير' : 'Expert'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'الفئة' : 'Category'}</Label>
                        <Select value={skillCategory} onValueChange={(value: Skill['category']) => setSkillCategory(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {skillCategories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {language === 'ar' ? category.nameAr : category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={addSkill} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'إضافة مهارة' : 'Add Skill'}
                    </Button>
                  </div>

                  {/* Suggested Skills */}
                  {filteredSkills.length > 0 && (
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'مهارات مقترحة' : 'Suggested Skills'}</Label>
                      <div className="flex flex-wrap gap-2">
                        {filteredSkills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => addPredefinedSkill(skill)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Skills */}
                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'المهارات المضافة' : 'Added Skills'}</Label>
                    {resumeData.skills.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>{language === 'ar' ? 'لم تتم إضافة أي مهارات بعد' : 'No skills added yet'}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {skillCategories.map(category => {
                          const categorySkills = resumeData.skills.filter(skill => skill.category === category.id);
                          if (categorySkills.length === 0) return null;
                          
                          return (
                            <div key={category.id} className="space-y-2">
                              <h4 className="text-sm font-medium text-muted-foreground">
                                {language === 'ar' ? category.nameAr : category.name}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {categorySkills.map((skill) => {
                                  const levelBadge = getSkillLevelBadge(skill.level);
                                  return (
                                    <div key={skill.id} className="flex items-center gap-1">
                                      <Badge variant={levelBadge.variant} className="flex items-center gap-1">
                                        {skill.name}
                                        <span className="text-xs opacity-75">({levelBadge.label})</span>
                                        <button
                                          onClick={() => removeSkill(skill.id)}
                                          className="ml-1 hover:text-destructive"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </Badge>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      {language === 'ar' ? 'الدورات التدريبية' : 'Training Courses'}
                    </div>
                    <Button onClick={addCourse} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة دورة' : 'Add Course'}
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'أضف الدورات التدريبية وورش العمل التي حضرتها'
                      : 'Add training courses and workshops you have attended'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.courses.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{language === 'ar' ? 'لم تتم إضافة أي دورات تدريبية بعد' : 'No courses added yet'}</p>
                      <Button onClick={addCourse} variant="outline" className="mt-4">
                        {language === 'ar' ? 'إضافة دورة تدريبية' : 'Add Training Course'}
                      </Button>
                    </div>
                  ) : (
                    resumeData.courses.map((course, index) => (
                      <Card key={course.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium">
                            {language === 'ar' ? `الدورة ${index + 1}` : `Course ${index + 1}`}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCourse(course.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{language === 'ar' ? 'اسم الدورة' : 'Course Title'}</Label>
                            <Input
                              value={course.title}
                              onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                              placeholder={language === 'ar' ? 'تطوير تطبيقات الويب' : 'Web Development Course'}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{language === 'ar' ? 'مقدم الدورة' : 'Provider'}</Label>
                            <Input
                              value={course.provider}
                              onChange={(e) => updateCourse(course.id, 'provider', e.target.value)}
                              placeholder={language === 'ar' ? 'معهد التدريب التقني' : 'Technical Training Institute'}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{language === 'ar' ? 'تاريخ الإكمال' : 'Completion Date'}</Label>
                            <Input
                              type="month"
                              value={course.date}
                              onChange={(e) => updateCourse(course.id, 'date', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{language === 'ar' ? 'عدد الساعات' : 'Hours'}</Label>
                            <Input
                              type="number"
                              value={course.hours || ''}
                              onChange={(e) => updateCourse(course.id, 'hours', parseInt(e.target.value) || 0)}
                              placeholder="40"
                            />
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Label>{language === 'ar' ? 'وصف الدورة' : 'Course Description'}</Label>
                          <Textarea
                            value={course.description || ''}
                            onChange={(e) => updateCourse(course.id, 'description', e.target.value)}
                            placeholder={language === 'ar' 
                              ? 'صف ما تعلمته في هذه الدورة...'
                              : 'Describe what you learned in this course...'
                            }
                            className="min-h-[60px]"
                          />
                        </div>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates">
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {language === 'ar' ? 'الشهادات المهنية' : 'Professional Certificates'}
                    </div>
                    <Button onClick={addCertificate} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة شهادة' : 'Add Certificate'}
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'أضف الشهادات المهنية والتراخيص المعتمدة'
                      : 'Add professional certificates and licensed credentials'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.certificates.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{language === 'ar' ? 'لم تتم إضافة أي شهادات مهنية بعد' : 'No certificates added yet'}</p>
                      <Button onClick={addCertificate} variant="outline" className="mt-4">
                        {language === 'ar' ? 'إضافة شهادة مهنية' : 'Add Professional Certificate'}
                      </Button>
                    </div>
                  ) : (
                    resumeData.certificates.map((cert, index) => (
                      <Card key={cert.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium">
                            {language === 'ar' ? `الشهادة ${index + 1}` : `Certificate ${index + 1}`}
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
                              placeholder={language === 'ar' ? 'شهادة AWS المعتمدة' : 'AWS Certified Solutions Architect'}
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
                            <Label>{language === 'ar' ? 'تاريخ الانتهاء (اختياري)' : 'Expiry Date (Optional)'}</Label>
                            <Input
                              type="month"
                              value={cert.expiryDate || ''}
                              onChange={(e) => updateCertificate(cert.id, 'expiryDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{language === 'ar' ? 'رقم الشهادة (اختياري)' : 'Credential ID (Optional)'}</Label>
                            <Input
                              value={cert.credentialId || ''}
                              onChange={(e) => updateCertificate(cert.id, 'credentialId', e.target.value)}
                              placeholder="ABC123456789"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{language === 'ar' ? 'رابط التحقق (اختياري)' : 'Verification URL (Optional)'}</Label>
                            <Input
                              value={cert.verificationUrl || ''}
                              onChange={(e) => updateCertificate(cert.id, 'verificationUrl', e.target.value)}
                              placeholder="https://verify.example.com"
                            />
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="card-vision">
            <CardHeader>
              <CardTitle className="text-lg">{language === 'ar' ? 'تقدم السيرة الذاتية' : 'Resume Progress'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{language === 'ar' ? 'المعلومات الشخصية' : 'Personal Info'}</span>
                  <CheckCircle className={`h-4 w-4 ${resumeData.personalInfo.firstName && resumeData.personalInfo.email ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{language === 'ar' ? 'الخبرة العملية' : 'Experience'}</span>
                  <CheckCircle className={`h-4 w-4 ${resumeData.experience.length > 0 ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{language === 'ar' ? 'التعليم' : 'Education'}</span>
                  <CheckCircle className={`h-4 w-4 ${resumeData.education.length > 0 ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{language === 'ar' ? 'المهارات' : 'Skills'}</span>
                  <CheckCircle className={`h-4 w-4 ${resumeData.skills.length > 0 ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="card-vision">
            <CardHeader>
              <CardTitle className="text-lg">{language === 'ar' ? 'نصائح' : 'Tips'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {language === 'ar' ? 'استخدم أفعال عمل قوية في وصف خبراتك' : 'Use strong action verbs in your experience descriptions'}</li>
                <li>• {language === 'ar' ? 'كن محدداً واذكر الأرقام والنتائج' : 'Be specific and include numbers and results'}</li>
                <li>• {language === 'ar' ? 'تأكد من صحة جميع المعلومات المدخلة' : 'Double-check all entered information for accuracy'}</li>
                <li>• {language === 'ar' ? 'اجعل ملخصك المهني مختصراً وجذاباً' : 'Keep your professional summary concise and compelling'}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderNew;