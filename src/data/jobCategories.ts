export interface JobCategory {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  keywords: string[];
  keywordsAr: string[];
  vision2030Priority?: boolean;
}

export const jobCategories: JobCategory[] = [
  {
    id: 'all',
    name: 'All Categories',
    nameAr: 'جميع التصنيفات',
    description: 'All available job categories',
    descriptionAr: 'جميع التصنيفات المتاحة',
    keywords: [],
    keywordsAr: []
  },
  {
    id: 'technology',
    name: 'Technology',
    nameAr: 'التكنولوجيا',
    description: 'Software development, IT, and digital innovation',
    descriptionAr: 'تطوير البرمجيات وتقنية المعلومات والابتكار الرقمي',
    keywords: ['Programming', 'Software Development', 'IT', 'Digital', 'Tech', 'AI', 'Data Science'],
    keywordsAr: ['برمجة', 'تطوير البرمجيات', 'تقنية المعلومات', 'رقمي', 'تقنية', 'ذكاء اصطناعي', 'علوم البيانات'],
    vision2030Priority: true
  },
  {
    id: 'engineering',
    name: 'Engineering',
    nameAr: 'الهندسة',
    description: 'Civil, mechanical, electrical, and specialized engineering',
    descriptionAr: 'الهندسة المدنية والميكانيكية والكهربائية والهندسة المتخصصة',
    keywords: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Chemical Engineering'],
    keywordsAr: ['هندسة مدنية', 'هندسة ميكانيكية', 'هندسة كهربائية', 'هندسة كيميائية'],
    vision2030Priority: true
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    nameAr: 'الرعاية الصحية',
    description: 'Medical professionals, nursing, and health services',
    descriptionAr: 'المهنيين الطبيين والتمريض والخدمات الصحية',
    keywords: ['Medicine', 'Nursing', 'Healthcare', 'Medical', 'Pharmacy', 'Dentistry'],
    keywordsAr: ['طب', 'تمريض', 'رعاية صحية', 'طبي', 'صيدلة', 'طب أسنان'],
    vision2030Priority: true
  },
  {
    id: 'education',
    name: 'Education',
    nameAr: 'التعليم',
    description: 'Teaching, training, and educational services',
    descriptionAr: 'التدريس والتدريب والخدمات التعليمية',
    keywords: ['Teaching', 'Education', 'Training', 'Academic', 'Curriculum', 'Learning'],
    keywordsAr: ['تدريس', 'تعليم', 'تدريب', 'أكاديمي', 'منهج', 'تعلم'],
    vision2030Priority: true
  },
  {
    id: 'business-finance',
    name: 'Business & Finance',
    nameAr: 'الأعمال والمالية',
    description: 'Business administration, finance, accounting, and banking',
    descriptionAr: 'إدارة الأعمال والمالية والمحاسبة والمصارف',
    keywords: ['Business', 'Finance', 'Accounting', 'Banking', 'Investment', 'Economics'],
    keywordsAr: ['أعمال', 'مالية', 'محاسبة', 'مصرفية', 'استثمار', 'اقتصاد'],
    vision2030Priority: true
  },
  {
    id: 'marketing-sales',
    name: 'Marketing & Sales',
    nameAr: 'التسويق والمبيعات',
    description: 'Marketing, sales, advertising, and digital marketing',
    descriptionAr: 'التسويق والمبيعات والإعلان والتسويق الرقمي',
    keywords: ['Marketing', 'Sales', 'Advertising', 'Digital Marketing', 'Brand Management'],
    keywordsAr: ['تسويق', 'مبيعات', 'إعلان', 'تسويق رقمي', 'إدارة العلامة التجارية'],
    vision2030Priority: true
  },
  {
    id: 'hr-admin',
    name: 'Human Resources & Administration',
    nameAr: 'الموارد البشرية والإدارة',
    description: 'HR management, administration, and organizational development',
    descriptionAr: 'إدارة الموارد البشرية والإدارة والتطوير التنظيمي',
    keywords: ['Human Resources', 'HR', 'Administration', 'Management', 'Recruitment'],
    keywordsAr: ['موارد بشرية', 'إدارة', 'توظيف', 'تطوير تنظيمي', 'إدارة أفراد']
  },
  {
    id: 'legal',
    name: 'Legal',
    nameAr: 'القانونية',
    description: 'Legal services, law, and compliance',
    descriptionAr: 'الخدمات القانونية والقانون والامتثال',
    keywords: ['Law', 'Legal', 'Attorney', 'Compliance', 'Legal Advisor'],
    keywordsAr: ['قانون', 'قانوني', 'محامي', 'امتثال', 'مستشار قانوني']
  },
  {
    id: 'media-arts',
    name: 'Media & Arts',
    nameAr: 'الإعلام والفنون',
    description: 'Media, journalism, arts, and creative industries',
    descriptionAr: 'الإعلام والصحافة والفنون والصناعات الإبداعية',
    keywords: ['Media', 'Journalism', 'Arts', 'Creative', 'Design', 'Photography'],
    keywordsAr: ['إعلام', 'صحافة', 'فنون', 'إبداعي', 'تصميم', 'تصوير'],
    vision2030Priority: true
  },
  {
    id: 'tourism-hospitality',
    name: 'Tourism & Hospitality',
    nameAr: 'السياحة والضيافة',
    description: 'Tourism, hospitality, travel, and entertainment',
    descriptionAr: 'السياحة والضيافة والسفر والترفيه',
    keywords: ['Tourism', 'Hospitality', 'Travel', 'Entertainment', 'Hotels', 'Events'],
    keywordsAr: ['سياحة', 'ضيافة', 'سفر', 'ترفيه', 'فنادق', 'فعاليات'],
    vision2030Priority: true
  },
  {
    id: 'energy-utilities',
    name: 'Energy & Utilities',
    nameAr: 'الطاقة والمرافق',
    description: 'Energy sector, oil & gas, renewable energy, and utilities',
    descriptionAr: 'قطاع الطاقة والنفط والغاز والطاقة المتجددة والمرافق',
    keywords: ['Energy', 'Oil', 'Gas', 'Renewable Energy', 'Utilities', 'Power'],
    keywordsAr: ['طاقة', 'نفط', 'غاز', 'طاقة متجددة', 'مرافق', 'كهرباء'],
    vision2030Priority: true
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industry',
    nameAr: 'التصنيع والصناعة',
    description: 'Manufacturing, industrial operations, and production',
    descriptionAr: 'التصنيع والعمليات الصناعية والإنتاج',
    keywords: ['Manufacturing', 'Production', 'Industrial', 'Factory', 'Operations'],
    keywordsAr: ['تصنيع', 'إنتاج', 'صناعي', 'مصنع', 'عمليات'],
    vision2030Priority: true
  },
  {
    id: 'retail-customer-service',
    name: 'Retail & Customer Service',
    nameAr: 'التجزئة وخدمة العملاء',
    description: 'Retail, customer service, and consumer relations',
    descriptionAr: 'التجزئة وخدمة العملاء وعلاقات المستهلكين',
    keywords: ['Retail', 'Customer Service', 'Sales Associate', 'Consumer Relations'],
    keywordsAr: ['تجزئة', 'خدمة عملاء', 'مندوب مبيعات', 'علاقات المستهلكين']
  },
  {
    id: 'other',
    name: 'Other',
    nameAr: 'أخرى',
    description: 'Other professional categories not listed above',
    descriptionAr: 'فئات مهنية أخرى غير مدرجة أعلاه',
    keywords: ['Other', 'Miscellaneous', 'Various'],
    keywordsAr: ['أخرى', 'متنوعة', 'مختلفة']
  }
];

export const getJobCategoryById = (id: string): JobCategory | undefined => {
  return jobCategories.find(category => category.id === id);
};

export const getJobCategoriesByPriority = (vision2030Only: boolean = false): JobCategory[] => {
  if (vision2030Only) {
    return jobCategories.filter(category => category.vision2030Priority);
  }
  return jobCategories;
};