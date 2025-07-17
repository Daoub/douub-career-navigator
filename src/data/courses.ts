export interface Course {
  id: string;
  title: string;
  titleAr: string;
  provider: string;
  providerAr: string;
  date: string;
  description?: string;
  descriptionAr?: string;
  skills: string[];
  certificate?: boolean;
  hours?: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Certificate {
  id: string;
  title: string;
  titleAr: string;
  issuer: string;
  issuerAr: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  descriptionAr?: string;
  skills: string[];
  verified?: boolean;
}

// Common Saudi certification providers
export const saudiCertificationProviders = [
  {
    id: 'scfhs',
    name: 'Saudi Commission for Health Specialties',
    nameAr: 'الهيئة السعودية للتخصصات الصحية',
    category: 'healthcare'
  },
  {
    id: 'socpa',
    name: 'Saudi Organization for Chartered Professional Accountants',
    nameAr: 'الهيئة السعودية للمحاسبين القانونيين',
    category: 'accounting'
  },
  {
    id: 'sec',
    name: 'Saudi Engineers Council',
    nameAr: 'مجلس المهندسين السعوديين',
    category: 'engineering'
  },
  {
    id: 'sama',
    name: 'Saudi Arabian Monetary Authority',
    nameAr: 'مؤسسة النقد العربي السعودي',
    category: 'banking'
  },
  {
    id: 'mcit',
    name: 'Ministry of Communications and Information Technology',
    nameAr: 'وزارة الاتصالات وتقنية المعلومات',
    category: 'technology'
  },
  {
    id: 'hrdf',
    name: 'Human Resources Development Fund',
    nameAr: 'صندوق تنمية الموارد البشرية',
    category: 'training'
  }
];

// Common international certification providers
export const internationalCertificationProviders = [
  {
    id: 'pmp',
    name: 'Project Management Institute (PMI)',
    nameAr: 'معهد إدارة المشاريع',
    category: 'project-management'
  },
  {
    id: 'cisco',
    name: 'Cisco Systems',
    nameAr: 'سيسكو سيستمز',
    category: 'networking'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    nameAr: 'مايكروسوفت',
    category: 'technology'
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    nameAr: 'خدمات أمازون الويب',
    category: 'cloud'
  },
  {
    id: 'google',
    name: 'Google',
    nameAr: 'جوجل',
    category: 'technology'
  },
  {
    id: 'oracle',
    name: 'Oracle',
    nameAr: 'أوراكل',
    category: 'database'
  }
];

export const getAllCertificationProviders = () => {
  return [...saudiCertificationProviders, ...internationalCertificationProviders];
};