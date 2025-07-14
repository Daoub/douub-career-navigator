import { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'ar' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Translation data
const translations = {
  ar: {
    // Navigation
    'nav.features': 'الميزات',
    'nav.pricing': 'الأسعار',
    'nav.contact': 'تواصل',
    'nav.demo': 'تجربة',
    'nav.login': 'دخول',
    'nav.signup': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.jobs': 'الوظائف',
    'nav.resume': 'السيرة الذاتية',
    'nav.communities': 'المجتمعات',
    'nav.consultations': 'الاستشارات',
    'nav.logout': 'تسجيل خروج',
    
    // Hero Section
    'hero.title': 'منصة دؤوب للتطوير المهني',
    'hero.subtitle': 'رؤية 2030 تستدعي مواهب استثنائية. نحن هنا لنساعدك في بناء مستقبلك المهني وتحقيق أهدافك الوظيفية',
    'hero.cta.signup': 'ابدأ رحلتك المهنية',
    'hero.cta.demo': 'شاهد العرض التوضيحي',
    
    // Features
    'features.title': 'ميزاتنا الأساسية',
    'features.resume.title': 'بناء السيرة الذاتية',
    'features.resume.desc': 'أنشئ سيرتك الذاتية باستخدام قوالب احترافية مصممة خصيصاً للسوق السعودي',
    'features.jobs.title': 'البحث عن الوظائف',
    'features.jobs.desc': 'اكتشف آلاف الفرص الوظيفية من أفضل الشركات في المملكة',
    'features.interviews.title': 'تحضير المقابلات',
    'features.interviews.desc': 'تدرب على أسئلة المقابلات مع خبرائنا واكتسب الثقة اللازمة',
    'features.consultations.title': 'الاستشارات المهنية',
    'features.consultations.desc': 'احصل على إرشاد مهني من خبراء في مجال عملك',
    'features.communities.title': 'المجتمعات المهنية',
    'features.communities.desc': 'انضم إلى مجتمعات متخصصة وتواصل مع المهنيين في مجالك',
    'features.courses.title': 'الدورات التدريبية',
    'features.courses.desc': 'طور مهاراتك من خلال دورات متخصصة معتمدة',
    
    // Pricing
    'pricing.title': 'باقاتنا',
    'pricing.monthly': 'شهرياً',
    'pricing.trial': 'الباقة التجريبية',
    'pricing.professional': 'الباقة المهنية',
    'pricing.enterprise': 'باقة الشركات',
    'pricing.select': 'اختيار الباقة',
    'pricing.popular': 'الأكثر شيوعاً',
    'pricing.premium': 'مميزة',
    
    // Package Features
    'package.trial.name': 'الباقة التجريبية',
    'package.professional.name': 'الباقة المهنية',
    'package.enterprise.name': 'باقة الشركات',
    'package.feature.resume_analysis': 'تحليل السيرة الذاتية',
    'package.feature.job_applications': 'التقديم على الوظائف',
    'package.feature.interview_prep': 'تحضير المقابلات',
    'package.feature.expert_consultations': 'استشارات الخبراء',
    'package.feature.community_access': 'الوصول للمجتمعات',
    'package.feature.priority_support': 'الدعم المتقدم',
    'package.feature.unlimited_access': 'وصول غير محدود',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.address': 'العنوان',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.download': 'تحميل',
    'common.share': 'مشاركة',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.close': 'إغلاق',
    'common.submit': 'إرسال',
    
    // Resume Builder
    'resume.title': 'بناء السيرة الذاتية',
    'resume.personal_info': 'المعلومات الشخصية',
    'resume.experience': 'الخبرة العملية',
    'resume.education': 'التعليم',
    'resume.skills': 'المهارات',
    'resume.certificates': 'الشهادات',
    'resume.analysis': 'التحليل',
    'resume.templates': 'قوالب السيرة الذاتية',
    'resume.download_pdf': 'تحميل PDF',
    'resume.share': 'مشاركة السيرة الذاتية',
    'resume.save_template': 'حفظ كقالب',
    
    // Job Search
    'jobs.title': 'البحث عن الوظائف',
    'jobs.search_placeholder': 'ابحث عن الوظائف...',
    'jobs.location': 'الموقع',
    'jobs.category': 'الفئة',
    'jobs.salary_range': 'نطاق الراتب',
    'jobs.experience_level': 'مستوى الخبرة',
    'jobs.apply_now': 'قدم الآن',
    'jobs.view_details': 'عرض التفاصيل',
    'jobs.save_job': 'حفظ الوظيفة',
    
    // Stats
    'stats.job_opportunities': 'فرصة وظيفية',
    'stats.active_users': 'مستخدم نشط',
    'stats.expert_consultants': 'خبير استشاري',
    'stats.satisfaction_rate': 'معدل الرضا',
    
    // Footer
    'footer.description': 'منصة دؤوب - شريكك في التطوير المهني ورؤية 2030',
    'footer.rights': 'جميع الحقوق محفوظة',
  },
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.demo': 'Demo',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.jobs': 'Jobs',
    'nav.resume': 'Resume',
    'nav.communities': 'Communities',
    'nav.consultations': 'Consultations',
    'nav.logout': 'Logout',
    
    // Hero Section
    'hero.title': 'Doaub Professional Development Platform',
    'hero.subtitle': 'Vision 2030 calls for exceptional talents. We are here to help you build your professional future and achieve your career goals',
    'hero.cta.signup': 'Start Your Career Journey',
    'hero.cta.demo': 'Watch Demo',
    
    // Features
    'features.title': 'Our Core Features',
    'features.resume.title': 'Resume Builder',
    'features.resume.desc': 'Create your resume using professional templates designed specifically for the Saudi market',
    'features.jobs.title': 'Job Search',
    'features.jobs.desc': 'Discover thousands of job opportunities from the best companies in the Kingdom',
    'features.interviews.title': 'Interview Preparation',
    'features.interviews.desc': 'Practice interview questions with our experts and gain the confidence you need',
    'features.consultations.title': 'Professional Consultations',
    'features.consultations.desc': 'Get professional guidance from experts in your field',
    'features.communities.title': 'Professional Communities',
    'features.communities.desc': 'Join specialized communities and connect with professionals in your field',
    'features.courses.title': 'Training Courses',
    'features.courses.desc': 'Develop your skills through specialized certified courses',
    
    // Pricing
    'pricing.title': 'Our Packages',
    'pricing.monthly': 'Monthly',
    'pricing.trial': 'Trial Package',
    'pricing.professional': 'Professional Package',
    'pricing.enterprise': 'Enterprise Package',
    'pricing.select': 'Select Package',
    'pricing.popular': 'Most Popular',
    'pricing.premium': 'Premium',
    
    // Package Features
    'package.trial.name': 'Trial Package',
    'package.professional.name': 'Professional Package',
    'package.enterprise.name': 'Enterprise Package',
    'package.feature.resume_analysis': 'Resume Analysis',
    'package.feature.job_applications': 'Job Applications',
    'package.feature.interview_prep': 'Interview Preparation',
    'package.feature.expert_consultations': 'Expert Consultations',
    'package.feature.community_access': 'Community Access',
    'package.feature.priority_support': 'Priority Support',
    'package.feature.unlimited_access': 'Unlimited Access',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.download': 'Download',
    'common.share': 'Share',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.submit': 'Submit',
    
    // Resume Builder
    'resume.title': 'Resume Builder',
    'resume.personal_info': 'Personal Information',
    'resume.experience': 'Work Experience',
    'resume.education': 'Education',
    'resume.skills': 'Skills',
    'resume.certificates': 'Certificates',
    'resume.analysis': 'Analysis',
    'resume.templates': 'Resume Templates',
    'resume.download_pdf': 'Download PDF',
    'resume.share': 'Share Resume',
    'resume.save_template': 'Save as Template',
    
    // Job Search
    'jobs.title': 'Job Search',
    'jobs.search_placeholder': 'Search for jobs...',
    'jobs.location': 'Location',
    'jobs.category': 'Category',
    'jobs.salary_range': 'Salary Range',
    'jobs.experience_level': 'Experience Level',
    'jobs.apply_now': 'Apply Now',
    'jobs.view_details': 'View Details',
    'jobs.save_job': 'Save Job',
    
    // Stats
    'stats.job_opportunities': 'Job Opportunities',
    'stats.active_users': 'Active Users',
    'stats.expert_consultants': 'Expert Consultants',
    'stats.satisfaction_rate': 'Satisfaction Rate',
    
    // Footer
    'footer.description': 'Doaub Platform - Your partner in professional development and Vision 2030',
    'footer.rights': 'All rights reserved',
  }
};

export const getTranslation = (key: string, language: Language): string => {
  return translations[language][key] || key;
};