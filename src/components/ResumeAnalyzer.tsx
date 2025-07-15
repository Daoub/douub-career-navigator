import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Brain, CheckCircle, AlertTriangle, X, Zap, Shield, TrendingUp, Target, Award, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { sampleAnalysisResult } from '@/data/aiAnalysisData';
import type { AIAnalysisResult } from '@/data/aiAnalysisData';


const ResumeAnalyzer: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const { toast } = useToast();
  const { t, language } = useTranslation();

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

    // Simulate AI analysis with comprehensive results
    setTimeout(() => {
      setAnalysisResult(sampleAnalysisResult);
      setIsAnalyzing(false);

      toast({
        title: language === 'ar' ? 'تم التحليل بنجاح' : 'Analysis Complete',
        description: language === 'ar' 
          ? 'تم تحليل سيرتك الذاتية بواسطة الذكاء الاصطناعي'
          : 'Your resume has been analyzed by AI',
      });
    }, 3000);
  };

  const getCompetitivenessFromScore = (score: number) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  const getCompetitivenessColor = (score: number) => {
    const level = getCompetitivenessFromScore(score);
    switch (level) {
      case 'low': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCompetitivenessLabel = (score: number) => {
    const level = getCompetitivenessFromScore(score);
    switch (level) {
      case 'low': return language === 'ar' ? 'منخفضة' : 'Low';
      case 'medium': return language === 'ar' ? 'متوسطة' : 'Medium';
      case 'high': return language === 'ar' ? 'عالية' : 'High';
      default: return language === 'ar' ? 'غير محدد' : 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-hero gradient-text-hero mb-4">
          {language === 'ar' ? 'تحليل السيرة الذاتية بالذكاء الاصطناعي' : 'AI Resume Analysis'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'ar' 
            ? 'احصل على تحليل شامل لسيرتك الذاتية مع توصيات للتحسين'
            : 'Get comprehensive analysis of your resume with improvement recommendations'
          }
        </p>
      </div>

      {/* Input Section */}
      <Card className="card-vision">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            {language === 'ar' ? 'تحليل السيرة الذاتية' : 'Resume Analysis'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' 
              ? 'الصق محتوى سيرتك الذاتية أو اكتب المعلومات الأساسية'
              : 'Paste your resume content or write basic information'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              placeholder={language === 'ar' 
                ? 'الصق محتوى سيرتك الذاتية هنا أو اكتب المعلومات الأساسية...'
                : 'Paste your resume content here or write basic information...'
              }
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[200px]"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={analyzeResume}
              disabled={isAnalyzing}
              className="bg-gradient-primary btn-gradient-hover"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-pulse" />
                  {language === 'ar' ? 'جاري التحليل...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'تحليل السيرة الذاتية' : 'Analyze Resume'}
                </>
              )}
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              {language === 'ar' ? 'رفع ملف PDF' : 'Upload PDF'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {language === 'ar' ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {language === 'ar' ? 'الرؤى' : 'Insights'}
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {language === 'ar' ? 'الكلمات المفتاحية' : 'Keywords'}
            </TabsTrigger>
            <TabsTrigger value="saudi" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {language === 'ar' ? 'التوافق السعودي' : 'Saudi Compliance'}
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              {language === 'ar' ? 'التوصيات' : 'Recommendations'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Overall Score */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{language === 'ar' ? 'النتيجة الإجمالية' : 'Overall Score'}</span>
                    <span className="text-2xl font-bold text-primary">
                      {analysisResult.metrics.overallScore}/100
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={analysisResult.metrics.overallScore} className="mb-4" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'مستوى التنافسية' : 'Competitiveness Level'}
                    </span>
                    <span className={`font-medium ${getCompetitivenessColor(analysisResult.metrics.overallScore)}`}>
                      {getCompetitivenessLabel(analysisResult.metrics.overallScore)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* ATS Score */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'توافق ATS' : 'ATS Compatibility'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary mb-2">
                    {analysisResult.metrics.atsScore}/100
                  </div>
                  <Progress value={analysisResult.metrics.atsScore} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' 
                      ? 'مدى توافق سيرتك مع أنظمة التتبع الآلي'
                      : 'How well your resume works with tracking systems'
                    }
                  </p>
                </CardContent>
              </Card>

              {/* Saudi Compliance */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {language === 'ar' ? 'التوافق السعودي' : 'Saudi Compliance'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success mb-2">
                    {analysisResult.saudiCompliance.score}/100
                  </div>
                  <Progress value={analysisResult.saudiCompliance.score} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' 
                      ? 'مدى توافق سيرتك مع متطلبات السوق السعودي'
                      : 'How well your resume meets Saudi market requirements'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              {/* Strengths */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <CheckCircle className="h-5 w-5" />
                    {language === 'ar' ? 'نقاط القوة' : 'Strengths'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.insights.filter(insight => insight.type === 'strength').map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">
                          {language === 'ar' ? insight.descriptionAr : insight.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Weaknesses */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    {language === 'ar' ? 'نقاط التحسين' : 'Areas for Improvement'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.insights.filter(insight => insight.type === 'weakness').map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">
                          {language === 'ar' ? insight.descriptionAr : insight.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="keywords">
            <div className="space-y-6">
              {/* Keywords Found */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="text-success">
                    {language === 'ar' ? 'الكلمات المفتاحية الموجودة' : 'Keywords Found'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywordAnalysis.present.map((keyword, index) => (
                      <Badge key={index} variant="default" className="bg-success">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Missing Keywords */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="text-warning">
                    {language === 'ar' ? 'الكلمات المفتاحية المفقودة' : 'Missing Keywords'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywordAnalysis.missing.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="border-warning">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saudi">
            <div className="space-y-6">
              {/* Saudi Compliance Issues */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {language === 'ar' ? 'مشاكل التوافق' : 'Compliance Issues'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.saudiCompliance.issues.map((issue, index) => (
                      <div key={index} className="p-3 rounded-lg border">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`h-4 w-4 mt-1 flex-shrink-0 ${
                            issue.severity === 'critical' ? 'text-destructive' : 
                            issue.severity === 'warning' ? 'text-warning' : 'text-muted-foreground'
                          }`} />
                          <div>
                            <p className="font-medium">
                              {language === 'ar' ? issue.messageAr : issue.message}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {language === 'ar' ? issue.solutionAr : issue.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="space-y-6">
              {/* Immediate Recommendations */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warning">
                    <Zap className="h-5 w-5" />
                    {language === 'ar' ? 'توصيات فورية' : 'Immediate Recommendations'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(language === 'ar' ? analysisResult.recommendations.immediateAr : analysisResult.recommendations.immediate).map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-warning/10 text-warning text-xs font-medium px-2 py-1 rounded-full min-w-fit">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Long-term Recommendations */}
              <Card className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Award className="h-5 w-5" />
                    {language === 'ar' ? 'توصيات طويلة المدى' : 'Long-term Recommendations'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(language === 'ar' ? analysisResult.recommendations.longTermAr : analysisResult.recommendations.longTerm).map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full min-w-fit">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ResumeAnalyzer;