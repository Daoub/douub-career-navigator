export interface Meeting {
  id: number;
  title: string;
  community: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  maxParticipants: number;
  speaker: string;
  description: string;
  category: string;
  type: 'online' | 'offline';
  status?: 'upcoming' | 'ongoing' | 'completed';
  tags?: string[];
  level?: 'مبتدئ' | 'متوسط' | 'متقدم';
  rating?: number;
  recording?: boolean;
  materials?: string[];
}

export const upcomingMeetings: Meeting[] = [
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
    description: 'مناقشة أحدث التقنيات في تطوير تطبيقات الموبايل باستخدام React Native والـ Flutter',
    category: 'تطوير البرمجيات',
    level: 'متوسط',
    tags: ['React Native', 'Flutter', 'Mobile Development'],
    materials: ['الكود المصدري', 'العرض التقديمي', 'مراجع إضافية']
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
    description: 'تعلم أساسيات تصميم تجربة المستخدم وأفضل الممارسات في البحث والتصميم',
    category: 'التصميم',
    level: 'مبتدئ',
    tags: ['UX Design', 'User Research', 'Prototyping'],
    materials: ['ملف التصميم', 'أدوات البحث', 'قوالب جاهزة']
  },
  {
    id: 3,
    title: 'استراتيجيات التسويق الرقمي 2024',
    community: 'خبراء التسويق',
    date: '2024-01-25',
    time: '21:00',
    duration: '75 دقيقة',
    participants: 28,
    maxParticipants: 35,
    type: 'online',
    speaker: 'محمد علي',
    description: 'كيفية بناء استراتيجية تسويق رقمي فعالة في 2024 مع التركيز على الذكاء الاصطناعي',
    category: 'التسويق',
    level: 'متقدم',
    tags: ['Digital Marketing', 'AI Marketing', 'Strategy'],
    materials: ['خطة التسويق', 'أدوات التحليل', 'حالات دراسية']
  },
  {
    id: 4,
    title: 'مقدمة في علم البيانات',
    community: 'علماء البيانات',
    date: '2024-01-28',
    time: '19:00',
    duration: '100 دقيقة',
    participants: 55,
    maxParticipants: 60,
    type: 'online',
    speaker: 'دكتور خالد الأحمد',
    description: 'أساسيات علم البيانات وكيفية تحليل البيانات الضخمة باستخدام Python',
    category: 'تطوير البرمجيات',
    level: 'مبتدئ',
    tags: ['Data Science', 'Python', 'Analytics'],
    materials: ['مجموعة البيانات', 'كود Python', 'أدوات التحليل']
  },
  {
    id: 5,
    title: 'ريادة الأعمال التقنية',
    community: 'رواد الأعمال',
    date: '2024-01-30',
    time: '20:30',
    duration: '90 دقيقة',
    participants: 38,
    maxParticipants: 45,
    type: 'online',
    speaker: 'عمر السالم',
    description: 'كيفية بناء شركة ناشئة تقنية ناجحة من الفكرة إلى التنفيذ',
    category: 'الأعمال',
    level: 'متوسط',
    tags: ['Entrepreneurship', 'Startup', 'Business'],
    materials: ['نموذج العمل', 'خطة العمل', 'مصادر التمويل']
  }
];

export const pastMeetings: Meeting[] = [
  {
    id: 6,
    title: 'مقدمة في الذكاء الاصطناعي',
    community: 'مطوري الذكاء الاصطناعي',
    date: '2024-01-15',
    time: '20:00',
    duration: '100 دقيقة',
    participants: 60,
    maxParticipants: 60,
    type: 'online',
    speaker: 'دكتور أحمد المحمود',
    description: 'مقدمة شاملة في الذكاء الاصطناعي وتطبيقاته المختلفة',
    category: 'تطوير البرمجيات',
    level: 'متوسط',
    rating: 4.8,
    recording: true,
    status: 'completed',
    tags: ['AI', 'Machine Learning', 'Deep Learning'],
    materials: ['التسجيل', 'العرض التقديمي', 'أكواد الأمثلة']
  },
  {
    id: 7,
    title: 'إدارة المشاريع التقنية',
    community: 'مديري المشاريع',
    date: '2024-01-12',
    time: '19:00',
    duration: '90 دقيقة',
    participants: 35,
    maxParticipants: 40,
    type: 'online',
    speaker: 'ليلى حسن',
    description: 'أساسيات إدارة المشاريع التقنية باستخدام منهجيات Agile',
    category: 'الأعمال',
    level: 'متوسط',
    rating: 4.6,
    recording: true,
    status: 'completed',
    tags: ['Project Management', 'Agile', 'Scrum'],
    materials: ['التسجيل', 'قوالب إدارة المشاريع', 'أدوات التتبع']
  },
  {
    id: 8,
    title: 'تطوير واجهات المستخدم الحديثة',
    community: 'مطوري الواجهات',
    date: '2024-01-08',
    time: '20:30',
    duration: '120 دقيقة',
    participants: 48,
    maxParticipants: 50,
    type: 'online',
    speaker: 'نورا الخالد',
    description: 'تطوير واجهات مستخدم تفاعلية وحديثة باستخدام React و Vue.js',
    category: 'تطوير البرمجيات',
    level: 'متقدم',
    rating: 4.9,
    recording: true,
    status: 'completed',
    tags: ['React', 'Vue.js', 'Frontend'],
    materials: ['التسجيل', 'الكود المصدري', 'أمثلة تطبيقية']
  }
];

export const categories = [
  'الكل', 
  'تطوير البرمجيات', 
  'التصميم', 
  'التسويق', 
  'الأعمال', 
  'الهندسة',
  'إدارة المشاريع',
  'علم البيانات',
  'الأمن السيبراني'
];

export const meetingLevels = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];

export const getMeetingsByCategory = (category: string) => {
  if (category === 'الكل') return upcomingMeetings;
  return upcomingMeetings.filter(meeting => meeting.category === category);
};

export const getMeetingsByLevel = (level: string) => {
  if (level === 'الكل') return upcomingMeetings;
  return upcomingMeetings.filter(meeting => meeting.level === level);
};

export const searchMeetings = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return upcomingMeetings.filter(meeting => 
    meeting.title.toLowerCase().includes(lowercaseQuery) ||
    meeting.description.toLowerCase().includes(lowercaseQuery) ||
    meeting.speaker.toLowerCase().includes(lowercaseQuery) ||
    meeting.community.toLowerCase().includes(lowercaseQuery)
  );
};