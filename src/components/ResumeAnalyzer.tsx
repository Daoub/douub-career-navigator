import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Brain, CheckCircle, AlertTriangle, X, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywords: string[];
  formatIssues: string[];
  competitiveness: 'low' | 'medium' | 'high';
}

const ResumeAnalyzer: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال محتوى السيرة الذاتية",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis with realistic results
    setTimeout(() => {
      const result: AnalysisResult = {
        score: 75,
        strengths: [
          "خبرة واضحة في تطوير البرمجيات",
          "تنوع في المهارات التقنية",
          "خبرة في أدوات حديثة مثل React و Node.js",
          "تعليم أكاديمي قوي",
          "شهادات مهنية معتمدة"
        ],
        weaknesses: [
          "عدم وجود أرقام محددة للإنجازات",
          "نقص في الكلمات المفتاحية المطلوبة",
          "لا توجد مشاريع شخصية مذكورة",
          "الملخص المهني قصير جداً"
        ],
        suggestions: [
          "أضف أرقام محددة لإنجازاتك (مثل: زيادة الأداء بنسبة 30%)",
          "ضمّن كلمات مفتاحية أكثر من مجال عملك",
          "أضف مشاريع شخصية أو مساهمات مفتوحة المصدر",
          "وسّع الملخص المهني ليشمل أهدافك وقيمتك المضافة",
          "أضف روابط لحسابك على LinkedIn أو GitHub"
        ],
        keywords: ["React", "Node.js", "JavaScript", "تطوير البرمجيات", "بكالوريوس"],
        formatIssues: [
          "استخدم خط موحد في جميع أنحاء السيرة الذاتية",
          "أضف مساحات بيضاء أكثر بين الأقسام"
        ],
        competitiveness: 'medium'
      };

      setAnalysisResult(result);
      setIsAnalyzing(false);

      toast({
        title: "تم التحليل بنجاح",
        description: "تم تحليل سيرتك الذاتية بواسطة الذكاء الاصطناعي",
      });
    }, 3000);
  };

  const getCompetitivenessColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCompetitivenessLabel = (level: string) => {
    switch (level) {
      case 'low': return 'منخفضة';
      case 'medium': return 'متوسطة';
      case 'high': return 'عالية';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            تحليل السيرة الذاتية بالذكاء الاصطناعي
          </CardTitle>
          <CardDescription>
            احصل على تحليل شامل لسيرتك الذاتية مع توصيات للتحسين
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نص السيرة الذاتية
            </label>
            <Textarea
              placeholder="الصق محتوى سيرتك الذاتية هنا أو اكتب المعلومات الأساسية..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="text-right min-h-[200px]"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={analyzeResume}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-pulse" />
                  جاري التحليل...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  تحليل السيرة الذاتية
                </>
              )}
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              رفع ملف PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>النتيجة الإجمالية</span>
                <span className="text-2xl font-bold text-emerald-600">
                  {analysisResult.score}/100
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={analysisResult.score} className="mb-4" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">مستوى التنافسية</span>
                <span className={`font-medium ${getCompetitivenessColor(analysisResult.competitiveness)}`}>
                  {getCompetitivenessLabel(analysisResult.competitiveness)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                نقاط القوة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResult.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                نقاط التحسين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResult.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Zap className="h-5 w-5" />
                توصيات للتحسين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full min-w-fit">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Keywords Found */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>الكلمات المفتاحية المكتشفة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysisResult.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;