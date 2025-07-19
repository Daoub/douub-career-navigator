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
  return;
};
export default PackageSelector;