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
  }
];

export const getQuestionsBySpecialty = (specialty: string) => interviewQuestions;
export const getRandomQuestions = (count: number = 5) => interviewQuestions.slice(0, count);