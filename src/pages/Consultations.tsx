
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Video, 
  MessageCircle,
  Star,
  User,
  MapPin,
  DollarSign,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  Filter,
  Search,
  Phone,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Consultations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('الكل');

  const specialties = ['الكل', 'التقنية', 'إدارة الأعمال', 'التسويق', 'المالية', 'الموارد البشرية'];

  const consultants = [
    {
      id: 1,
      name: 'د. محمد العلي',
      specialty: 'التقنية',
      title: 'خبير تطوير البرمجيات',
      rating: 4.9,
      reviews: 127,
      experience: '15+ سنة',
      price: 200,
      languages: ['العربية', 'الإنجليزية'],
      avatar: '/placeholder.svg',
      isAvailable: true,
      nextAvailable: 'اليوم 3:00 م'
    },
    {
      id: 2,
      name: 'أ. سارة أحمد',
      specialty: 'إدارة الأعمال',
      title: 'استشارية إدارة الأعمال',
      rating: 4.8,
      reviews: 89,
      experience: '12+ سنة',
      price: 180,
      languages: ['العربية', 'الإنجليزية'],
      avatar: '/placeholder.svg',
      isAvailable: false,
      nextAvailable: 'غداً 10:00 ص'
    },
    {
      id: 3,
      name: 'م. عبدالله محمد',
      specialty: 'التسويق',
      title: 'خبير التسويق الرقمي',
      rating: 4.7,
      reviews: 156,
      experience: '10+ سنوات',
      price: 150,
      languages: ['العربية'],
      avatar: '/placeholder.svg',
      isAvailable: true,
      nextAvailable: 'اليوم 5:00 م'
    }
  ];

  const upcomingConsultations = [
    {
      id: 1,
      consultant: 'د. محمد العلي',
      title: 'استشارة تطوير التطبيقات',
      date: '2024-01-15',
      time: '15:00',
      duration: 60,
      type: 'video',
      status: 'confirmed'
    },
    {
      id: 2,
      consultant: 'أ. سارة أحمد',
      title: 'مراجعة خطة العمل',
      date: '2024-01-18',
      time: '10:00',
      duration: 45,
      type: 'call',
      status: 'pending'
    }
  ];

  const pastConsultations = [
    {
      id: 1,
      consultant: 'م. عبدالله محمد',
      title: 'استراتيجية التسويق الرقمي',
      date: '2024-01-10',
      duration: 60,
      rating: 5,
      feedback: 'استشارة ممتازة وقيمة جداً'
    }
  ];

  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'الكل' || consultant.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
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
                <p className="text-sm text-gray-600">الاستشارات المهنية</p>
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
        <Tabs defaultValue="find" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="find">البحث عن مستشار</TabsTrigger>
            <TabsTrigger value="upcoming">الاستشارات القادمة</TabsTrigger>
            <TabsTrigger value="history">السجل</TabsTrigger>
          </TabsList>

          <TabsContent value="find" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="ابحث عن المستشارين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-right pr-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                فلترة متقدمة
              </Button>
            </div>

            {/* Specialty Filters */}
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={selectedSpecialty === specialty ? 
                    "bg-gradient-to-r from-emerald-600 to-blue-600" : ""
                  }
                >
                  {specialty}
                </Button>
              ))}
            </div>

            {/* Consultants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConsultants.map((consultant) => (
                <Card key={consultant.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{consultant.name}</CardTitle>
                        <p className="text-sm text-gray-600">{consultant.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{consultant.rating}</span>
                          <span className="text-sm text-gray-500">({consultant.reviews} تقييم)</span>
                        </div>
                      </div>
                      {consultant.isAvailable && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          متاح
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">التخصص:</span>
                        <Badge variant="outline">{consultant.specialty}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">الخبرة:</span>
                        <span>{consultant.experience}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">السعر:</span>
                        <div className="flex items-center gap-1 text-green-600 font-medium">
                          <DollarSign className="h-4 w-4" />
                          <span>{consultant.price} ريال/ساعة</span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">اللغات: </span>
                        <span>{consultant.languages.join(', ')}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">متاح التالي: </span>
                        <span className="font-medium">{consultant.nextAvailable}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600">
                        حجز استشارة
                      </Button>
                      <Button variant="outline" size="sm">
                        الملف
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">الاستشارات القادمة</h2>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600">
                حجز استشارة جديدة
              </Button>
            </div>

            {upcomingConsultations.length > 0 ? (
              <div className="space-y-4">
                {upcomingConsultations.map((consultation) => (
                  <Card key={consultation.id} className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-2">{consultation.title}</h3>
                          <p className="text-gray-600 mb-3">مع {consultation.consultant}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{consultation.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{consultation.time} ({consultation.duration} دقيقة)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {consultation.type === 'video' ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <Phone className="h-4 w-4" />
                              )}
                              <span>{consultation.type === 'video' ? 'مكالمة فيديو' : 'مكالمة هاتفية'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={consultation.status === 'confirmed' ? 'default' : 'secondary'}
                            className={consultation.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {consultation.status === 'confirmed' ? 'مؤكدة' : 'في الانتظار'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            التفاصيل
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد استشارات قادمة</h3>
                  <p className="text-gray-600 mb-4">احجز استشارة مع أحد الخبراء لتطوير مهاراتك المهنية</p>
                  <Button className="bg-gradient-to-r from-emerald-600 to-blue-600">
                    ابحث عن مستشار
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">سجل الاستشارات السابقة</h2>

            {pastConsultations.length > 0 ? (
              <div className="space-y-4">
                {pastConsultations.map((consultation) => (
                  <Card key={consultation.id} className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-2">{consultation.title}</h3>
                          <p className="text-gray-600 mb-2">مع {consultation.consultant}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{consultation.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{consultation.duration} دقيقة</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < consultation.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{consultation.feedback}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          إعادة حجز
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">لا يوجد سجل استشارات</h3>
                  <p className="text-gray-600">ستظهر هنا الاستشارات التي أكملتها</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Consultations;
