import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Plus, 
  Search,
  Filter,
  MapPin,
  Globe,
  LogOut,
  Home,
  Briefcase,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Meetings = () => {
  const { language, t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/');
  };

  const categories = ['الكل', 'تطوير البرمجيات', 'التصميم', 'التسويق', 'الأعمال', 'الهندسة'];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'جلسة تطوير تطبيقات الموبايل',
      community: 'مطوري التطبيقات',
      date: '2024-01-20',
      time: '20:00',
      duration: '90 دقيقة',
      participants: 45,
      maxParticipants: 50,
      type: 'online',
      speaker: 'أحمد محمود',
      description: 'مناقشة أحدث التقنيات في تطوير تطبيقات الموبايل باستخدام React Native',
      category: 'تطوير البرمجيات'
    },
    {
      id: 2,
      title: 'ورشة تصميم تجربة المستخدم',
      community: 'مصممي UX/UI',
      date: '2024-01-22',
      time: '19:30',
      duration: '120 دقيقة',
      participants: 32,
      maxParticipants: 40,
      type: 'online',
      speaker: 'سارة أحمد',
      description: 'تعلم أساسيات تصميم تجربة المستخدم وأفضل الممارسات',
      category: 'التصميم'
    },
    {
      id: 3,
      title: 'استراتيجيات التسويق الرقمي',
      community: 'خبراء التسويق',
      date: '2024-01-25',
      time: '21:00',
      duration: '75 دقيقة',
      participants: 28,
      maxParticipants: 35,
      type: 'online',
      speaker: 'محمد علي',
      description: 'كيفية بناء استراتيجية تسويق رقمي فعالة في 2024',
      category: 'التسويق'
    }
  ];

  const pastMeetings = [
    {
      id: 4,
      title: 'مقدمة في الذكاء الاصطناعي',
      community: 'مطوري الذكاء الاصطناعي',
      date: '2024-01-15',
      time: '20:00',
      duration: '100 دقيقة',
      participants: 60,
      rating: 4.8,
      recording: true,
      category: 'تطوير البرمجيات'
    },
    {
      id: 5,
      title: 'إدارة المشاريع التقنية',
      community: 'مديري المشاريع',
      date: '2024-01-12',
      time: '19:00',
      duration: '90 دقيقة',
      participants: 35,
      rating: 4.6,
      recording: true,
      category: 'الأعمال'
    }
  ];

  const myMeetings = upcomingMeetings.filter(meeting => [1, 3].includes(meeting.id));

  const filteredMeetings = upcomingMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.community.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || meeting.category === selectedCategory;
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
                <Link to="/meetings" className="flex items-center gap-2 text-primary font-medium">
                  <Video className="h-4 w-4" />
                  الاجتماعات
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
                الاجتماعات الأسبوعية
              </h1>
              <p className="text-muted-foreground">
                انضم إلى الاجتماعات المهنية وطور مهاراتك مع خبراء المجال
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              إضافة اجتماع
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في الاجتماعات..."
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

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">الاجتماعات القادمة</TabsTrigger>
            <TabsTrigger value="my-meetings">اجتماعاتي</TabsTrigger>
            <TabsTrigger value="past">الاجتماعات السابقة</TabsTrigger>
          </TabsList>

          {/* Upcoming Meetings */}
          <TabsContent value="upcoming">
            <div className="grid gap-6">
              {filteredMeetings.map(meeting => (
                <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{meeting.title}</CardTitle>
                        <CardDescription className="text-sm mb-3">
                          {meeting.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {meeting.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meeting.time} ({meeting.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {meeting.participants}/{meeting.maxParticipants}
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            أونلاين
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{meeting.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{meeting.speaker.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{meeting.speaker}</p>
                          <p className="text-xs text-muted-foreground">{meeting.community}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          تفاصيل
                        </Button>
                        <Button size="sm" className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          انضم
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Meetings */}
          <TabsContent value="my-meetings">
            <div className="grid gap-6">
              {myMeetings.map(meeting => (
                <Card key={meeting.id} className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {meeting.title}
                          <Badge variant="default" className="text-xs">مسجل</Badge>
                        </CardTitle>
                        <CardDescription className="text-sm mb-3">
                          {meeting.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {meeting.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meeting.time} ({meeting.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {meeting.participants}/{meeting.maxParticipants}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{meeting.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{meeting.speaker.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{meeting.speaker}</p>
                          <p className="text-xs text-muted-foreground">{meeting.community}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          إضافة للتقويم
                        </Button>
                        <Button size="sm" className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          انضم الآن
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Past Meetings */}
          <TabsContent value="past">
            <div className="grid gap-6">
              {pastMeetings.map(meeting => (
                <Card key={meeting.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {meeting.title}
                          {meeting.recording && (
                            <Badge variant="outline" className="text-xs">
                              متاح التسجيل
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {meeting.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meeting.time} ({meeting.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {meeting.participants} مشارك
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">التقييم:</span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{meeting.rating}</span>
                            <span className="text-yellow-500">★</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{meeting.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        مجتمع: {meeting.community}
                      </div>
                      <div className="flex gap-2">
                        {meeting.recording && (
                          <Button variant="outline" size="sm">
                            مشاهدة التسجيل
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          تقييم الاجتماع
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Meetings;