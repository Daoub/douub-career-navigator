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
  Save,
  Eye,
  Download,
  FileText,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { skillCategories, getAllSkills, getAllSkills_Ar } from '@/data/commonSkills';
import ResumeProgressCard from './ResumeProgressCard';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedIn?: string;
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

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
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
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedIn: '',
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

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      handleAutoSave();
    }, 30000);

    return () => clearTimeout(autoSave);
  }, [resumeData]);

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('resume_draft');
    if (savedDraft && mode === 'update') {
      try {
        const draft = JSON.parse(savedDraft);
        setResumeData(prev => ({ ...prev, ...draft }));
      } catch (error) {
        console.warn('Failed to load draft:', error);
      }
    }
  }, [mode]);

  const handleAutoSave = () => {
    try {
      localStorage.setItem('resume_draft', JSON.stringify(resumeData));
      localStorage.setItem('resume_autosave_timestamp', Date.now().toString());
    } catch (error) {
      console.warn('Auto-save failed:', error);
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
      
      // Save to localStorage
      localStorage.setItem('resume_saved', JSON.stringify(updatedData));
      
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

  // Experience functions
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

  // Education functions
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

  // Skills functions
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

  // Certificates functions
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

  // Courses functions
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

  const calculateProgress = () => {
    const requiredFields = [
      resumeData.personalInfo.name,
      resumeData.personalInfo.email,
      resumeData.personalInfo.summary,
      resumeData.experience.length > 0,
      resumeData.education.length > 0,
      resumeData.skills.length > 0
    ];
    const completed = requiredFields.filter(Boolean).length;
    return Math.round((completed / requiredFields.length) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
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
                        ? 'اكتب ملخصاً مهنياً عن خبراتك ومهاراتك...'
                        : 'Write a professional summary about your experience and skills...'
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
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        {language === 'ar' ? 'الخبرة المهنية' : 'Professional Experience'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'ar' 
                          ? 'أضف خبراتك المهنية والوظائف السابقة'
                          : 'Add your professional experience and previous jobs'
                        }
                      </CardDescription>
                    </div>
                    <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة خبرة' : 'Add Experience'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <Input
                            placeholder={language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'اسم الشركة' : 'Company Name'}
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'تاريخ البداية' : 'Start Date'}
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'تاريخ النهاية' : 'End Date'}
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeExperience(exp.id)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Textarea
                        placeholder={language === 'ar' ? 'وصف المسؤوليات والإنجازات...' : 'Describe responsibilities and achievements...'}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  ))}
                  
                  {resumeData.experience.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      {language === 'ar' ? 'لا توجد خبرات مضافة بعد' : 'No experience added yet'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card className="card-vision">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        {language === 'ar' ? 'التعليم' : 'Education'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'ar' 
                          ? 'أضف مؤهلاتك التعليمية والأكاديمية'
                          : 'Add your educational qualifications and academic background'
                        }
                      </CardDescription>
                    </div>
                    <Button onClick={addEducation} size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة تعليم' : 'Add Education'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <Input
                            placeholder={language === 'ar' ? 'الدرجة العلمية' : 'Degree'}
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'اسم الجامعة/المؤسسة' : 'Institution/University'}
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'سنة البداية' : 'Start Year'}
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'سنة التخرج' : 'Graduation Year'}
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeEducation(edu.id)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {resumeData.education.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      {language === 'ar' ? 'لا توجد مؤهلات تعليمية مضافة بعد' : 'No education added yet'}
                    </div>
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
                      ? 'أضف مهاراتك التقنية والمهنية'
                      : 'Add your technical and professional skills'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Skill Form */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      placeholder={language === 'ar' ? 'اسم المهارة' : 'Skill name'}
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                    />
                    <Select value={skillLevel} onValueChange={(value: Skill['level']) => setSkillLevel(value)}>
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
                    <Select value={skillCategory} onValueChange={(value: Skill['category']) => setSkillCategory(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'الفئة' : 'Category'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">{language === 'ar' ? 'تقنية' : 'Technical'}</SelectItem>
                        <SelectItem value="business">{language === 'ar' ? 'أعمال' : 'Business'}</SelectItem>
                        <SelectItem value="communication">{language === 'ar' ? 'تواصل' : 'Communication'}</SelectItem>
                        <SelectItem value="creative">{language === 'ar' ? 'إبداعية' : 'Creative'}</SelectItem>
                        <SelectItem value="languages">{language === 'ar' ? 'لغات' : 'Languages'}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addSkill} disabled={!skillInput.trim()}>
                      <Plus className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'إضافة' : 'Add'}
                    </Button>
                  </div>
                  
                  {/* Suggested Skills */}
                  {skillInput && filteredSkills.length > 0 && (
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'مهارات مقترحة:' : 'Suggested skills:'}</Label>
                      <div className="flex flex-wrap gap-2">
                        {filteredSkills.map((skill) => (
                          <Badge 
                            key={skill}
                            variant="outline" 
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => addPredefinedSkill(skill)}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Current Skills */}
                  <div className="space-y-4">
                    <Label>{language === 'ar' ? 'المهارات المضافة:' : 'Added skills:'}</Label>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => {
                        const levelBadge = getSkillLevelBadge(skill.level);
                        return (
                          <div key={skill.id} className="flex items-center gap-2 bg-muted p-2 rounded-lg">
                            <span className="font-medium">{skill.name}</span>
                            <Badge variant={levelBadge.variant} className="text-xs">
                              {levelBadge.label}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(skill.id)}
                              className="h-6 w-6 p-0 ml-2"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                    
                    {resumeData.skills.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        {language === 'ar' ? 'لا توجد مهارات مضافة بعد' : 'No skills added yet'}
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
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        {language === 'ar' ? 'الدورات التدريبية' : 'Training Courses'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'ar' 
                          ? 'أضف الدورات التدريبية والشهادات التي حصلت عليها'
                          : 'Add training courses and certifications you have completed'
                        }
                      </CardDescription>
                    </div>
                    <Button onClick={addCourse} size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة دورة' : 'Add Course'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.courses.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <Input
                            placeholder={language === 'ar' ? 'اسم الدورة' : 'Course Title'}
                            value={course.title}
                            onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'مقدم الدورة' : 'Course Provider'}
                            value={course.provider}
                            onChange={(e) => updateCourse(course.id, 'provider', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'تاريخ الإنجاز' : 'Completion Date'}
                            type="month"
                            value={course.date}
                            onChange={(e) => updateCourse(course.id, 'date', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'عدد الساعات' : 'Hours'}
                            type="number"
                            value={course.hours || ''}
                            onChange={(e) => updateCourse(course.id, 'hours', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeCourse(course.id)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {resumeData.courses.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      {language === 'ar' ? 'لا توجد دورات مضافة بعد' : 'No courses added yet'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates">
              <Card className="card-vision">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        {language === 'ar' ? 'الشهادات المهنية' : 'Professional Certificates'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'ar' 
                          ? 'أضف الشهادات المهنية والاعتمادات التي حصلت عليها'
                          : 'Add professional certificates and accreditations you have earned'
                        }
                      </CardDescription>
                    </div>
                    <Button onClick={addCertificate} size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {language === 'ar' ? 'إضافة شهادة' : 'Add Certificate'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.certificates.map((cert) => (
                    <div key={cert.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <Input
                            placeholder={language === 'ar' ? 'اسم الشهادة' : 'Certificate Name'}
                            value={cert.name}
                            onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'الجهة المانحة' : 'Issuing Organization'}
                            value={cert.issuer}
                            onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'تاريخ الحصول' : 'Issue Date'}
                            type="month"
                            value={cert.date}
                            onChange={(e) => updateCertificate(cert.id, 'date', e.target.value)}
                          />
                          <Input
                            placeholder={language === 'ar' ? 'تاريخ الانتهاء (اختياري)' : 'Expiry Date (Optional)'}
                            type="month"
                            value={cert.expiryDate || ''}
                            onChange={(e) => updateCertificate(cert.id, 'expiryDate', e.target.value)}
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeCertificate(cert.id)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {resumeData.certificates.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      {language === 'ar' ? 'لا توجد شهادات مضافة بعد' : 'No certificates added yet'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <ResumeProgressCard 
            title={language === 'ar' ? 'تقدم السيرة الذاتية' : 'Resume Progress'}
            progress={calculateProgress()}
            description={language === 'ar' 
              ? 'أكمل جميع الأقسام للحصول على سيرة ذاتية متكاملة'
              : 'Complete all sections for a comprehensive resume'
            }
          />

          {/* Tips Card */}
          <Card className="card-vision">
            <CardHeader>
              <CardTitle className="text-sm">{language === 'ar' ? 'نصائح' : 'Tips'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{language === 'ar' ? 'استخدم كلمات مفتاحية متعلقة بمجال عملك' : 'Use keywords relevant to your field'}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{language === 'ar' ? 'ركز على الإنجازات بدلاً من المسؤوليات' : 'Focus on achievements rather than responsibilities'}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{language === 'ar' ? 'استخدم أرقام ومقاييس عندما أمكن' : 'Use numbers and metrics when possible'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;