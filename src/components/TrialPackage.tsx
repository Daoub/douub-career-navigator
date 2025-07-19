import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gift, Clock, Star, CheckCircle, Lock, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrialFeature {
  name: string;
  used: number;
  limit: number;
  icon: React.ReactNode;
  description: string;
}

const TrialPackage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(7 * 24 * 60 * 60); // 7 days in seconds
  const [trialFeatures, setTrialFeatures] = useState<TrialFeature[]>([
    {
      name: 'تحليل السيرة الذاتية',
      used: 1,
      limit: 3,
      icon: <Star className="h-4 w-4" />,
      description: ''
    },
    {
      name: 'جلسات تحضير المقابلات',
      used: 0,
      limit: 2,
      icon: <CheckCircle className="h-4 w-4" />,
      description: 'جلسات تدريبية على أسئلة المقابلات'
    },
    {
      name: 'التقديم على الوظائف',
      used: 5,
      limit: 10,
      icon: <Zap className="h-4 w-4" />,
      description: 'تقديم مبسط على الوظائف المنشورة'
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    return `${days}د ${hours}س ${minutes}ق ${secs}ث`;
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return (used / limit) * 100;
  };

  const getUsageColor = (used: number, limit: number) => {
    const percentage = getUsagePercentage(used, limit);
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const upgradeToProfessional = () => {
    toast({
      title: "ترقية الحساب",
      description: "سيتم توجيهك لصفحة الترقية للحصول على ميزات أكثر",
    });
  };

  const useFeature = (featureName: string) => {
    setTrialFeatures(prev => 
      prev.map(feature => 
        feature.name === featureName
          ? { ...feature, used: Math.min(feature.used + 1, feature.limit) }
          : feature
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Trial Status */}
      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-emerald-600" />
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              الباقة التجريبية المجانية
            </span>
          </CardTitle>
          <CardDescription>
            استمتع بميزات دؤوب مجاناً لفترة محدودة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">الوقت المتبقي:</span>
            </div>
            <Badge variant="outline" className="bg-white">
              {formatTime(timeLeft)}
            </Badge>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-emerald-200">
            <h4 className="font-medium text-emerald-800 mb-2">ما تحصل عليه مجاناً:</h4>
            <ul className="space-y-1 text-sm text-emerald-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                الاطلاع على الوظائف
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
               الاطلاع على مسميات نماذج الأعمال
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                الاطلاع على الأحداث المهنية 
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                معرفة المسميات الوظيفة لخدمة أسئلة المقابلات الشخصية
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Feature Usage */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>استخدام الميزات</CardTitle>
          <CardDescription>
            تتبع استخدامك للميزات المجانية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {trialFeatures.map((feature, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {feature.icon}
                  <span className="font-medium text-gray-800">{feature.name}</span>
                </div>
                <span className={`text-sm font-medium ${getUsageColor(feature.used, feature.limit)}`}>
                  {feature.used} / {feature.limit}
                </span>
              </div>
              
              <Progress 
                value={getUsagePercentage(feature.used, feature.limit)} 
                className="h-2"
              />
              
              <p className="text-xs text-gray-500">{feature.description}</p>
              
              {feature.used >= feature.limit && (
                <div className="flex items-center gap-2 text-xs text-red-600">
                  <Lock className="h-3 w-3" />
                  <span>تم استنفاد الحد المسموح</span>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => useFeature('تحليل السيرة الذاتية')}
              disabled={trialFeatures[0].used >= trialFeatures[0].limit}
            >
              <Star className="h-4 w-4" />
              تحليل السيرة الذاتية
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => useFeature('جلسات تحضير المقابلات')}
              disabled={trialFeatures[1].used >= trialFeatures[1].limit}
            >
              <CheckCircle className="h-4 w-4" />
              تحضير المقابلة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrialPackage;
