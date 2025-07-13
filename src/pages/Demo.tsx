
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Briefcase, Star, CheckCircle, Users, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Demo = () => {
  const demoFeatures = [
    {
      title: "البحث الذكي عن الوظائف",
      description: "شاهد كيف يمكن للمنصة العثور على الوظائف المناسبة لك من مختلف المصادر",
      icon: <Briefcase className="h-6 w-6" />,
      duration: "2:30"
    },
    {
      title: "بناء السيرة الذاتية المهنية",
      description: "تعلم كيفية إنشاء سيرة ذاتية احترافية باستخدام أدواتنا الذكية",
      icon: <Star className="h-6 w-6" />,
      duration: "3:45"
    },
    {
      title: "جلسات الاستشارة المباشرة",
      description: "اكتشف كيف تتم جلسات الاستشارة مع خبراء الموارد البشرية",
      icon: <Users className="h-6 w-6" />,
      duration: "4:20"
    },
    {
      title: "المجتمعات المهنية",
      description: "استكشف كيفية التواصل والتفاعل مع المهنيين في مجالك",
      icon: <Award className="h-6 w-6" />,
      duration: "2:15"
    }
  ];

  const testimonials = [
    {
      name: "سارة أحمد",
      role: "مطورة برمجيات",
      comment: "منصة دؤوب ساعدتني في العثور على وظيفة أحلامي في أقل من شهر",
      rating: 5
    },
    {
      name: "محمد علي",
      role: "مدير تسويق",
      comment: "الاستشارات المهنية كانت مفيدة جداً في تطوير مسيرتي المهنية",
      rating: 5
    },
    {
      name: "فاطمة خالد",
      role: "محاسبة",
      comment: "أدوات بناء السيرة الذاتية احترافية جداً وسهلة الاستخدام",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-2 rounded-lg">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  دؤوب
                </h1>
                <p className="text-sm text-gray-600">العرض التوضيحي</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6 rtl:space-x-reverse">
              <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
                الصفحة الرئيسية
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-emerald-600 transition-colors">
                تسجيل الدخول
              </Link>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                <Link to="/signup">ابدأ الآن</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            اكتشف قوة منصة دؤوب
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            شاهد كيف تعمل منصتنا المتكاملة للخدمات المهنية وكيف يمكنها تغيير مسيرتك المهنية للأفضل
          </p>
        </div>

        {/* Main Video Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl mb-16">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-r from-emerald-600 to-blue-600 rounded-t-lg">
              <div className="aspect-video flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-6 inline-block">
                    <Play className="h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">العرض التوضيحي الرئيسي</h3>
                  <p className="text-lg opacity-90">مدة العرض: 8 دقائق</p>
                  <Button className="mt-4 bg-white text-emerald-600 hover:bg-gray-100">
                    تشغيل الفيديو
                    <Play className="mr-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">نظرة شاملة على منصة دؤوب</h3>
              <p className="text-gray-600">
                يأخذك هذا الفيديو في جولة كاملة عبر جميع ميزات المنصة ويوضح كيف يمكنك الاستفادة منها لتطوير مسيرتك المهنية
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feature Demos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            عروض توضيحية للميزات
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {demoFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-r from-emerald-100 to-blue-100 p-3 rounded-lg text-emerald-600">
                      {feature.icon}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 ml-1" />
                      {feature.duration}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-4">
                    <Play className="h-12 w-12 text-gray-500" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                    مشاهدة العرض
                    <ArrowRight className="mr-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            قصص نجاح عملائنا
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Demo CTA */}
        <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">جرب المنصة بنفسك</h2>
            <p className="text-xl mb-8 opacity-90">
              احصل على تجربة مجانية لمدة 14 يوماً واكتشف كيف يمكن لمنصة دؤوب تغيير مسيرتك المهنية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Link to="/signup">
                  ابدأ التجربة المجانية
                  <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                <Link to="/contact">تواصل مع المبيعات</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Checklist */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            ما ستحصل عليه
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "بحث ذكي عن الوظائف من مختلف المصادر",
              "بناء سيرة ذاتية احترافية بالذكاء الاصطناعي",
              "جلسات استشارة مع خبراء الموارد البشرية",
              "مجتمعات مهنية متخصصة",
              "تحضير للمقابلات الوظيفية",
              "تقارير وتحليلات مفصلة",
              "دعم فني على مدار الساعة",
              "ضمان استرداد المال لمدة 30 يوم"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
