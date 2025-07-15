export interface SaudiResumeFeatures {
  personalInfo: {
    nationalityRequired: boolean;
    maritalStatusOptions: string[];
    hijriDateSupport: boolean;
    photoRequired: boolean;
    saudiIdFormat: string;
  };
  culturalConsiderations: {
    genderSeparation: boolean;
    religiousObservances: boolean;
    familyNameImportance: boolean;
    tribualAffiliation: boolean;
  };
  formatRequirements: {
    arabicFirst: boolean;
    rtlSupport: boolean;
    governmentFormat: boolean;
    privateFormat: boolean;
  };
  compliance: {
    visionAligned: boolean;
    governmentSector: boolean;
    privateSector: boolean;
    internationalOrgs: boolean;
  };
}

export const saudiResumeConfig: SaudiResumeFeatures = {
  personalInfo: {
    nationalityRequired: true,
    maritalStatusOptions: ['Single', 'Married', 'Divorced', 'Widowed'],
    hijriDateSupport: true,
    photoRequired: true,
    saudiIdFormat: '^[12]\\d{9}$'
  },
  culturalConsiderations: {
    genderSeparation: true,
    religiousObservances: true,
    familyNameImportance: true,
    tribualAffiliation: false
  },
  formatRequirements: {
    arabicFirst: true,
    rtlSupport: true,
    governmentFormat: true,
    privateFormat: true
  },
  compliance: {
    visionAligned: true,
    governmentSector: true,
    privateSector: true,
    internationalOrgs: false
  }
};

export const saudiIndustries = [
  {
    id: 'energy',
    name: 'Energy & Utilities',
    nameAr: 'الطاقة والمرافق',
    vision2030Priority: true,
    keywords: ['Oil', 'Gas', 'Renewable Energy', 'NEOM', 'Solar', 'Wind'],
    keywordsAr: ['نفط', 'غاز', 'طاقة متجددة', 'نيوم', 'شمسي', 'رياح']
  },
  {
    id: 'tech',
    name: 'Technology & Innovation',
    nameAr: 'التكنولوجيا والابتكار',
    vision2030Priority: true,
    keywords: ['AI', 'Digital Transformation', 'Fintech', 'IoT', 'Blockchain'],
    keywordsAr: ['ذكاء اصطناعي', 'تحول رقمي', 'تقنيات مالية', 'إنترنت الأشياء', 'بلوك تشين']
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    nameAr: 'الرعاية الصحية وعلوم الحياة',
    vision2030Priority: true,
    keywords: ['Medical Technology', 'Biotechnology', 'Pharmaceutical', 'Telemedicine'],
    keywordsAr: ['تقنيات طبية', 'تقنيات حيوية', 'صيدلة', 'طب عن بعد']
  },
  {
    id: 'tourism',
    name: 'Tourism & Entertainment',
    nameAr: 'السياحة والترفيه',
    vision2030Priority: true,
    keywords: ['Hospitality', 'Cultural Tourism', 'Entertainment', 'Events Management'],
    keywordsAr: ['ضيافة', 'سياحة ثقافية', 'ترفيه', 'إدارة فعاليات']
  },
  {
    id: 'finance',
    name: 'Banking & Finance',
    nameAr: 'المصارف والمالية',
    vision2030Priority: true,
    keywords: ['Islamic Banking', 'Investment', 'Risk Management', 'Compliance'],
    keywordsAr: ['مصرفية إسلامية', 'استثمار', 'إدارة مخاطر', 'امتثال']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industry',
    nameAr: 'التصنيع والصناعة',
    vision2030Priority: true,
    keywords: ['Automotive', 'Aerospace', 'Defense', 'Petrochemicals'],
    keywordsAr: ['سيارات', 'طيران', 'دفاع', 'بتروكيماويات']
  }
];

export const saudiCities = [
  { id: 'riyadh', name: 'Riyadh', nameAr: 'الرياض', region: 'Central' },
  { id: 'jeddah', name: 'Jeddah', nameAr: 'جدة', region: 'Western' },
  { id: 'dammam', name: 'Dammam', nameAr: 'الدمام', region: 'Eastern' },
  { id: 'mecca', name: 'Mecca', nameAr: 'مكة المكرمة', region: 'Western' },
  { id: 'medina', name: 'Medina', nameAr: 'المدينة المنورة', region: 'Western' },
  { id: 'khobar', name: 'Khobar', nameAr: 'الخبر', region: 'Eastern' },
  { id: 'taif', name: 'Taif', nameAr: 'الطائف', region: 'Western' },
  { id: 'tabuk', name: 'Tabuk', nameAr: 'تبوك', region: 'Northern' },
  { id: 'abha', name: 'Abha', nameAr: 'أبها', region: 'Southern' },
  { id: 'neom', name: 'NEOM', nameAr: 'نيوم', region: 'Northwestern' }
];

