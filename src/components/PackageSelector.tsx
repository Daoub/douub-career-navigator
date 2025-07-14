import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Crown, Zap, Users, Calendar, FileText, MessageSquare, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PackageFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface Package {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  period: string;
  popular?: boolean;
  premium?: boolean;
  description: string;
  features: PackageFeature[];
  color: string;
  icon: React.ReactNode;
}

const PackageSelector: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('professional');
  const { toast } = useToast();

  const packages: Package[] = [
    {
      id: 'trial',
      name: 'الباقة التجريبية',
      nameEn: 'Trial Package',
      price: 0,
      period: '7 أيام',
      description: 'جرب خدماتنا مجاناً لمدة أسبوع كامل',
      color: 'from-emerald-500 to-green-600',
      icon: <Zap className="h-6 w-6" />,
      features: [
        { name: 'تحليل السيرة الذاتية', included: true, description: '3 تحليلات مجانية' },
        { name: 'جلسات تحضير المقابلات', included: true, description: 'جلستان مجانيتان' },
        { name: 'التقديم على الوظائف', included: true, description: '10 طلبات تقديم' },
        { name: 'الوصول للمجتمعات', included: true, description: 'وصول محدود' },
        { name: 'الدعم الفني', included: false },
        { name: 'استشارات مخصصة', included: false },
        { name: 'ورش العمل المباشرة', included: false },
        { name: 'تقارير تفصيلية', included: false }
      ]
    },
    {
      id: 'professional',
      name: 'الباقة المهنية',
      nameEn: 'Professional Package',
      price: 99,
      period: 'شهرياً',
      popular: true,
      description: 'الحل الأمثل للباحثين عن عمل الجديين',
      color: 'from-blue-500 to-indigo-600',
      icon: <Star className="h-6 w-6" />,
      features: [
        { name: 'تحليل السيرة الذاتية', included: true, description: 'تحليل غير محدود' },
        { name: 'جلسات تحضير المقابلات', included: true, description: 'جلسات أسبوعية' },
        { name: 'التقديم على الوظائف', included: true, description: 'تقديم غير محدود' },
        { name: 'الوصول للمجتمعات', included: true, description: 'وصول كامل' },
        { name: 'الدعم الفني', included: true, description: 'دعم عبر الشات' },
        { name: 'استشارات مخصصة', included: true, description: 'استشارة شهرية' },
        { name: 'ورش العمل المباشرة', included: true, description: 'ورشة أسبوعية' },
        { name: 'تقارير تفصيلية', included: true, description: 'تقارير شهرية' }
      ]
    },
    {
      id: 'enterprise',
      name: 'باقة المؤسسات',
      nameEn: 'Enterprise Package',
      price: 299,
      period: 'شهرياً',
      premium: true,
      description: 'حلول متقدمة للشركات وفرق الموارد البشرية',
      color: 'from-purple-500 to-pink-600',
      icon: <Crown className="h-6 w-6" />,
      features: [
        { name: 'تحليل السيرة الذاتية', included: true, description: 'تحليل مؤسسي متقدم' },
        { name: 'جلسات تحضير المقابلات', included: true, description: 'جلسات يومية' },
        { name: 'التقديم على الوظائف', included: true, description: 'تقديم مؤسسي' },
        { name: 'الوصول للمجتمعات', included: true, description: 'مجتمعات حصرية' },
        { name: 'الدعم الفني', included: true, description: 'دعم أولوية 24/7' },
        { name: 'استشارات مخصصة', included: true, description: 'استشارات غير محدودة' },
        { name: 'ورش العمل المباشرة', included: true, description: 'ورش مخصصة' },
        { name: 'تقارير تفصيلية', included: true, description: 'تقارير تحليلية متقدمة' }
      ]
    }
  ];

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
      toast({
        title: "تم اختيار الباقة",
        description: `تم اختيار ${pkg.name} بنجاح`,
      });
    }
  };

  const handlePurchase = () => {
    const pkg = packages.find(p => p.id === selectedPackage);
    if (pkg) {
      toast({
        title: "توجيه للدفع",
        description: `سيتم توجيهك لإتمام عملية الدفع لـ ${pkg.name}`,
      });
    }
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          اختر الباقة المناسبة لك
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          اختر من بين باقاتنا المتنوعة التي تناسب احتياجاتك وتساعدك في تحقيق أهدافك المهنية
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
              selectedPackage === pkg.id 
                ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                : 'hover:shadow-lg hover:scale-102'
            } ${pkg.popular ? 'border-blue-500' : ''} ${pkg.premium ? 'border-purple-500' : ''}`}
            onClick={() => handleSelectPackage(pkg.id)}
          >
            {/* Popular Badge */}
            {pkg.popular && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-blue-500 text-white">الأكثر شعبية</Badge>
              </div>
            )}
            
            {/* Premium Badge */}
            {pkg.premium && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-purple-500 text-white">باقة مميزة</Badge>
              </div>
            )}

            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${pkg.color} text-white p-6 text-center`}>
              <div className="flex justify-center mb-4">
                {pkg.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-white/80 text-sm mb-4">{pkg.description}</p>
              <div className="text-center">
                <span className="text-3xl font-bold">{pkg.price}</span>
                <span className="text-lg mr-1">ريال</span>
                <div className="text-sm text-white/80">{pkg.period}</div>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Features List */}
              <div className="space-y-3">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`mt-0.5 ${feature.included ? 'text-green-600' : 'text-gray-400'}`}>
                      {feature.included ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm font-medium ${
                        feature.included ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                      {feature.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {feature.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <Button 
                className={`w-full mt-6 ${
                  selectedPackage === pkg.id
                    ? `bg-gradient-to-r ${pkg.color} text-white`
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPackage(pkg.id);
                }}
              >
                {selectedPackage === pkg.id ? 'تم الاختيار' : 'اختر هذه الباقة'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Purchase Section */}
      <Card className="bg-gradient-to-br from-slate-50 to-blue-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            جاهز للبدء؟
          </h3>
          <p className="text-gray-600 mb-6">
            ابدأ رحلتك المهنية اليوم واحصل على الدعم الذي تحتاجه لتحقيق أهدافك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handlePurchase}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8"
            >
              إتمام الشراء
            </Button>
            <Button variant="outline" size="lg">
              مقارنة مفصلة للباقات
            </Button>
          </div>
          
          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <Shield className="h-4 w-4" />
            <span>دفع آمن ومشفر بنسبة 100%</span>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center">أسئلة شائعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">هل يمكنني تغيير الباقة لاحقاً؟</h4>
              <p className="text-sm text-gray-600">
                نعم، يمكنك ترقية أو تقليل باقتك في أي وقت من لوحة التحكم
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">هل هناك ضمان استرداد؟</h4>
              <p className="text-sm text-gray-600">
                نوفر ضمان استرداد لمدة 30 يوم إذا لم تكن راضياً عن الخدمة
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">ما هي طرق الدفع المتاحة؟</h4>
              <p className="text-sm text-gray-600">
                نقبل الفيزا والماستركارد والمدى وSTC Pay و Apple Pay
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">هل يتم التجديد تلقائياً؟</h4>
              <p className="text-sm text-gray-600">
                نعم، يتم التجديد تلقائياً ويمكنك إلغاؤه في أي وقت
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageSelector;