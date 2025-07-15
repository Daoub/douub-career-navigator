export interface AnalysisMetrics {
  overallScore: number;
  atsScore: number;
  readabilityScore: number;
  impactScore: number;
  completenessScore: number;
  saudiComplianceScore: number;
}

export interface AnalysisInsight {
  type: 'strength' | 'weakness' | 'suggestion' | 'critical';
  category: 'content' | 'format' | 'keywords' | 'structure' | 'saudi_compliance';
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  priority: number;
}

export interface KeywordAnalysis {
  missing: string[];
  present: string[];
  density: { [key: string]: number };
  recommendations: string[];
}

export interface SaudiComplianceCheck {
  score: number;
  issues: {
    type: 'format' | 'content' | 'cultural' | 'legal';
    severity: 'critical' | 'warning' | 'suggestion';
    message: string;
    messageAr: string;
    solution: string;
    solutionAr: string;
  }[];
  recommendations: string[];
  recommendationsAr: string[];
}

export interface IndustryBenchmark {
  industry: string;
  industryAr: string;
  averageScore: number;
  topKeywords: string[];
  commonSkills: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  marketTrends: string[];
}

export interface AIAnalysisResult {
  id: string;
  timestamp: Date;
  metrics: AnalysisMetrics;
  insights: AnalysisInsight[];
  keywordAnalysis: KeywordAnalysis;
  saudiCompliance: SaudiComplianceCheck;
  industryBenchmark: IndustryBenchmark;
  recommendations: {
    immediate: string[];
    immediateAr: string[];
    longTerm: string[];
    longTermAr: string[];
  };
  competitiveAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export const sampleAnalysisResult: AIAnalysisResult = {
  id: '1',
  timestamp: new Date(),
  metrics: {
    overallScore: 78,
    atsScore: 85,
    readabilityScore: 72,
    impactScore: 80,
    completenessScore: 75,
    saudiComplianceScore: 90
  },
  insights: [
    {
      type: 'strength',
      category: 'content',
      title: 'Strong Professional Summary',
      titleAr: 'ملخص مهني قوي',
      description: 'Your professional summary effectively highlights your key achievements and skills',
      descriptionAr: 'ملخصك المهني يسلط الضوء بفعالية على إنجازاتك ومهاراتك الرئيسية',
      impact: 'high',
      actionable: false,
      priority: 1
    },
    {
      type: 'weakness',
      category: 'keywords',
      title: 'Missing Industry Keywords',
      titleAr: 'مفقود كلمات مفتاحية للصناعة',
      description: 'Your resume lacks important industry-specific keywords that ATS systems look for',
      descriptionAr: 'سيرتك الذاتية تفتقر إلى كلمات مفتاحية مهمة خاصة بالصناعة التي تبحث عنها أنظمة التتبع',
      impact: 'high',
      actionable: true,
      priority: 2
    },
    {
      type: 'suggestion',
      category: 'format',
      title: 'Improve Section Organization',
      titleAr: 'تحسين تنظيم الأقسام',
      description: 'Consider reordering sections to put most relevant information first',
      descriptionAr: 'فكر في إعادة ترتيب الأقسام لوضع المعلومات الأكثر صلة أولاً',
      impact: 'medium',
      actionable: true,
      priority: 3
    },
    {
      type: 'critical',
      category: 'saudi_compliance',
      title: 'Add Saudi Nationality Information',
      titleAr: 'إضافة معلومات الجنسية السعودية',
      description: 'Saudi employers typically expect nationality information in resumes',
      descriptionAr: 'أرباب العمل السعوديون يتوقعون عادة معلومات الجنسية في السيرة الذاتية',
      impact: 'high',
      actionable: true,
      priority: 1
    }
  ],
  keywordAnalysis: {
    missing: ['Leadership', 'Project Management', 'Strategic Planning', 'Team Building'],
    present: ['JavaScript', 'React', 'Node.js', 'Problem Solving'],
    density: {
      'JavaScript': 0.8,
      'React': 0.6,
      'Node.js': 0.4,
      'Problem Solving': 0.3
    },
    recommendations: [
      'Add more leadership-related keywords',
      'Include project management terminology',
      'Mention strategic planning experience',
      'Highlight team collaboration skills'
    ]
  },
  saudiCompliance: {
    score: 90,
    issues: [
      {
        type: 'content',
        severity: 'suggestion',
        message: 'Consider adding marital status',
        messageAr: 'فكر في إضافة الحالة الاجتماعية',
        solution: 'Add marital status field in personal information',
        solutionAr: 'أضف حقل الحالة الاجتماعية في المعلومات الشخصية'
      },
      {
        type: 'format',
        severity: 'warning',
        message: 'Photo section is missing',
        messageAr: 'قسم الصورة مفقود',
        solution: 'Add a professional photo section',
        solutionAr: 'أضف قسم صورة شخصية مهنية'
      }
    ],
    recommendations: [
      'Include Saudi ID number (if applicable)',
      'Add professional photo',
      'Include references section',
      'Consider adding Hijri dates'
    ],
    recommendationsAr: [
      'أضف رقم الهوية السعودية (إن أمكن)',
      'أضف صورة شخصية مهنية',
      'أضف قسم المراجع',
      'فكر في إضافة التواريخ الهجرية'
    ]
  },
  industryBenchmark: {
    industry: 'Software Development',
    industryAr: 'تطوير البرمجيات',
    averageScore: 72,
    topKeywords: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    commonSkills: ['Problem Solving', 'Team Work', 'Communication', 'Leadership'],
    salaryRange: {
      min: 8000,
      max: 25000,
      currency: 'SAR'
    },
    marketTrends: [
      'High demand for React developers',
      'Growing need for cloud expertise',
      'Remote work opportunities increasing'
    ]
  },
  recommendations: {
    immediate: [
      'Add missing industry keywords',
      'Include nationality information',
      'Improve section organization',
      'Add quantifiable achievements'
    ],
    immediateAr: [
      'أضف الكلمات المفتاحية المفقودة للصناعة',
      'أضف معلومات الجنسية',
      'حسن تنظيم الأقسام',
      'أضف إنجازات قابلة للقياس'
    ],
    longTerm: [
      'Develop leadership skills',
      'Gain project management experience',
      'Build stronger professional network',
      'Pursue relevant certifications'
    ],
    longTermAr: [
      'طور مهارات القيادة',
      'اكتسب خبرة في إدارة المشاريع',
      'بناء شبكة مهنية أقوى',
      'اسع للحصول على شهادات ذات صلة'
    ]
  },
  competitiveAnalysis: {
    strengths: [
      'Strong technical skills',
      'Diverse project experience',
      'Good educational background',
      'Relevant certifications'
    ],
    weaknesses: [
      'Limited leadership experience',
      'Lack of industry keywords',
      'Missing quantifiable achievements',
      'Incomplete Saudi compliance'
    ],
    opportunities: [
      'Growing tech sector in Saudi Arabia',
      'Vision 2030 digital transformation',
      'Remote work acceptance',
      'Startup ecosystem growth'
    ],
    threats: [
      'Increased competition from international talent',
      'Rapid technology changes',
      'Automation of routine tasks',
      'Economic uncertainties'
    ]
  }
};