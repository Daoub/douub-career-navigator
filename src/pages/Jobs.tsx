
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase,
  Heart,
  Share2,
  Building2,
  Users,
  Calendar,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const jobCategories = [
    'الكل', 'التقنية', 'التسويق', 'المالية', 'الصحة', 'التعليم', 'الهندسة'
  ];

  const jobs = [
    {
      id: 1,
      title: 'مطور تطبيقات الهاتف المحمول',
      company: 'شركة التقنية المتقدمة',
      location: 'الرياض، السعودية',
      type: 'دوام كامل',
      salary: '8,000 - 12,000 ريال',
      posted: 'منذ يومين',
      description: 'نبحث عن مطور متخصص في تطبيقات الهاتف المحمول للانضمام لفريقنا...',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      category: 'التقنية'
    },
    {
      id: 2,
      title: 'أخصائي تسويق رقمي',
      company: 'وكالة الإبداع للتسويق',
      location: 'جدة، السعودية',
      type: 'دوام كامل',
      salary: '6,000 - 9,000 ريال',
      posted: 'منذ 3 أيام',
      description: 'مطلوب أخصائي تسويق رقمي لإدارة حملات التسويق الإلكتروني...',
      skills: ['Google Ads', 'Facebook Ads', 'SEO', 'Content Marketing'],
      category: 'التسويق'
    },
    {
      id: 3,
      title: 'محاسب مالي',
      company: 'مؤسسة الأعمال المالية',
      location: 'الدمام، السعودية',
      type: 'دوام جزئي',
      salary: '4,000 - 6,000 ريال',
      posted: 'منذ أسبوع',
      description: 'نحتاج محاسب مالي لإدارة الحسابات والتقارير المالية...',
      skills: ['Excel', 'SAP', 'Financial Analysis', 'Accounting'],
      category: 'المالية'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                <p className="text-sm text-gray-600">البحث عن الوظائف</p>
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
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="ابحث عن الوظائف، الشركات، أو المهارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-right pr-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              المزيد من الفلاتر
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {jobCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 
                  "bg-gradient-to-r from-emerald-600 to-blue-600" : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {filteredJobs.length} وظيفة متاحة
              </h2>
            </div>

            {filteredJobs.map((job) => (
              <Card key={job.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-800 mb-2">
                        {job.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Building2 className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{job.type}</Badge>
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">{job.salary}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                        تقديم الآن
                      </Button>
                      <Button variant="outline" className="flex-1">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-emerald-600" />
                  تنبيهات الوظائف
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  احصل على إشعارات فورية عند توفر وظائف تناسب مهاراتك
                </p>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600">
                  إنشاء تنبيه وظيفي
                </Button>
              </CardContent>
            </Card>

            {/* Career Tips */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>نصائح مهنية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <h4 className="font-medium text-emerald-800 mb-1">تطوير المهارات</h4>
                  <p className="text-sm text-emerald-600">استثمر في تعلم مهارات جديدة لتحسين فرص التوظيف</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">بناء الشبكة المهنية</h4>
                  <p className="text-sm text-blue-600">تواصل مع المهنيين في مجالك</p>
                </div>
              </CardContent>
            </Card>

            {/* Company Spotlight */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>شركات مميزة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">شركة التقنية المتقدمة</h4>
                    <p className="text-xs text-gray-500">5 وظائف شاغرة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">وكالة الإبداع للتسويق</h4>
                    <p className="text-xs text-gray-500">3 وظائف شاغرة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
