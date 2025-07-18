import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw, Timer, BookOpen, Target, Lightbulb } from 'lucide-react';
import { getQuestionsBySpecialty, getRandomQuestions, InterviewQuestion } from '@/data/interviewQuestions';

interface InterviewPrepProps {
  specialty?: string;
}

const InterviewPrep: React.FC<InterviewPrepProps> = ({ specialty = 'technology' }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialty);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const specialties = [
    { value: 'technology', label: 'التقنية', labelEn: 'Technology' },
    { value: 'marketing', label: 'التسويق', labelEn: 'Marketing' },
    { value: 'finance', label: 'المالية', labelEn: 'Finance' },
    { value: 'healthcare', label: 'الصحة', labelEn: 'Healthcare' },
    { value: 'education', label: 'التعليم', labelEn: 'Education' },
    { value: 'engineering', label: 'الهندسة', labelEn: 'Engineering' }
  ];

  useEffect(() => {
    const questionSet = getRandomQuestions(10);
    setQuestions(questionSet);
    setCurrentQuestion(questionSet[0] || null);
    setCurrentIndex(0);
    setIsActive(false);
    setTimer(0);
  }, [selectedSpecialty]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const startSession = () => {
    setIsActive(true);
    setTimer(0);
  };

  const stopSession = () => {
    setIsActive(false);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestion(questions[currentIndex + 1]);
      setTimer(0);
    }
  };

  const resetSession = () => {
    setIsActive(false);
    setTimer(0);
    setCurrentIndex(0);
    setCurrentQuestion(questions[0] || null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'سهل';
      case 'medium': return 'متوسط';
      case 'hard': return 'صعب';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-600" />
            تحضير المقابلات
          </CardTitle>
          <CardDescription>
            تدرب على أسئلة المقابلات الشائعة في تخصصك
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اختر التخصص
              </label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر التخصص" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((spec) => (
                    <SelectItem key={spec.value} value={spec.value}>
                      {spec.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end gap-2">
              {!isActive ? (
                <Button onClick={startSession} className="bg-gradient-to-r from-emerald-600 to-blue-600">
                  <Play className="h-4 w-4 mr-2" />
                  بدء الجلسة
                </Button>
              ) : (
                <Button onClick={stopSession} variant="outline">
                  إيقاف
                </Button>
              )}
              <Button onClick={resetSession} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                إعادة تعيين
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Display */}
      {currentQuestion && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">
                  السؤال {currentIndex + 1} من {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                  {getDifficultyLabel(currentQuestion.difficulty)}
                </Badge>
                <div className="flex items-center gap-1 text-gray-600">
                  <Timer className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timer)}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 leading-relaxed">
                {currentQuestion.question}
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentQuestion.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {currentQuestion.tips && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">نصيحة</h4>
                    <p className="text-yellow-700 text-sm">{currentQuestion.tips}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button 
                onClick={nextQuestion} 
                disabled={currentIndex >= questions.length - 1}
                className="bg-gradient-to-r from-emerald-600 to-blue-600"
              >
                السؤال التالي
              </Button>
              <div className="text-sm text-gray-500">
                فئة: {currentQuestion.category}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Indicator */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">التقدم في الجلسة</span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewPrep;
