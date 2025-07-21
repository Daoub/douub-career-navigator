
import React, { Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, FileText, Users, Calendar, Search, TrendingUp, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load heavy components for better performance
const InterviewPrep = lazy(() => import('@/components/InterviewPrep'));
const TrialPackage = lazy(() => import('@/components/TrialPackage'));

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/');
  };

  const quickStats = [
    {
      title: "طلبات التقديم",
      value: "12",
      icon: FileText,
      trend: "+3",
      description: "هذا الشهر"
    },
    {
      title: "عروض العمل",
      value: "3",
      icon: Briefcase,
      trend: "+1",
      description: "قيد المراجعة"
    },
    {
      title: "معدل النجاح",
      value: "75%",
      icon: TrendingUp,
      trend: "+5%",
      description: "تحسن ملحوظ"
    },
    {
      title: "نقاط التميز",
      value: "890",
      icon: Award,
      trend: "+45",
      description: "نقطة جديدة"
    }
  ];

  const quickActions = [
    { title: "البحث عن وظائف", icon: Search, path: "/jobs", color: "from-primary to-primary-light" },
    { title: "تحديث السيرة", icon: FileText, path: "/resume", color: "from-success to-success-light" },
    { title: "المجتمعات", icon: Users, path: "/communities", color: "from-secondary to-secondary-light" }
  ];

  const recentActivity = [
    { action: "تم تحديث السيرة الذاتية", time: "منذ ساعتين", type: "success" },
    { action: "طلب توظيف جديد", time: "منذ 4 ساعات", type: "info" },
    { action: "جلسة استشارة", time: "أمس", type: "warning" }
  ];

  const profileProgress = 75;
  const profileTasks = [
    { task: "السيرة الذاتية", completed: true },
    { task: "الصورة الشخصية", completed: false },
    { task: "المهارات", completed: true },
    { task: "الشهادات", completed: false }
  ];

  return (
    <div className="min-h-screen bg-background pattern-geometric" dir="rtl">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Simplified Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">مرحباً، أحمد!</h1>
          <p className="text-muted-foreground">نظرة سريعة على نشاطك المهني</p>
        </div>

        {/* Optimized Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="card-vision">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-success font-medium">{stat.trend}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simplified Quick Actions */}
        <Card className="card-vision mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.path}>
                  <Button className={`w-full bg-gradient-to-r ${action.color} text-white hover:opacity-90`}>
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.title}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Progress - Simplified */}
          <Card className="card-vision">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">إكمال الملف الشخصي</CardTitle>
              <CardDescription>{profileProgress}% مكتمل</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={profileProgress} className="h-2" />
              <div className="space-y-2">
                {profileTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-success' : 'bg-muted'}`} />
                    <span className={task.completed ? 'text-foreground' : 'text-muted-foreground'}>
                      {task.task}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity - Simplified */}
          <Card className="card-vision">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">النشاط الأخير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-success' :
                    activity.type === 'warning' ? 'bg-warning' : 'bg-primary'
                  }`} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Enhanced Components - Lazy Loaded */}
          <div className="space-y-6">
            <Suspense fallback={<LoadingSpinner />}>
              <TrialPackage />
            </Suspense>
          </div>
        </div>

        {/* Additional Feature - Interview Prep */}
        <div className="mt-6">
          <Suspense fallback={<LoadingSpinner />}>
            <InterviewPrep />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
