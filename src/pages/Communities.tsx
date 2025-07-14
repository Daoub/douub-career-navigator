
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  MapPin,
  Plus,
  Search,
  Filter,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  User,
  Heart,
  Share2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Communities = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/');
  };
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', 'التقنية', 'التسويق', 'ريادة الأعمال', 'التصميم', 'المالية'];

  const communities = [
    {
      id: 1,
      name: 'مجتمع المطورين السعوديين',
      description: 'مجتمع لتبادل الخبرات والمعرفة في مجال البرمجة والتطوير',
      members: 1250,
      posts: 890,
      category: 'التقنية',
      image: '/placeholder.svg',
      isJoined: true
    },
    {
      id: 2,
      name: 'رواد الأعمال الشباب',
      description: 'منصة لدعم ومساعدة رواد الأعمال الناشئين',
      members: 850,
      posts: 432,
      category: 'ريادة الأعمال',
      image: '/placeholder.svg',
      isJoined: false
    },
    {
      id: 3,
      name: 'مصممي الجرافيك المحترفين',
      description: 'مجتمع للمصممين لمشاركة الأعمال والحصول على التغذية الراجعة',
      members: 680,
      posts: 1200,
      category: 'التصميم',
      image: '/placeholder.svg',
      isJoined: true
    }
  ];

  const events = [
    {
      id: 1,
      title: 'ورشة تطوير تطبيقات React',
      community: 'مجتمع المطورين السعوديين',
      date: '2024-01-20',
      time: '19:00',
      location: 'أونلاين',
      attendees: 45
    },
    {
      id: 2,
      title: 'لقاء رواد الأعمال الشهري',
      community: 'رواد الأعمال الشباب',
      date: '2024-01-25',
      time: '18:00',
      location: 'الرياض',
      attendees: 32
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'أفضل الممارسات في تطوير APIs',
      author: 'محمد أحمد',
      community: 'مجتمع المطورين السعوديين',
      replies: 23,
      likes: 45,
      time: 'منذ ساعتين'
    },
    {
      id: 2,
      title: 'كيفية الحصول على تمويل للمشاريع الناشئة',
      author: 'سارة محمد',
      community: 'رواد الأعمال الشباب',
      replies: 18,
      likes: 32,
      time: 'منذ 4 ساعات'
    }
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || community.category === selectedCategory;
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
                <p className="text-sm text-gray-600">المجتمعات المهنية</p>
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
        <Tabs defaultValue="communities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="communities">المجتمعات</TabsTrigger>
            <TabsTrigger value="discussions">النقاشات</TabsTrigger>
            <TabsTrigger value="events">الأحداث</TabsTrigger>
          </TabsList>

          <TabsContent value="communities" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="ابحث في المجتمعات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-right pr-10"
                />
              </div>
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  إنشاء مجتمع
                </Button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
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

            {/* Communities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <Card key={community.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {community.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{community.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{community.members}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{community.posts}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {community.isJoined ? (
                        <Button variant="outline" className="flex-1">
                          انضممت بالفعل
                        </Button>
                      ) : (
                        <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600">
                          انضم للمجتمع
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        عرض
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">أحدث النقاشات</h2>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                بدء نقاش جديد
              </Button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 mb-2">{discussion.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{discussion.author}</span>
                          </div>
                          <span>في {discussion.community}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-500">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion.replies} رد</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Heart className="h-4 w-4" />
                            <span>{discussion.likes} إعجاب</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">الأحداث القادمة</h2>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إنشاء حدث
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.community}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date} - {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} مشارك</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600">
                        الحضور
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
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

export default Communities;
