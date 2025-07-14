
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
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResumeAnalyzer from '@/components/ResumeAnalyzer';

const Resume = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/');
  };
  const [resumeData, setResumeData] = useState({
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
        duration: '2022 - الحاضر',
        description: 'تطوير وصيانة تطبيقات الويب باستخدام React و Node.js'
      }
    ],
    education: [
      {
        degree: 'بكالوريوس علوم الحاسوب',
        institution: 'جامعة الملك سعود',
        year: '2019',
        gpa: '3.8/4.0'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    certificates: [
      {
        name: 'شهادة AWS المطور المعتمد',
        issuer: 'Amazon Web Services',
        year: '2023'
      }
    ]
  });

  const templates = [
    { id: 1, name: 'النموذج الكلاسيكي', preview: '/placeholder.svg' },
    { id: 2, name: 'النموذج الحديث', preview: '/placeholder.svg' },
    { id: 3, name: 'النموذج الإبداعي', preview: '/placeholder.svg' },
    { id: 4, name: 'النموذج المهني', preview: '/placeholder.svg' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-2 rounded-lg">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <Link to="/dashboard">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                    دؤوب
                  </h1>
                </Link>
                <p className="text-sm text-gray-600">بناء السيرة الذاتية</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">لوحة التحكم</Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Builder */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">بناء السيرة الذاتية</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  معاينة
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  حفظ
                </Button>
                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  تحميل PDF
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
                <TabsTrigger value="experience">الخبرة</TabsTrigger>
                <TabsTrigger value="education">التعليم</TabsTrigger>
                <TabsTrigger value="skills">المهارات</TabsTrigger>
                <TabsTrigger value="certificates">الشهادات</TabsTrigger>
                <TabsTrigger value="analysis">التحليل الذكي</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-emerald-600" />
                      المعلومات الشخصية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                        <Input 
                          value={resumeData.personalInfo.name}
                          className="text-right"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                        <Input 
                          value={resumeData.personalInfo.email}
                          className="text-right"
                          placeholder="أدخل بريدك الإلكتروني"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                        <Input 
                          value={resumeData.personalInfo.phone}
                          className="text-right"
                          placeholder="أدخل رقم هاتفك"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
                        <Input 
                          value={resumeData.personalInfo.location}
                          className="text-right"
                          placeholder="المدينة، البلد"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الملخص المهني</label>
                      <Textarea 
                        value={resumeData.personalInfo.summary}
                        className="text-right"
                        placeholder="اكتب ملخصاً مختصراً عن خبراتك ومهاراتك"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-emerald-600" />
                        الخبرة المهنية
                      </CardTitle>
                      <Button size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        إضافة خبرة
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">المسمى الوظيفي</label>
                            <Input value={exp.title} className="text-right" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشركة</label>
                            <Input value={exp.company} className="text-right" />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">فترة العمل</label>
                          <Input value={exp.duration} className="text-right" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">وصف المهام</label>
                          <Textarea value={exp.description} className="text-right" rows={3} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-emerald-600" />
                        التعليم
                      </CardTitle>
                      <Button size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        إضافة تعليم
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">الدرجة العلمية</label>
                            <Input value={edu.degree} className="text-right" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">اسم المؤسسة</label>
                            <Input value={edu.institution} className="text-right" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">سنة التخرج</label>
                            <Input value={edu.year} className="text-right" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">المعدل التراكمي</label>
                            <Input value={edu.gpa} className="text-right" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-emerald-600" />
                      المهارات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">إضافة مهارة جديدة</label>
                        <div className="flex gap-2">
                          <Input placeholder="اكتب اسم المهارة" className="text-right" />
                          <Button size="sm">إضافة</Button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">المهارات الحالية</label>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certificates" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-emerald-600" />
                        الشهادات والدورات
                      </CardTitle>
                      <Button size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        إضافة شهادة
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.certificates.map((cert, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشهادة</label>
                            <Input value={cert.name} className="text-right" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">الجهة المانحة</label>
                            <Input value={cert.issuer} className="text-right" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">سنة الحصول</label>
                            <Input value={cert.year} className="text-right" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <ResumeAnalyzer />
              </TabsContent>
            </Tabs>
          </div>

          {/* Templates and Preview */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>قوالب السيرة الذاتية</CardTitle>
                <CardDescription>اختر القالب المناسب لمجالك المهني</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <div key={template.id} className="relative group cursor-pointer">
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-emerald-500 transition-colors">
                        <div className="p-4 h-full flex items-center justify-center">
                          <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-xs text-center mt-2 font-medium">{template.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>نصائح لبناء سيرة ذاتية مميزة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <h4 className="font-medium text-emerald-800 mb-1">اجعلها مختصرة</h4>
                  <p className="text-sm text-emerald-600">صفحتان كحد أقصى للخبرة أقل من 10 سنوات</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">اذكر الإنجازات</h4>
                  <p className="text-sm text-blue-600">ركز على النتائج والأرقام المحققة</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-1">خصص المحتوى</h4>
                  <p className="text-sm text-purple-600">اجعل السيرة متوافقة مع الوظيفة المطلوبة</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
