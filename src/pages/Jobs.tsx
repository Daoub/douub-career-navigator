
import React, { useState, useMemo, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase,
  Bookmark,
  Eye,
  Building,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load heavy modals for better performance
const JobModal = lazy(() => import('@/components/JobModal'));
const JobApplicationModal = lazy(() => import('@/components/JobApplicationModal'));

const Jobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/');
  };

  const toggleBookmark = (jobId) => {
    const newBookmarked = new Set(bookmarkedJobs);
    if (newBookmarked.has(jobId)) {
      newBookmarked.delete(jobId);
    } else {
      newBookmarked.add(jobId);
    }
    setBookmarkedJobs(newBookmarked);
  };

  const jobCategories = [
    'الكل', 'التقنية', 'التسويق', 'المالية', 'الصحة', 'التعليم', 'الهندسة'
  ];

  const jobs = [
    {
      id: 1,
      title: 'مطور تطبيقات محمول - React Native',
      company: 'شركة التقنية المتقدمة',
      location: 'الرياض، السعودية',
      type: 'دوام كامل',
      salary: '8000 - 12000 ريال',
      posted: 'منذ يومين',
      description: 'نبحث عن مطور تطبيقات محمول متمرس في React Native لانضمام لفريقنا المتنامي في تطوير التطبيقات المتقدمة',
      requirements: ['خبرة 3+ سنوات في React Native', 'معرفة بـ JavaScript و TypeScript', 'خبرة في التطبيقات الهجينة', 'معرفة بـ Redux و Context API'],
      benefits: ['تأمين صحي شامل', 'بدل سكن', 'فرص تطوير مهني', 'عمل مرن', 'مكافآت أداء'],
      category: 'التقنية',
      skills: ['React Native', 'JavaScript', 'TypeScript', 'Redux'],
      experience: '3-5 سنوات',
      logo: '/placeholder.svg',
      isBookmarked: false,
      applicationDeadline: '2024-02-15',
      companySize: '100-500 موظف',
      industry: 'التكنولوجيا'
    },
    {
      id: 2,
      title: 'مصمم UI/UX',
      company: 'وكالة الإبداع الرقمي',
      location: 'جدة، السعودية',
      type: 'دوام جزئي',
      salary: '5000 - 8000 ريال',
      posted: 'منذ 4 أيام',
      description: 'مطلوب مصمم واجهات مستخدم مبدع لتصميم تطبيقات ومواقع حديثة ومبتكرة تركز على تجربة المستخدم',
      requirements: ['خبرة في Figma و Adobe XD', 'معرفة بأسس تجربة المستخدم', 'إبداع في التصميم', 'خبرة في التصميم المتجاوب'],
      benefits: ['مرونة في أوقات العمل', 'بيئة عمل إبداعية', 'مكافآت أداء', 'تدريب مستمر'],
      category: 'التصميم',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX'],
      experience: '2-4 سنوات',
      logo: '/placeholder.svg',
      isBookmarked: true,
      applicationDeadline: '2024-02-20',
      companySize: '50-100 موظف',
      industry: 'التسويق الرقمي'
    },
    {
      id: 3,
      title: 'محاسب مالي',
      company: 'مؤسسة الأعمال المالية',
      location: 'الدمام، السعودية',
      type: 'دوام جزئي',
      salary: '4000 - 6000 ريال',
      posted: 'منذ أسبوع',
      description: 'نحتاج محاسب مالي لإدارة الحسابات والتقارير المالية',
      requirements: ['شهادة محاسبة', 'خبرة في أنظمة ERP', 'معرفة بالقوانين المحاسبية السعودية', 'دقة في العمل'],
      benefits: ['راتب مجزي', 'تأمين طبي', 'إجازات', 'بيئة عمل مهنية'],
      category: 'المالية',
      skills: ['محاسبة', 'ERP', 'Excel', 'تحليل مالي'],
      experience: '3-5 سنوات',
      logo: '/placeholder.svg',
      isBookmarked: false,
      applicationDeadline: '2024-02-12',
      companySize: '20-50 موظف',
      industry: 'الخدمات المالية'
    }
  ];

  // Memoized filtering for better performance
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'الكل' || job.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, jobs]);

  return (
    <div className="min-h-screen bg-background pattern-geometric" dir="rtl">
      {/* Simplified Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text cursor-pointer"
                    onClick={() => navigate('/dashboard')}>
                  دؤوب
                </h1>
                <p className="text-sm text-muted-foreground">الوظائف</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              لوحة التحكم
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Compact Search */}
        <div className="mb-6">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="ابحث عن الوظائف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-right pr-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Simplified Category Filters */}
          <div className="flex flex-wrap gap-2">
            {jobCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Optimized Job Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Job Listings - Simplified Cards */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                {filteredJobs.length} وظيفة متاحة
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                مرتبة حسب الأحدث
              </div>
            </div>

            {filteredJobs.map((job) => (
              <Card key={job.id} className="card-vision hover:border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                        <Building className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 
                          className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowJobModal(true);
                          }}
                        >
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleBookmark(job.id)}
                      className={bookmarkedJobs.has(job.id) ? "text-warning" : ""}
                    >
                      <Bookmark className={`h-4 w-4 ${bookmarkedJobs.has(job.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{job.posted}</span>
                    </div>
                    <div className="flex items-center gap-1 text-success">
                      <DollarSign className="h-3 w-3" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowApplicationModal(true);
                      }}
                    >
                      تقديم الآن
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowJobModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Simplified Sidebar */}
          <div className="space-y-4">
            <Card className="card-vision">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">إحصائيات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{filteredJobs.length}</div>
                  <div className="text-xs text-muted-foreground">وظيفة متاحة</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-success">3</div>
                  <div className="text-xs text-muted-foreground">شركات مميزة</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-vision">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">نصيحة اليوم</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  احرص على تخصيص سيرتك الذاتية لكل وظيفة تتقدم لها
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Lazy-loaded Modals */}
      <Suspense fallback={<LoadingSpinner />}>
        <JobModal
          job={selectedJob}
          isOpen={showJobModal}
          onClose={() => setShowJobModal(false)}
          onApply={(jobId) => {
            setShowJobModal(false);
            setShowApplicationModal(true);
          }}
          onBookmark={toggleBookmark}
          isBookmarked={selectedJob ? bookmarkedJobs.has(selectedJob.id) : false}
        />

        <JobApplicationModal
          job={selectedJob}
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          onSubmit={(applicationData) => {
            // Handle application submission
            console.log('Application submitted:', applicationData);
          }}
        />
      </Suspense>
    </div>
  );
};

export default Jobs;
