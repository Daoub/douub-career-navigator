export interface Specialization {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  duration: string;
  modules: number;
  enrolled: number;
  rating: number;
  price: string;
  instructor: string;
  skills: string[];
  certified: boolean;
  image?: string;
  prerequisites?: string[];
  outcomes?: string[];
}

export interface LearningProgress {
  id: number;
  title: string;
  progress: number;
  currentModule: string;
  nextDeadline: string;
  totalModules: number;
  completedModules: number;
  timeSpent: string;
  status: 'جاري' | 'مكتمل' | 'متوقف';
  lastAccessed?: string;
  quiz_scores?: number[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'شهادة' | 'إنجاز' | 'مهارة';
  icon?: string;
  verified?: boolean;
}

export interface Certificate {
  id: number;
  title: string;
  description: string;
  issuer: string;
  date: string;
  skills: string[];
  credentialId: string;
  verified: boolean;
  downloadUrl?: string;
  verificationUrl?: string;
}

export const specializations: Specialization[] = [
  {
    id: 1,
    title: 'تطوير تطبيقات الويب المتقدم',
    description: 'تعلم تطوير تطبيقات الويب الحديثة باستخدام React و Node.js مع أحدث التقنيات',
    category: 'تطوير البرمجيات',
    level: 'متقدم',
    duration: '12 أسبوع',
    modules: 8,
    enrolled: 1250,
    rating: 4.9,
    price: 'مجاني',
    instructor: 'أحمد محمود',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
    certified: true,
    image: '/placeholder.svg',
    prerequisites: ['JavaScript الأساسي', 'HTML/CSS', 'أساسيات البرمجة'],
    outcomes: ['بناء تطبيقات ويب كاملة', 'إتقان React و Node.js', 'العمل مع قواعد البيانات']
  },
  {
    id: 2,
    title: 'تصميم تجربة المستخدم (UX)',
    description: 'دورة شاملة في تصميم تجربة المستخدم وأبحاث المستخدمين وأساليب التصميم الحديثة',
    category: 'التصميم',
    level: 'مبتدئ',
    duration: '8 أسابيع',
    modules: 6,
    enrolled: 890,
    rating: 4.8,
    price: 'مجاني',
    instructor: 'سارة أحمد',
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
    certified: true,
    image: '/placeholder.svg',
    prerequisites: ['لا يوجد'],
    outcomes: ['تصميم تجارب مستخدم فعالة', 'إجراء أبحاث المستخدمين', 'إنشاء النماذج الأولية']
  },
  {
    id: 3,
    title: 'التسويق الرقمي المتكامل',
    description: 'استراتيجيات التسويق الرقمي الحديثة ووسائل التواصل الاجتماعي والتسويق بالمحتوى',
    category: 'التسويق',
    level: 'متوسط',
    duration: '10 أسابيع',
    modules: 7,
    enrolled: 675,
    rating: 4.7,
    price: 'مجاني',
    instructor: 'محمد علي',
    skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics', 'Email Marketing'],
    certified: true,
    image: '/placeholder.svg',
    prerequisites: ['أساسيات التسويق', 'استخدام الإنترنت'],
    outcomes: ['بناء استراتيجية تسويق رقمي', 'إدارة حملات إعلانية', 'تحليل البيانات التسويقية']
  },
  {
    id: 4,
    title: 'إدارة المشاريع التقنية',
    description: 'تعلم إدارة المشاريع التقنية باستخدام منهجيات Agile و Scrum والأدوات الحديثة',
    category: 'إدارة المشاريع',
    level: 'متوسط',
    duration: '6 أسابيع',
    modules: 5,
    enrolled: 420,
    rating: 4.6,
    price: 'مجاني',
    instructor: 'ليلى حسن',
    skills: ['Scrum', 'Agile', 'Jira', 'Project Planning', 'Team Management'],
    certified: true,
    image: '/placeholder.svg',
    prerequisites: ['خبرة عملية أساسية', 'فهم بيئة العمل التقني'],
    outcomes: ['إدارة مشاريع تقنية بفعالية', 'تطبيق منهجيات Agile', 'قيادة فرق العمل']
  },
  {
    id: 5,
    title: 'علم البيانات والذكاء الاصطناعي',
    description: 'تعلم أساسيات علم البيانات والذكاء الاصطناعي باستخدام Python وأدوات التحليل الحديثة',
    category: 'تطوير البرمجيات',
    level: 'متقدم',
    duration: '16 أسبوع',
    modules: 10,
    enrolled: 892,
    rating: 4.9,
    price: 'مجاني',
    instructor: 'دكتور خالد الأحمد',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow', 'Statistics'],
    certified: true,
    image: '/placeholder.svg',
    prerequisites: ['Python الأساسي', 'رياضيات عامة', 'إحصاء أساسي'],
    outcomes: ['تحليل البيانات الضخمة', 'بناء نماذج تعلم آلة', 'تطبيق الذكاء الاصطناعي']
  },
  {
    id: 6,
    title: 'الأمن السيبراني',
    description: 'أساسيات الأمن السيبراني وحماية الأنظمة والشبكات من التهديدات الإلكترونية',
    category: 'الأمن السيبراني',
    level: 'متوسط',
    duration: '8 أسابيع',
    modules: 6,
    enrolled: 456,
    rating: 4.7,
    price: 'مجاني',
    instructor: 'عمر السالم',
    skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Incident Response'],
    certified: true,
    image: '/placeholder.svg',
    prerequisites: ['أساسيات الشبكات', 'فهم أنظمة التشغيل'],
    outcomes: ['حماية الأنظمة من التهديدات', 'تقييم المخاطر الأمنية', 'الاستجابة للحوادث']
  }
];

export const myLearningProgress: LearningProgress[] = [
  {
    id: 1,
    title: 'تطوير تطبيقات الويب المتقدم',
    progress: 65,
    currentModule: 'إدارة الحالة مع Redux',
    nextDeadline: '2024-01-25',
    totalModules: 8,
    completedModules: 5,
    timeSpent: '45 ساعة',
    status: 'جاري',
    lastAccessed: '2024-01-18',
    quiz_scores: [85, 92, 78, 88, 90]
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
    status: 'جاري',
    lastAccessed: '2024-01-17',
    quiz_scores: [82, 76]
  }
];

export const achievements: Achievement[] = [
  {
    id: 1,
    title: 'خبير React',
    description: 'أكمل دورة تطوير React المتقدمة بنجاح',
    date: '2024-01-10',
    type: 'شهادة',
    verified: true
  },
  {
    id: 2,
    title: 'مصمم UX محترف',
    description: 'حصل على شهادة في تصميم تجربة المستخدم',
    date: '2023-12-15',
    type: 'شهادة',
    verified: true
  },
  {
    id: 3,
    title: 'متعلم نشط',
    description: 'أكمل 100 ساعة تعلم في الشهر',
    date: '2024-01-01',
    type: 'إنجاز',
    verified: false
  },
  {
    id: 4,
    title: 'خبير تسويق رقمي',
    description: 'أكمل 5 دورات في التسويق الرقمي',
    date: '2023-11-20',
    type: 'مهارة',
    verified: true
  }
];

export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'شهادة في تطوير تطبيقات الويب',
    description: 'شهادة معتمدة في تطوير تطبيقات الويب باستخدام React و Node.js',
    issuer: 'منصة مهنتي',
    date: '2024-01-10',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    credentialId: 'CERT-WEB-2024-001',
    verified: true,
    downloadUrl: '/certificates/web-development-cert.pdf',
    verificationUrl: 'https://verify.mehnati.com/cert/CERT-WEB-2024-001'
  },
  {
    id: 2,
    title: 'شهادة في تصميم تجربة المستخدم',
    description: 'شهادة معتمدة في تصميم تجربة المستخدم وأبحاث المستخدمين',
    issuer: 'منصة مهنتي',
    date: '2023-12-15',
    skills: ['UX Design', 'User Research', 'Figma', 'Prototyping'],
    credentialId: 'CERT-UX-2023-045',
    verified: true,
    downloadUrl: '/certificates/ux-design-cert.pdf',
    verificationUrl: 'https://verify.mehnati.com/cert/CERT-UX-2023-045'
  },
  {
    id: 3,
    title: 'شهادة في التسويق الرقمي',
    description: 'شهادة معتمدة في استراتيجيات التسويق الرقمي الحديثة',
    issuer: 'منصة مهنتي',
    date: '2023-11-20',
    skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
    credentialId: 'CERT-DM-2023-112',
    verified: true,
    downloadUrl: '/certificates/digital-marketing-cert.pdf',
    verificationUrl: 'https://verify.mehnati.com/cert/CERT-DM-2023-112'
  }
];

export const learningCategories = [
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

export const learningLevels = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];

export const getSpecializationsByCategory = (category: string) => {
  if (category === 'الكل') return specializations;
  return specializations.filter(spec => spec.category === category);
};

export const getSpecializationsByLevel = (level: string) => {
  if (level === 'الكل') return specializations;
  return specializations.filter(spec => spec.level === level);
};

export const searchSpecializations = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return specializations.filter(spec => 
    spec.title.toLowerCase().includes(lowercaseQuery) ||
    spec.description.toLowerCase().includes(lowercaseQuery) ||
    spec.instructor.toLowerCase().includes(lowercaseQuery) ||
    spec.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
  );
};