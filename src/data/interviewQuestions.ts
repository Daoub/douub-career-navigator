
export interface InterviewQuestion {
  id: string;
  question: string;
  questionAr: string;
  category: 'technical' | 'behavioral' | 'situational' | 'cultural' | 'leadership';
  industry: string;
  difficulty: 'easy' | 'medium' | 'hard';
  sampleAnswer?: string;
  sampleAnswerAr?: string;
  tips: string[];
  tipsAr: string[];
  keywords: string[];
  keywordsAr: string[];
  saudiContext?: boolean;
}

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: '1',
    question: 'Tell me about yourself',
    questionAr: 'أخبرني عن نفسك',
    category: 'behavioral',
    industry: 'general',
    difficulty: 'easy',
    tips: [
      'Keep it concise and professional',
      'Focus on relevant experience',
      'Show enthusiasm for the role'
    ],
    tipsAr: [
      'اجعل إجابتك مختصرة ومهنية',
      'ركز على الخبرة ذات الصلة',
      'أظهر الحماس للدور'
    ],
    keywords: ['experience', 'skills', 'passion', 'professional'],
    keywordsAr: ['خبرة', 'مهارات', 'شغف', 'مهني'],
    saudiContext: false
  },
  {
    id: '2',
    question: 'What are your strengths and weaknesses?',
    questionAr: 'ما هي نقاط قوتك وضعفك؟',
    category: 'behavioral',
    industry: 'general',
    difficulty: 'medium',
    tips: [
      'Be honest about weaknesses but show how you\'re improving',
      'Choose strengths relevant to the job',
      'Provide specific examples'
    ],
    tipsAr: [
      'كن صادقاً حول نقاط الضعف لكن أظهر كيف تتحسن',
      'اختر نقاط القوة ذات الصلة بالوظيفة',
      'قدم أمثلة محددة'
    ],
    keywords: ['strengths', 'weaknesses', 'self-awareness', 'improvement'],
    keywordsAr: ['نقاط القوة', 'نقاط الضعف', 'الوعي الذاتي', 'التحسن'],
    saudiContext: false
  },
  {
    id: '3',
    question: 'Why do you want to work for our company?',
    questionAr: 'لماذا تريد العمل في شركتنا؟',
    category: 'cultural',
    industry: 'general',
    difficulty: 'medium',
    tips: [
      'Research the company thoroughly',
      'Align your values with company values',
      'Show genuine interest'
    ],
    tipsAr: [
      'ابحث عن الشركة بدقة',
      'أربط قيمك بقيم الشركة',
      'أظهر اهتماماً حقيقياً'
    ],
    keywords: ['company culture', 'values', 'mission', 'research'],
    keywordsAr: ['ثقافة الشركة', 'القيم', 'الرسالة', 'البحث'],
    saudiContext: false
  },
  {
    id: '4',
    question: 'How do you handle working under pressure?',
    questionAr: 'كيف تتعامل مع العمل تحت الضغط؟',
    category: 'situational',
    industry: 'general',
    difficulty: 'medium',
    tips: [
      'Provide specific examples',
      'Show your problem-solving approach',
      'Demonstrate composure'
    ],
    tipsAr: [
      'قدم أمثلة محددة',
      'أظهر منهجك في حل المشاكل',
      'أظهر الهدوء والتماسك'
    ],
    keywords: ['pressure', 'stress management', 'problem-solving', 'composure'],
    keywordsAr: ['ضغط', 'إدارة التوتر', 'حل المشاكل', 'الهدوء'],
    saudiContext: false
  },
  {
    id: '5',
    question: 'Where do you see yourself in 5 years?',
    questionAr: 'أين ترى نفسك خلال 5 سنوات؟',
    category: 'behavioral',
    industry: 'general',
    difficulty: 'easy',
    tips: [
      'Show ambition but be realistic',
      'Align with company growth opportunities',
      'Focus on professional development'
    ],
    tipsAr: [
      'أظهر الطموح لكن كن واقعياً',
      'أربط إجابتك بفرص النمو في الشركة',
      'ركز على التطوير المهني'
    ],
    keywords: ['career goals', 'ambition', 'growth', 'development'],
    keywordsAr: ['الأهداف المهنية', 'الطموح', 'النمو', 'التطوير'],
    saudiContext: false
  }
];

export const getQuestionsBySpecialty = (specialty: string) => interviewQuestions;
export const getRandomQuestions = (count: number = 5) => {
  const shuffled = [...interviewQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, interviewQuestions.length));
};
