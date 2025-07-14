export interface InterviewQuestion {
  id: string;
  question: string;
  questionEn: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  specialty: string;
  keywords: string[];
  expectedAnswer?: string;
  tips?: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  // Technology Specialty
  {
    id: 'tech-001',
    question: 'أخبرني عن نفسك وخبرتك في تطوير البرمجيات',
    questionEn: 'Tell me about yourself and your software development experience',
    category: 'general',
    difficulty: 'easy',
    specialty: 'technology',
    keywords: ['خبرة', 'تطوير', 'برمجة', 'مشاريع'],
    tips: 'ركز على المشاريع التقنية والأدوات التي استخدمتها'
  },
  {
    id: 'tech-002',
    question: 'ما الفرق بين SQL و NoSQL؟',
    questionEn: 'What is the difference between SQL and NoSQL?',
    category: 'technical',
    difficulty: 'medium',
    specialty: 'technology',
    keywords: ['قواعد البيانات', 'SQL', 'NoSQL'],
    tips: 'اشرح استخدامات كل نوع ومتى نستخدم كل منهما'
  },
  {
    id: 'tech-003',
    question: 'كيف تتعامل مع الأمان في تطبيقات الويب؟',
    questionEn: 'How do you handle security in web applications?',
    category: 'technical',
    difficulty: 'hard',
    specialty: 'technology',
    keywords: ['أمان', 'حماية', 'تشفير', 'مصادقة'],
    tips: 'تحدث عن HTTPS، التشفير، وأفضل الممارسات الأمنية'
  },
  
  // Marketing Specialty
  {
    id: 'mkt-001',
    question: 'كيف تقيس نجاح حملة تسويقية رقمية؟',
    questionEn: 'How do you measure the success of a digital marketing campaign?',
    category: 'analytical',
    difficulty: 'medium',
    specialty: 'marketing',
    keywords: ['مقاييس', 'ROI', 'تحليل', 'نجاح'],
    tips: 'اذكر مؤشرات الأداء الرئيسية مثل CTR، CPA، ROI'
  },
  {
    id: 'mkt-002',
    question: 'ما إستراتيجيتك لزيادة المتابعين على وسائل التواصل الاجتماعي؟',
    questionEn: 'What is your strategy for increasing social media followers?',
    category: 'strategic',
    difficulty: 'medium',
    specialty: 'marketing',
    keywords: ['وسائل التواصل', 'محتوى', 'تفاعل', 'استراتيجية'],
    tips: 'ركز على المحتوى القيم والتفاعل مع الجمهور'
  },
  
  // Finance Specialty
  {
    id: 'fin-001',
    question: 'شرح لي مفهوم التدفق النقدي وأهميته',
    questionEn: 'Explain the concept of cash flow and its importance',
    category: 'conceptual',
    difficulty: 'easy',
    specialty: 'finance',
    keywords: ['تدفق نقدي', 'سيولة', 'مالية'],
    tips: 'اشرح الفرق بين التدفق النقدي الداخل والخارج'
  },
  {
    id: 'fin-002',
    question: 'كيف تحلل الجدوى المالية لمشروع استثماري؟',
    questionEn: 'How do you analyze the financial feasibility of an investment project?',
    category: 'analytical',
    difficulty: 'hard',
    specialty: 'finance',
    keywords: ['جدوى مالية', 'استثمار', 'تحليل', 'عائد'],
    tips: 'تحدث عن NPV، IRR، وفترة الاسترداد'
  },
  
  // Healthcare Specialty  
  {
    id: 'health-001',
    question: 'كيف تتعامل مع مريض غاضب أو قلق؟',
    questionEn: 'How do you handle an angry or anxious patient?',
    category: 'behavioral',
    difficulty: 'medium',
    specialty: 'healthcare',
    keywords: ['مريض', 'تواصل', 'تهدئة', 'احترافية'],
    tips: 'أظهر التعاطف واستخدم مهارات التواصل الفعال'
  },
  {
    id: 'health-002',
    question: 'ما أهمية النظافة والتعقيم في الرعاية الصحية؟',
    questionEn: 'What is the importance of hygiene and sterilization in healthcare?',
    category: 'safety',
    difficulty: 'easy',
    specialty: 'healthcare',
    keywords: ['نظافة', 'تعقيم', 'عدوى', 'سلامة'],
    tips: 'اشرح دور النظافة في منع انتشار العدوى'
  },
  
  // Education Specialty
  {
    id: 'edu-001',
    question: 'كيف تتعامل مع الطلاب ذوي صعوبات التعلم؟',
    questionEn: 'How do you handle students with learning difficulties?',
    category: 'pedagogical',
    difficulty: 'medium',
    specialty: 'education',
    keywords: ['طلاب', 'صعوبات تعلم', 'تكيف', 'دعم'],
    tips: 'تحدث عن استراتيجيات التدريس المتنوعة والصبر'
  },
  {
    id: 'edu-002',
    question: 'ما فلسفتك في التدريس؟',
    questionEn: 'What is your teaching philosophy?',
    category: 'philosophical',
    difficulty: 'medium',
    specialty: 'education',
    keywords: ['فلسفة', 'تدريس', 'تعلم', 'طريقة'],
    tips: 'اشرح كيف تؤمن بأن التعلم يحدث وكيف تطبق ذلك'
  },
  
  // Engineering Specialty
  {
    id: 'eng-001',
    question: 'كيف تضمن جودة التصميم الهندسي؟',
    questionEn: 'How do you ensure quality in engineering design?',
    category: 'quality',
    difficulty: 'medium',
    specialty: 'engineering',
    keywords: ['جودة', 'تصميم', 'معايير', 'اختبار'],
    tips: 'تحدث عن المعايير الهندسية وعمليات المراجعة'
  },
  {
    id: 'eng-002',
    question: 'صف لي مشروع هندسي صعب واجهته وكيف حللته',
    questionEn: 'Describe a challenging engineering project you faced and how you solved it',
    category: 'problem-solving',
    difficulty: 'hard',
    specialty: 'engineering',
    keywords: ['مشروع', 'تحدي', 'حل مشكلة', 'إبداع'],
    tips: 'استخدم طريقة STAR (الموقف، المهمة، العمل، النتيجة)'
  }
];

export const getQuestionsBySpecialty = (specialty: string): InterviewQuestion[] => {
  return interviewQuestions.filter(q => q.specialty === specialty);
};

export const getQuestionsByDifficulty = (difficulty: string): InterviewQuestion[] => {
  return interviewQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (specialty: string, count: number = 5): InterviewQuestion[] => {
  const specialtyQuestions = getQuestionsBySpecialty(specialty);
  const shuffled = [...specialtyQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};