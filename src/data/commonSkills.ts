export interface SkillCategory {
  id: string;
  name: string;
  nameAr: string;
  skills: string[];
  skillsAr: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'technical',
    name: 'Technical Skills',
    nameAr: 'المهارات التقنية',
    skills: [
      'JavaScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Vue.js', 'Node.js',
      'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Azure', 'Docker', 'Kubernetes',
      'Git', 'Linux', 'Windows Server', 'Networking', 'Cybersecurity', 'Data Analysis',
      'Machine Learning', 'Artificial Intelligence', 'Blockchain', 'Cloud Computing'
    ],
    skillsAr: [
      'جافا سكريبت', 'بايثون', 'جافا', 'سي بلس بلس', 'ريأكت', 'أنجولار', 'فيو جي إس', 'نود جي إس',
      'إس كيو إل', 'مونجو دي بي', 'بوستجرس كيو إل', 'ماي إس كيو إل', 'أمازون ويب سيرفيسز', 'أزور', 'دوكر', 'كوبرنيتس',
      'جيت', 'لينكس', 'ويندوز سيرفر', 'الشبكات', 'الأمن السيبراني', 'تحليل البيانات',
      'تعلم الآلة', 'الذكاء الاصطناعي', 'بلوك تشين', 'الحوسبة السحابية'
    ]
  },
  {
    id: 'business',
    name: 'Business Skills',
    nameAr: 'المهارات التجارية',
    skills: [
      'Project Management', 'Leadership', 'Strategic Planning', 'Business Analysis',
      'Financial Analysis', 'Market Research', 'Sales', 'Marketing', 'Customer Service',
      'Negotiation', 'Risk Management', 'Quality Assurance', 'Process Improvement',
      'Budgeting', 'Forecasting', 'Supply Chain Management', 'Vendor Management'
    ],
    skillsAr: [
      'إدارة المشاريع', 'القيادة', 'التخطيط الاستراتيجي', 'تحليل الأعمال',
      'التحليل المالي', 'بحوث السوق', 'المبيعات', 'التسويق', 'خدمة العملاء',
      'التفاوض', 'إدارة المخاطر', 'ضمان الجودة', 'تحسين العمليات',
      'وضع الميزانية', 'التنبؤ', 'إدارة سلسلة التوريد', 'إدارة الموردين'
    ]
  },
  {
    id: 'communication',
    name: 'Communication Skills',
    nameAr: 'مهارات التواصل',
    skills: [
      'Public Speaking', 'Written Communication', 'Presentation Skills', 'Interpersonal Skills',
      'Active Listening', 'Cross-cultural Communication', 'Conflict Resolution',
      'Team Collaboration', 'Mentoring', 'Training and Development'
    ],
    skillsAr: [
      'التحدث أمام الجمهور', 'التواصل الكتابي', 'مهارات العرض', 'المهارات الشخصية',
      'الاستماع الفعال', 'التواصل متعدد الثقافات', 'حل النزاعات',
      'التعاون الجماعي', 'الإرشاد', 'التدريب والتطوير'
    ]
  },
  {
    id: 'creative',
    name: 'Creative Skills',
    nameAr: 'المهارات الإبداعية',
    skills: [
      'Graphic Design', 'UI/UX Design', 'Adobe Creative Suite', 'Photoshop', 'Illustrator',
      'InDesign', 'Figma', 'Sketch', 'Video Editing', 'Animation', 'Content Creation',
      'Creative Writing', 'Photography', 'Brand Design', 'Web Design'
    ],
    skillsAr: [
      'التصميم الجرافيكي', 'تصميم واجهات المستخدم', 'حزمة أدوبي الإبداعية', 'فوتوشوب', 'إليستريتر',
      'إن ديزاين', 'فيجما', 'سكيتش', 'تحرير الفيديو', 'الرسوم المتحركة', 'إنشاء المحتوى',
      'الكتابة الإبداعية', 'التصوير الفوتوغرافي', 'تصميم العلامة التجارية', 'تصميم الويب'
    ]
  },
  {
    id: 'languages',
    name: 'Languages',
    nameAr: 'اللغات',
    skills: [
      'Arabic (Native)', 'English', 'French', 'German', 'Spanish', 'Chinese',
      'Japanese', 'Korean', 'Russian', 'Italian', 'Portuguese', 'Turkish'
    ],
    skillsAr: [
      'العربية (لغة أم)', 'الإنجليزية', 'الفرنسية', 'الألمانية', 'الإسبانية', 'الصينية',
      'اليابانية', 'الكورية', 'الروسية', 'الإيطالية', 'البرتغالية', 'التركية'
    ]
  },
  {
    id: 'industry-specific',
    name: 'Industry-Specific Skills',
    nameAr: 'المهارات المتخصصة بالصناعة',
    skills: [
      'Healthcare Management', 'Medical Equipment', 'Patient Care', 'Clinical Research',
      'Oil & Gas Operations', 'Petroleum Engineering', 'Renewable Energy', 'HVAC',
      'Construction Management', 'AutoCAD', 'Project Scheduling', 'Quality Control',
      'Hospitality Management', 'Event Planning', 'Tourism Operations', 'Food Service'
    ],
    skillsAr: [
      'إدارة الرعاية الصحية', 'المعدات الطبية', 'رعاية المرضى', 'البحوث السريرية',
      'عمليات النفط والغاز', 'هندسة البترول', 'الطاقة المتجددة', 'التدفئة والتهوية',
      'إدارة الإنشاءات', 'أوتوكاد', 'جدولة المشاريع', 'مراقبة الجودة',
      'إدارة الضيافة', 'تخطيط الفعاليات', 'عمليات السياحة', 'خدمة الطعام'
    ]
  }
];

export const getSkillsByCategory = (categoryId: string): string[] => {
  const category = skillCategories.find(cat => cat.id === categoryId);
  return category ? category.skills : [];
};

export const getSkillsByCategory_Ar = (categoryId: string): string[] => {
  const category = skillCategories.find(cat => cat.id === categoryId);
  return category ? category.skillsAr : [];
};

export const getAllSkills = (): string[] => {
  return skillCategories.flatMap(category => category.skills);
};

export const getAllSkills_Ar = (): string[] => {
  return skillCategories.flatMap(category => category.skillsAr);
};

export const searchSkills = (query: string): string[] => {
  const allSkills = getAllSkills();
  return allSkills.filter(skill => 
    skill.toLowerCase().includes(query.toLowerCase())
  );
};

export const searchSkills_Ar = (query: string): string[] => {
  const allSkillsAr = getAllSkills_Ar();
  return allSkillsAr.filter(skill => 
    skill.includes(query)
  );
};