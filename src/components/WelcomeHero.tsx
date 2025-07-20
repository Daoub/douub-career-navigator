
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Briefcase, Users, TrendingUp, Star } from 'lucide-react';

const WelcomeHero = () => {
  const features = [
    {
      icon: Briefcase,
      title: "فرص وظيفية متميزة",
      description: "اكتشف أفضل الوظائف في السوق السعودي"
    },
    {
      icon: Users,
      title: "مجتمع مهني نشط",
      description: "تواصل مع المهنيين في مجالك"
    },
    {
      icon: TrendingUp,
      title: "تطوير مهني مستمر",
      description: "دورات وورش عمل لتطوير مهاراتك"
    },
    {
      icon: Star,
      title: "استشارات مهنية",
      description: "احصل على نصائح من خبراء في المجال"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50" dir="rtl">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              ادخل عالم الفرص المهنية
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              منصة دؤوب تساعدك في بناء مسيرتك المهنية من خلال أفضل الأدوات والموارد المتاحة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-lg px-8 py-3"
                asChild
              >
                <a href="/signup">
                  ابدأ رحلتك المهنية
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-3"
                asChild
              >
                <a href="/demo">شاهد العرض التوضيحي</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              لماذا تختار منصة دؤوب؟
            </h2>
            <p className="text-gray-600 text-lg">
              نقدم لك الأدوات والموارد اللازمة لبناء مسيرة مهنية ناجحة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-emerald-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">1000+</div>
              <div className="text-gray-600">فرصة وظيفية</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">عضو نشط</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">نسبة نجاح التوظيف</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              هل أنت مستعد للبدء؟
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              انضم إلى آلاف المهنيين الذين يستخدمون منصة دؤوب لتطوير مسيرتهم المهنية
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-lg px-12 py-4"
              asChild
            >
              <a href="/signup">
                انضم إلينا الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomeHero;
