import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  PlayCircle, 
  Award, 
  Clock, 
  Users, 
  Star,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Circle,
  LogOut,
  Home,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Video,
  Target,
  TrendingUp
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Learning = () => {
  const { language, t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/');
  };

  const categories = ['الكل', 'تطوير البرمجيات', 'التصميم', 'التسويق', 'الأعمال', 'الهندسة', 'إدارة المشاريع'];

  const specializations = [
    {
      id: 1,
      title: 'تطوير تطبيقات الويب المتقدم',
      description: 'تعلم تطوير تطبيقات الويب الحديثة باستخدام React و Node.js',
      category: 'تطوير البرمجيات',
      level: 'متقدم',
      duration: '12 أسبوع',
      modules: 8,
      enrolled: 1250,
      rating: 4.9,
      price: 'مجاني',
      instructor: 'أحمد محمود',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      certified: true,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'تصميم تجربة المستخدم (UX)',
      description: 'دورة شاملة في تصميم تجربة المستخدم وأبحاث المستخدمين',
      category: 'التصميم',
      level: 'مبتدئ',
      duration: '8 أسابيع',
      modules: 6,
      enrolled: 890,
      rating: 4.8,
      price: 'مجاني',
      instructor: 'سارة أحمد',
      skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
      certified: true,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'التسويق الرقمي المتكامل',
      description: 'استراتيجيات التسويق الرقمي ووسائل التواصل الاجتماعي',
      category: 'التسويق',
      level: 'متوسط',
      duration: '10 أسابيع',
      modules: 7,
      enrolled: 675,
      rating: 4.7,
      price: 'مجاني',
      instructor: 'محمد علي',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
      certified: true,
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'إدارة المشاريع التقنية',
      description: 'تعلم إدارة المشاريع التقنية باستخدام منهجيات Agile و Scrum',
      category: 'إدارة المشاريع',
      level: 'متوسط',
      duration: '6 أسابيع',
      modules: 5,
      enrolled: 420,
      rating: 4.6,
      price: 'مجاني',
      instructor: 'ليلى حسن',
      skills: ['Scrum', 'Agile', 'Jira', 'Project Planning'],
      certified: true,
      image: '/placeholder.svg'
    }
  ];

  const myLearning = [
    {
      id: 1,
      title: 'تطوير تطبيقات الويب المتقدم',
      progress: 65,
      currentModule: 'إدارة الحالة مع Redux',
      nextDeadline: '2024-01-25',
      totalModules: 8,
      completedModules: 5,
      timeSpent: '45 ساعة',
      status: 'جاري'
    },
    {
      id: 3,
      title: 'التسويق الرقمي المتكامل',
      progress: 30,
      currentModule: 'استراتيجيات المحتوى',
      nextDeadline: '2024-01-22',
      totalModules: 7,
      completedModules: 2,
      timeSpent: '18 ساعة',
      status: 'جاري'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'خبير React',
      description: 'أكمل دورة تطوير React المتقدمة',
      date: '2024-01-10',
      type: 'شهادة'
    },
    {
      id: 2,
      title: 'مصمم UX محترف',
      description: 'حصل على شهادة في تصميم تجربة المستخدم',
      date: '2023-12-15',
      type: 'شهادة'
    },
    {
      id: 3,
      title: 'متعلم نشط',
      description: 'أكمل 100 ساعة تعلم في الشهر',
      date: '2024-01-01',
      type: 'إنجاز'
    }
  ];

  const filteredSpecializations = specializations.filter(spec => {
    const matchesSearch = spec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spec.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || spec.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="flex items-center gap-2 text-primary font-bold text-xl">
                <GraduationCap className="h-6 w-6" />
                مهنتي
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                  الرئيسية
                </Link>
                <Link to="/jobs" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Briefcase className="h-4 w-4" />
                  الوظائف
                </Link>
                <Link to="/communities" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  المجتمعات
                </Link>
                <Link to="/meetings" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Video className="h-4 w-4" />
                  الاجتماعات
                </Link>
                <Link to="/learning" className="flex items-center gap-2 text-primary font-medium">
                  <BookOpen className="h-4 w-4" />
                  التعلم
                </Link>
              </nav>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                التعلم والتخصصات
              </h1>
              <p className="text-muted-foreground">
                طور مهاراتك واحصل على شهادات معتمدة في مجالك المهني
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              اقترح تخصص
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في التخصصات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">دورات جارية</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">شهادات مكتملة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">63</p>
                  <p className="text-sm text-muted-foreground">ساعة تعلم</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">معدل الإكمال</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">استكشاف التخصصات</TabsTrigger>
            <TabsTrigger value="my-learning">تعلمي الحالي</TabsTrigger>
            <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
            <TabsTrigger value="certificates">الشهادات</TabsTrigger>
          </TabsList>

          {/* Browse Specializations */}
          <TabsContent value="browse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecializations.map(spec => (
                <Card key={spec.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{spec.category}</Badge>
                      <Badge variant={spec.level === 'مبتدئ' ? 'default' : spec.level === 'متوسط' ? 'secondary' : 'destructive'}>
                        {spec.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{spec.title}</CardTitle>
                    <CardDescription>{spec.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {spec.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {spec.modules} وحدات
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {spec.enrolled}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{spec.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">بواسطة {spec.instructor}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {spec.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {spec.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{spec.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">{spec.price}</span>
                        {spec.certified && (
                          <Badge variant="outline" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            شهادة
                          </Badge>
                        )}
                      </div>
                      <Button size="sm">ابدأ التعلم</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Learning */}
          <TabsContent value="my-learning">
            <div className="space-y-6">
              {myLearning.map(course => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="mt-2">
                          الوحدة الحالية: {course.currentModule}
                        </CardDescription>
                      </div>
                      <Badge variant={course.status === 'جاري' ? 'default' : 'secondary'}>
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>التقدم</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">الوحدات المكتملة</p>
                        <p className="font-medium">{course.completedModules}/{course.totalModules}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">الوقت المستغرق</p>
                        <p className="font-medium">{course.timeSpent}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">الموعد التالي</p>
                        <p className="font-medium">{course.nextDeadline}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          عرض التقدم
                        </Button>
                        <Button size="sm">
                          متابعة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements">
            <div className="grid gap-4">
              {achievements.map(achievement => (
                <Card key={achievement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                      </div>
                      <Badge variant={achievement.type === 'شهادة' ? 'default' : 'secondary'}>
                        {achievement.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certificates */}
          <TabsContent value="certificates">
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">شهادات معتمدة</h3>
              <p className="text-muted-foreground mb-6">
                اكمل التخصصات للحصول على شهادات معتمدة من منصتنا
              </p>
              <Button>استكشاف التخصصات</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learning;