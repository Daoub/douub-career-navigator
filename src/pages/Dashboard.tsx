
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  Users, 
  Calendar, 
  Search, 
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Plus,
  Eye,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InterviewPrep from '@/components/InterviewPrep';
import TrialPackage from '@/components/TrialPackage';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear any user data/tokens here
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    // Navigate to home page
    navigate('/');
  };

  const quickStats = [
    { title: "طلبات التقديم", titleEn: "Applications", value: "12", icon: FileText, color: "text-blue-600" },
    { title: "عروض العمل", titleEn: "Job Offers", value: "3", icon: Briefcase, color: "text-green-600" },
    { title: "جلسات الاستشارة", titleEn: "Consultations", value: "2", icon: Calendar, color: "text-purple-600" },
    { title: "ملف التعريف", titleEn: "Profile Views", value: "156", icon: Eye, color: "text-orange-600" }
  ];

  const recentActivity = [
    { action: "تم تحديث السيرة الذاتية", time: "منذ ساعتين", icon: FileText },
    { action: "طلب توظيف جديد في شركة التقنية", time: "منذ 4 ساعات", icon: Briefcase },
    { action: "جلسة استشارة مع أحمد محمد", time: "أمس", icon: Calendar },
    { action: "انضمام لمجتمع المطورين", time: "منذ يومين", icon: Users }
  ];

  const upcomingEvents = [
    { title: "جلسة تحضير المقابلات", date: "الغد - 2:00 م", type: "استشارة" },
    { title: "ورشة بناء السيرة الذاتية", date: "الأحد - 10:00 ص", type: "ورشة عمل" },
    { title: "لقاء مجتمع المهنيين", date: "الثلاثاء - 7:00 م", type: "شبكة تواصل" }
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  دؤوب
                </h1>
                <p className="text-sm text-gray-600">لوحة التحكم</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4 rtl:space-x-reverse">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">مرحباً، أحمد!</h2>
          <p className="text-gray-600">إليك نظرة على نشاطك المهني اليوم</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">الإجراءات السريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/jobs">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Search className="mr-2 h-4 w-4" />
                  البحث عن وظائف
                </Button>
              </Link>
              <Link to="/resume">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <FileText className="mr-2 h-4 w-4" />
                  تحديث السيرة الذاتية
                </Button>
              </Link>
              <Link to="/communities">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Users className="mr-2 h-4 w-4" />
                  المجتمعات المهنية
                </Button>
              </Link>
              <Link to="/consultations">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  حجز استشارة
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trial Package - Takes full width on mobile */}
          <div className="lg:col-span-1">
            <TrialPackage />
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Interview Preparation */}
            <InterviewPrep />
            
            {/* Recent Activity & Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">النشاط الأخير</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="bg-gradient-to-r from-emerald-100 to-blue-100 p-2 rounded-full">
                          <activity.icon className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">الأحداث القادمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Clock className="h-4 w-4 text-emerald-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{event.title}</p>
                            <p className="text-xs text-gray-500">{event.date}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                          {event.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <Card className="bg-white/80 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">تقدمك المهني</CardTitle>
            <CardDescription>اكمل ملفك الشخصي لتحسين فرصك في الحصول على وظيفة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">اكتمال الملف الشخصي</span>
                <span className="text-sm text-emerald-600 font-medium">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-600 to-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">السيرة الذاتية مكتملة</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">إضافة صورة شخصية</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
