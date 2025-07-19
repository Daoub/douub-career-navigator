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
  const {
    toast
  } = useToast();
  const packages: Package[] = [{
    id: 'trial',
    name: 'الباقة التجريبية',
    nameEn: 'Trial Package',
    price: 0,
    period: '7 أيام',
    description: 'جرب خدماتنا مجاناً لمدة أسبوع كامل',
    color: 'from-emerald-500 to-green-600',
    icon: <Zap className="h-6 w-6" />,
    features: [{
      name: 'تحليل السيرة الذاتية',
      included: true,
      description: '3 تحليلات مجانية'
    }, {
      name: 'جلسات تحضير المقابلات',
      included: true,
      description: 'جلستان مجانيتان'
    }, {
      name: 'التقديم على الوظائف',
      included: true,
      description: '10 طلبات تقديم'
    }, {
      name: 'الوصول للمجتمعات',
      included: true,
      description: 'وصول محدود'
    }, {
      name: 'الدعم الفني',
      included: false
    }, {
      name: 'استشارات مخصصة',
      included: false
    }, {
      name: 'ورش العمل المباشرة',
      included: false
    }, {
      name: 'تقارير تفصيلية',
      included: false
    }]
  }, {
    id: 'professional',
    name: 'الباقة المهنية',
    nameEn: 'Professional Package',
    price: 99,
    period: 'شهرياً',
    popular: true,
    description: 'الحل الأمثل للباحثين عن عمل الجديين',
    color: 'from-blue-500 to-indigo-600',
    icon: <Star className="h-6 w-6" />,
    features: [{
      name: 'تحليل السيرة الذاتية',
      included: true,
      description: 'تحليل غير محدود'
    }, {
      name: 'جلسات تحضير المقابلات',
      included: true,
      description: 'جلسات أسبوعية'
    }, {
      name: 'التقديم على الوظائف',
      included: true,
      description: 'تقديم غير محدود'
    }, {
      name: 'الوصول للمجتمعات',
      included: true,
      description: 'وصول كامل'
    }, {
      name: 'الدعم الفني',
      included: true,
      description: 'دعم عبر الشات'
    }, {
      name: 'استشارات مخصصة',
      included: true,
      description: 'استشارة شهرية'
    }, {
      name: 'ورش العمل المباشرة',
      included: true,
      description: 'ورشة أسبوعية'
    }, {
      name: 'تقارير تفصيلية',
      included: true,
      description: 'تقارير شهرية'
    }]
  }, {
    id: 'enterprise',
    name: 'باقة المؤسسات',
    nameEn: 'Enterprise Package',
    price: 299,
    period: 'شهرياً',
    premium: true,
    description: 'حلول متقدمة للشركات وفرق الموارد البشرية',
    color: 'from-purple-500 to-pink-600',
    icon: <Crown className="h-6 w-6" />,
    features: [{
      name: 'تحليل السيرة الذاتية',
      included: true,
      description: 'تحليل مؤسسي متقدم'
    }, {
      name: 'جلسات تحضير المقابلات',
      included: true,
      description: 'جلسات يومية'
    }, {
      name: 'التقديم على الوظائف',
      included: true,
      description: 'تقديم مؤسسي'
    }, {
      name: 'الوصول للمجتمعات',
      included: true,
      description: 'مجتمعات حصرية'
    }, {
      name: 'الدعم الفني',
      included: true,
      description: 'دعم أولوية 24/7'
    }, {
      name: 'استشارات مخصصة',
      included: true,
      description: 'استشارات غير محدودة'
    }, {
      name: 'ورش العمل المباشرة',
      included: true,
      description: 'ورش مخصصة'
    }, {
      name: 'تقارير تفصيلية',
      included: true,
      description: 'تقارير تحليلية متقدمة'
    }]
  }];
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
      toast({
        title: "تم اختيار الباقة",
        description: `تم اختيار ${pkg.name} بنجاح`
      });
    }
  };
  const handlePurchase = () => {
    const pkg = packages.find(p => p.id === selectedPackage);
    if (pkg) {
      toast({
        title: "توجيه للدفع",
        description: `سيتم توجيهك لإتمام عملية الدفع لـ ${pkg.name}`
      });
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">اختر الباقة المناسبة لك</h2>
        <p className="text-muted-foreground text-lg">باقات مصممة خصيصاً لتلبية احتياجاتك المهنية</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative transition-all duration-300 hover:shadow-lg cursor-pointer ${
              selectedPackage === pkg.id ? 'ring-2 ring-primary' : ''
            } ${pkg.popular ? 'border-primary shadow-md' : ''}`}
            onClick={() => handleSelectPackage(pkg.id)}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">الأكثر شعبية</Badge>
              </div>
            )}
            {pkg.premium && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">مميز</Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center text-white`}>
                {pkg.icon}
              </div>
              <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
              <CardDescription className="text-sm">{pkg.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-foreground">{pkg.price === 0 ? 'مجاني' : `${pkg.price} ر.س`}</span>
                <span className="text-muted-foreground text-sm">/{pkg.period}</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3 space-x-reverse">
                    <div className="mt-0.5">
                      {feature.included ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {feature.name}
                      </span>
                      {feature.description && (
                        <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full mt-6"
                variant={selectedPackage === pkg.id ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPackage(pkg.id);
                }}
              >
                {selectedPackage === pkg.id ? 'الباقة المختارة' : 'اختيار الباقة'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          size="lg"
          onClick={handlePurchase}
          className="px-8 py-3"
          disabled={!selectedPackage}
        >
          {selectedPackage === 'trial' ? 'ابدأ التجربة المجانية' : 'المتابعة للدفع'}
        </Button>
      </div>
    </div>
  );
};
export default PackageSelector;