export const saudiUniversities = [
  { id: 'ksu', name: 'King Saud University', nameAr: 'جامعة الملك سعود', city: 'Riyadh' },
  { id: 'kau', name: 'King Abdulaziz University', nameAr: 'جامعة الملك عبدالعزيز', city: 'Jeddah' },
  { id: 'kfupm', name: 'King Fahd University of Petroleum and Minerals', nameAr: 'جامعة الملك فهد للبترول والمعادن', city: 'Dhahran' },
  { id: 'kku', name: 'King Khalid University', nameAr: 'جامعة الملك خالد', city: 'Abha' },
  { id: 'kfu', name: 'King Faisal University', nameAr: 'جامعة الملك فيصل', city: 'Al-Ahsa' },
  { id: 'iau', name: 'Imam Abdulrahman Bin Faisal University', nameAr: 'جامعة الإمام عبدالرحمن بن فيصل', city: 'Dammam' },
  { id: 'ksau', name: 'King Saud bin Abdulaziz University for Health Sciences', nameAr: 'جامعة الملك سعود بن عبدالعزيز للعلوم الصحية', city: 'Riyadh' },
  { id: 'psu', name: 'Prince Sultan University', nameAr: 'جامعة الأمير سلطان', city: 'Riyadh' }
];

export const saudiCertifications = [
  {
    id: 'scfhs',
    name: 'Saudi Commission for Health Specialties',
    nameAr: 'الهيئة السعودية للتخصصات الصحية',
    category: 'healthcare',
    required: true
  },
  {
    id: 'socpa',
    name: 'Saudi Organization for Chartered Professional Accountants',
    nameAr: 'الهيئة السعودية للمحاسبين القانونيين',
    category: 'finance',
    required: true
  },
  {
    id: 'sec',
    name: 'Saudi Engineers Council',
    nameAr: 'مجلس المهندسين السعوديين',
    category: 'engineering',
    required: true
  },
  {
    id: 'sama',
    name: 'Saudi Arabian Monetary Authority',
    nameAr: 'مؤسسة النقد العربي السعودي',
    category: 'banking',
    required: true
  }
];

export const vision2030Initiatives = [
  {
    id: 'neom',
    name: 'NEOM',
    nameAr: 'نيوم',
    description: 'A futuristic megacity project',
    descriptionAr: 'مشروع مدينة مستقبلية ضخمة',
    skills: ['Innovation', 'Technology', 'Sustainability', 'Smart Cities'],
    skillsAr: ['ابتكار', 'تكنولوجيا', 'استدامة', 'مدن ذكية']
  },
  {
    id: 'the-line',
    name: 'The Line',
    nameAr: 'ذا لاين',
    description: 'A linear city with zero cars, streets or carbon emissions',
    descriptionAr: 'مدينة خطية بدون سيارات أو شوارع أو انبعاثات كربونية',
    skills: ['Urban Planning', 'Environmental Engineering', 'Architecture'],
    skillsAr: ['تخطيط حضري', 'هندسة بيئية', 'عمارة']
  },
  {
    id: 'red-sea',
    name: 'Red Sea Project',
    nameAr: 'مشروع البحر الأحمر',
    description: 'A luxury tourism destination',
    descriptionAr: 'وجهة سياحية فاخرة',
    skills: ['Tourism Management', 'Hospitality', 'Marine Conservation'],
    skillsAr: ['إدارة السياحة', 'ضيافة', 'حفظ بحري']
  },
  {
    id: 'qiddiya',
    name: 'Qiddiya',
    nameAr: 'القدية',
    description: 'Capital of entertainment, sports and the arts',
    descriptionAr: 'عاصمة الترفيه والرياضة والفنون',
    skills: ['Entertainment Management', 'Sports Management', 'Event Planning'],
    skillsAr: ['إدارة الترفيه', 'إدارة رياضية', 'تخطيط فعاليات']
  }
];