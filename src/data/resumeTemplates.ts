export interface ResumeTemplate {
  id: string;
  name: string;
  nameAr: string;
  category: 'traditional' | 'modern' | 'creative' | 'saudi' | 'professional';
  preview: string;
  description: string;
  descriptionAr: string;
  features: string[];
  featuresAr: string[];
  rating: number;
  downloads: number;
  premium: boolean;
  saudiCompliant: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  layout: 'single-column' | 'two-column' | 'three-column';
  sections: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'vision-professional',
    name: 'Vision Professional',
    nameAr: 'رؤية مهنية',
    category: 'saudi',
    preview: '/placeholder.svg',
    description: 'A modern professional template aligned with Saudi Vision 2030 design principles',
    descriptionAr: 'قالب مهني حديث متوافق مع مبادئ التصميم لرؤية السعودية 2030',
    features: [
      'Vision 2030 compliant design',
      'Bilingual support (Arabic/English)',
      'ATS-friendly format',
      'Professional color scheme',
      'Modern typography'
    ],
    featuresAr: [
      'تصميم متوافق مع رؤية 2030',
      'دعم ثنائي اللغة (عربي/إنجليزي)',
      'تنسيق متوافق مع أنظمة التتبع',
      'نظام ألوان مهني',
      'طباعة حديثة'
    ],
    rating: 4.8,
    downloads: 1250,
    premium: false,
    saudiCompliant: true,
    colors: {
      primary: 'hsl(135, 65%, 25%)',
      secondary: 'hsl(45, 95%, 55%)',
      accent: 'hsl(135, 25%, 92%)'
    },
    fonts: {
      primary: 'Cairo',
      secondary: 'Inter'
    },
    layout: 'two-column',
    sections: ['personal', 'experience', 'education', 'skills', 'certificates', 'languages'],
    tags: ['professional', 'saudi', 'vision2030', 'bilingual'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'traditional-arabic',
    name: 'Traditional Arabic',
    nameAr: 'العربي التقليدي',
    category: 'traditional',
    preview: '/placeholder.svg',
    description: 'Classic Arabic resume template with traditional formatting',
    descriptionAr: 'قالب سيرة ذاتية عربي كلاسيكي مع تنسيق تقليدي',
    features: [
      'Right-to-left layout',
      'Classic Arabic typography',
      'Traditional formatting',
      'Government sector friendly',
      'Formal appearance'
    ],
    featuresAr: [
      'تخطيط من اليمين إلى اليسار',
      'طباعة عربية كلاسيكية',
      'تنسيق تقليدي',
      'مناسب للقطاع الحكومي',
      'مظهر رسمي'
    ],
    rating: 4.3,
    downloads: 890,
    premium: false,
    saudiCompliant: true,
    colors: {
      primary: 'hsl(210, 25%, 25%)',
      secondary: 'hsl(210, 15%, 50%)',
      accent: 'hsl(210, 20%, 95%)'
    },
    fonts: {
      primary: 'Cairo',
      secondary: 'Cairo'
    },
    layout: 'single-column',
    sections: ['personal', 'experience', 'education', 'skills', 'certificates'],
    tags: ['traditional', 'arabic', 'government', 'formal'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    nameAr: 'التقني الحديث',
    category: 'modern',
    preview: '/placeholder.svg',
    description: 'Contemporary template perfect for tech professionals',
    descriptionAr: 'قالب معاصر مثالي للمهنيين التقنيين',
    features: [
      'Clean modern design',
      'Tech-focused sections',
      'Skills visualization',
      'Portfolio integration',
      'GitHub integration'
    ],
    featuresAr: [
      'تصميم حديث نظيف',
      'أقسام مركزة على التقنية',
      'تصور المهارات',
      'تكامل المحفظة',
      'تكامل GitHub'
    ],
    rating: 4.6,
    downloads: 2100,
    premium: true,
    saudiCompliant: false,
    colors: {
      primary: 'hsl(220, 85%, 60%)',
      secondary: 'hsl(160, 65%, 45%)',
      accent: 'hsl(220, 25%, 95%)'
    },
    fonts: {
      primary: 'Inter',
      secondary: 'JetBrains Mono'
    },
    layout: 'two-column',
    sections: ['personal', 'experience', 'education', 'skills', 'projects', 'certificates'],
    tags: ['modern', 'tech', 'developer', 'portfolio'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    nameAr: 'المصمم الإبداعي',
    category: 'creative',
    preview: '/placeholder.svg',
    description: 'Bold creative template for designers and artists',
    descriptionAr: 'قالب إبداعي جريء للمصممين والفنانين',
    features: [
      'Creative layout',
      'Visual emphasis',
      'Portfolio showcase',
      'Color customization',
      'Typography variety'
    ],
    featuresAr: [
      'تخطيط إبداعي',
      'تأكيد بصري',
      'عرض المحفظة',
      'تخصيص الألوان',
      'تنوع الطباعة'
    ],
    rating: 4.4,
    downloads: 750,
    premium: true,
    saudiCompliant: false,
    colors: {
      primary: 'hsl(315, 85%, 60%)',
      secondary: 'hsl(45, 95%, 55%)',
      accent: 'hsl(315, 25%, 95%)'
    },
    fonts: {
      primary: 'Montserrat',
      secondary: 'Open Sans'
    },
    layout: 'three-column',
    sections: ['personal', 'experience', 'education', 'skills', 'projects', 'awards'],
    tags: ['creative', 'design', 'artist', 'portfolio'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: 'executive-premium',
    name: 'Executive Premium',
    nameAr: 'التنفيذي المتميز',
    category: 'professional',
    preview: '/placeholder.svg',
    description: 'Premium template for senior executives and leaders',
    descriptionAr: 'قالب متميز للمديرين التنفيذيين والقادة',
    features: [
      'Executive layout',
      'Leadership focus',
      'Achievement highlights',
      'Premium typography',
      'Professional aesthetics'
    ],
    featuresAr: [
      'تخطيط تنفيذي',
      'تركيز على القيادة',
      'تسليط الضوء على الإنجازات',
      'طباعة متميزة',
      'جماليات مهنية'
    ],
    rating: 4.9,
    downloads: 450,
    premium: true,
    saudiCompliant: true,
    colors: {
      primary: 'hsl(210, 85%, 25%)',
      secondary: 'hsl(45, 95%, 55%)',
      accent: 'hsl(210, 25%, 95%)'
    },
    fonts: {
      primary: 'Playfair Display',
      secondary: 'Inter'
    },
    layout: 'single-column',
    sections: ['personal', 'experience', 'education', 'achievements', 'leadership'],
    tags: ['executive', 'leadership', 'premium', 'senior'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: 'saudi-government',
    name: 'Saudi Government',
    nameAr: 'الحكومة السعودية',
    category: 'saudi',
    preview: '/placeholder.svg',
    description: 'Official template compliant with Saudi government standards',
    descriptionAr: 'قالب رسمي متوافق مع معايير الحكومة السعودية',
    features: [
      'Government compliant',
      'Official formatting',
      'Hijri date support',
      'Arabic priority',
      'Formal structure'
    ],
    featuresAr: [
      'متوافق مع الحكومة',
      'تنسيق رسمي',
      'دعم التاريخ الهجري',
      'أولوية العربية',
      'هيكل رسمي'
    ],
    rating: 4.5,
    downloads: 1800,
    premium: false,
    saudiCompliant: true,
    colors: {
      primary: 'hsl(135, 65%, 25%)',
      secondary: 'hsl(210, 25%, 25%)',
      accent: 'hsl(135, 25%, 95%)'
    },
    fonts: {
      primary: 'Cairo',
      secondary: 'Cairo'
    },
    layout: 'single-column',
    sections: ['personal', 'experience', 'education', 'skills', 'certificates', 'references'],
    tags: ['government', 'saudi', 'official', 'formal'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-25')
  }
];

export const templateCategories = [
  {
    id: 'traditional',
    name: 'Traditional',
    nameAr: 'تقليدي',
    description: 'Classic and formal resume templates',
    descriptionAr: 'قوالب السيرة الذاتية الكلاسيكية والرسمية',
    icon: 'FileText'
  },
  {
    id: 'modern',
    name: 'Modern',
    nameAr: 'حديث',
    description: 'Contemporary and clean designs',
    descriptionAr: 'تصاميم معاصرة ونظيفة',
    icon: 'Sparkles'
  },
  {
    id: 'creative',
    name: 'Creative',
    nameAr: 'إبداعي',
    description: 'Unique and artistic layouts',
    descriptionAr: 'تخطيطات فريدة وفنية',
    icon: 'Palette'
  },
  {
    id: 'saudi',
    name: 'Saudi Compliant',
    nameAr: 'متوافق سعودي',
    description: 'Templates aligned with Saudi standards',
    descriptionAr: 'قوالب متوافقة مع المعايير السعودية',
    icon: 'Shield'
  },
  {
    id: 'professional',
    name: 'Professional',
    nameAr: 'مهني',
    description: 'Business-focused templates',
    descriptionAr: 'قوالب مركزة على الأعمال',
    icon: 'Briefcase'
  }
];