
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Users, Clock, Award, Sparkles, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import DemoVideo from '@/components/DemoVideo';
import AudioSettings from '@/components/AudioSettings';

const Demo = () => {
  const demoFeatures = [
    {
      title: "البحث الذكي عن الوظائف",
      description: "شاهد كيف يمكن للمنصة العثور على الوظائف المناسبة لك من مختلف المصادر",
      duration: "2:30",
      type: 'job-search' as const
    },
    {
      title: "بناء السيرة الذاتية المهنية",
      description: "تعلم كيفية إنشاء سيرة ذاتية احترافية باستخدام أدواتنا الذكية",
      duration: "3:45",
      type: 'resume-builder' as const
    },
    {
      title: "جلسات الاستشارة المباشرة",
      description: "اكتشف كيف تتم جلسات الاستشارة مع خبراء الموارد البشرية",
      duration: "4:20",
      type: 'consultation' as const
    },
    {
      title: "المجتمعات المهنية",
      description: "استكشف كيفية التواصل والتفاعل مع المهنيين في مجالك",
      duration: "2:15",
      type: 'community' as const
    }
  ];

  const testimonials = [
    {
      name: "سارة أحمد",
      role: "مطورة برمجيات",
      comment: "منصة دؤوب ساعدتني في العثور على وظيفة أحلامي في أقل من شهر",
      rating: 5,
      company: "شركة التقنية المتقدمة"
    },
    {
      name: "محمد علي",
      role: "مدير تسويق",
      comment: "الاستشارات المهنية كانت مفيدة جداً في تطوير مسيرتي المهنية",
      rating: 5,
      company: "مجموعة الإبداع التجاري"
    },
    {
      name: "فاطمة خالد",
      role: "محاسبة",
      comment: "أدوات بناء السيرة الذاتية احترافية جداً وسهلة الاستخدام",
      rating: 5,
      company: "مكتب الاستشارات المالية"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <nav className="flex items-center space-x-6 rtl:space-x-reverse">
              <AudioSettings />
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
          <div className="flex justify-center mb-6">
            <Logo size="xl" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            اكتشف قوة منصة دؤوب
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            شاهد كيف تعمل منصتنا المتكاملة للخدمات المهنية وكيف يمكنها تغيير مسيرتك المهنية للأفضل
          </p>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-emerald-600 mb-8">
            <Volume2 className="h-5 w-5" />
            <span className="text-sm font-medium">تعليق صوتي ذكي مُولد بالذكاء الاصطناعي</span>
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        {/* AI Audio Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-6 mb-12">
          <div className="flex items-center justify-center gap-4 text-center">
            <Volume2 className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">تجربة صوتية ذكية</h3>
              <p className="text-gray-600 mb-4">
                جميع العروض التوضيحية تتضمن تعليقاً صوتياً مُولداً بالذكاء الاصطناعي باللغة العربية
              </p>
              <div className="flex justify-center">
                <AudioSettings />
              </div>
            </div>
          </div>
        </div>

        {/* Main Video Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl mb-16">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-t-lg">
              <div className="aspect-video flex items-center justify-center text-white">
                <div className="text-center relative z-10">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 mb-6 inline-block">
                    <Play className="h-20 w-20" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">العرض التوضيحي الشامل</h3>
                  <p className="text-xl opacity-90 mb-6">جولة كاملة في منصة دؤوب</p>
                  <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-6">
                    <div className="bg-white/20 px-4 py-2 rounded-full text-sm">8 دقائق</div>
                    <div className="bg-white/20 px-4 py-2 rounded-full text-sm">دقة عالية</div>
                    <div className="bg-white/20 px-4 py-2 rounded-full text-sm">محتوى تفاعلي</div>
                  </div>
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                    تشغيل العرض الشامل
                    <Play className="mr-2 h-5 w-5" />
                  </Button>
                </div>
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
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
            عروض توضيحية تفاعلية للميزات
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {demoFeatures.map((feature, index) => (
              <DemoVideo
                key={index}
                title={feature.title}
                description={feature.description}
                duration={feature.duration}
                demoType={feature.type}
              />
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
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-lg">"{testimonial.comment}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-emerald-600 font-medium">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Demo CTA */}
        <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          <CardContent className="p-12 text-center relative z-10">
            <div className="flex justify-center mb-6">
              <Logo size="lg" variant="icon" />
            </div>
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
