import React from 'react';
import { ArrowRight, Users, FileText, Calendar, MessageCircle, Briefcase, Globe, Star, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
const Index = () => {
  const coreFeatures = [{
    icon: <Globe className="h-8 w-8 text-emerald-600" />,
    title: "Job Aggregation & Filtering",
    titleAr: "تجميع وتصفية الوظائف",
    description: "Collect and precisely sort jobs from various social media platforms",
    descriptionAr: "جمع وترتيب الوظائف بدقة من منصات التواصل الاجتماعي المختلفة"
  }, {
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    title: "Professional Resume Builder",
    titleAr: "منشئ السيرة الذاتية المهنية",
    description: "Design professional resumes with AI analysis and PDF export",
    descriptionAr: "تصميم سيرة ذاتية مهنية مع تحليل ذكي وتصدير PDF"
  }, {
    icon: <Calendar className="h-8 w-8 text-purple-600" />,
    title: "Weekly Expert Sessions",
    titleAr: "جلسات أسبوعية مع الخبراء",
    description: "Weekly meetings and workshops with specialized consultants",
    descriptionAr: "اجتماعات وورش عمل أسبوعية مع استشاريين متخصصين"
  }, {
    icon: <MessageCircle className="h-8 w-8 text-orange-600" />,
    title: "Interview Preparation",
    titleAr: "تحضير المقابلات",
    description: "Remote mock interviews with field experts",
    descriptionAr: "مقابلات تجريبية عن بُعد مع خبراء في المجال"
  }, {
    icon: <Briefcase className="h-8 w-8 text-red-600" />,
    title: "Business Consultation",
    titleAr: "الاستشارات التجارية",
    description: "Expert business consultations and guidance",
    descriptionAr: "استشارات وإرشادات تجارية من الخبراء"
  }, {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    title: "Professional Communities",
    titleAr: "المجتمعات المهنية",
    description: "Networking and peer interaction platforms",
    descriptionAr: "منصات التواصل والتفاعل مع الأقران"
  }];
  const subscriptionTiers = [{
    name: "Basic",
    nameAr: "أساسي",
    price: "30",
    currency: "SAR",
    period: "month",
    periodAr: "شهر",
    features: ["Job search and filtering", "Basic resume builder", "Community access", "Email support"],
    featuresAr: ["البحث وتصفية الوظائف", "منشئ السيرة الذاتية الأساسي", "الوصول للمجتمعات", "الدعم عبر البريد الإلكتروني"],
    popular: false
  }, {
    name: "Professional",
    nameAr: "مهني",
    price: "50",
    currency: "SAR",
    period: "month",
    periodAr: "شهر",
    features: ["All Basic features", "AI resume analysis", "Weekly expert sessions", "Mock interviews", "Priority support"],
    featuresAr: ["جميع الميزات الأساسية", "تحليل السيرة الذاتية بالذكاء الاصطناعي", "جلسات أسبوعية مع الخبراء", "مقابلات تجريبية", "دعم أولوية"],
    popular: true
  }, {
    name: "Enterprise",
    nameAr: "مؤسسي",
    price: "125",
    currency: "SAR",
    period: "month",
    periodAr: "شهر",
    features: ["All Professional features", "Business consultation", "Resume distribution service", "Custom business models", "24/7 premium support"],
    featuresAr: ["جميع الميزات المهنية", "الاستشارات التجارية", "خدمة توزيع السيرة الذاتية", "نماذج أعمال مخصصة", "دعم مميز على مدار الساعة"],
    popular: false
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">الميزات</a>
              <a href="#pricing" className="text-gray-700 hover:text-emerald-600 transition-colors">الأسعار</a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors">تواصل معنا</a>
              <a href="/demo" className="text-gray-700 hover:text-emerald-600 transition-colors">العرض التوضيحي</a>
              <a href="/login" className="text-gray-700 hover:text-emerald-600 transition-colors">تسجيل الدخول</a>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                <a href="/signup">ابدأ الآن</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <Logo size="xl" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              ثورة في سوق العمل السعودي
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              منصة متكاملة للخدمات المهنية تستهدف الخريجين الجدد والباحثين عن عمل وطالبي التطوير المهني في المملكة العربية السعودية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-lg px-8 py-3">
                <a href="/signup">ابدأ رحلتك المهنية</a>
                <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                <a href="/demo">شاهد العرض التوضيحي</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
              <div className="text-gray-600">فرصة وظيفية</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">مستخدم نشط</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">استشاري متخصص</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">معدل الرضا</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              الميزات الأساسية
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              مجموعة شاملة من الأدوات والخدمات المصممة لتطوير مسيرتك المهنية
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    {feature.icon}
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                    {feature.titleAr}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.descriptionAr}
                  </CardDescription>
                </CardHeader>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              باقات الاشتراك
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              اختر الباقة التي تناسب احتياجاتك المهنية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionTiers.map((tier, index) => <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${tier.popular ? 'scale-105 border-2 border-emerald-500 bg-gradient-to-br from-white to-emerald-50' : 'bg-white/80 backdrop-blur-sm'}`}>
                {tier.popular && <div className="absolute -top-4 right-1/2 transform translate-x-1/2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    الأكثر شعبية
                  </div>}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2">{tier.nameAr}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-emerald-600">{tier.price}</span>
                    <span className="text-gray-600 mr-2">{tier.currency} / {tier.periodAr}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.featuresAr.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-emerald-600 ml-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>)}
                  </ul>
                  <Button className={`w-full ${tier.popular ? 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700' : 'bg-gray-800 hover:bg-gray-900'}`}>
                    <a href="/signup">اختر هذه الباقة</a>
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex justify-center mb-6">
              <Logo size="lg" variant="icon" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ابدأ رحلتك المهنية اليوم
            </h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلى آلاف المهنيين الذين طوروا مسيراتهم المهنية معنا
            </p>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-3">
              <a href="/signup">سجل مجاناً الآن</a>
              <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              تواصل معنا
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              نحن هنا لمساعدتك في تطوير مسيرتك المهنية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="pt-8">
                <Phone className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">الهاتف</h3>
                <p className="text-gray-600">+966 537805735</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="pt-8">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-600">info@dooub.sa</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-8">
                <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">العنوان</h3>
                <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Logo size="md" variant="full" className="text-white" />
            </div>
            <p className="text-gray-400 mb-6">
              منصة متكاملة للخدمات المهنية في المملكة العربية السعودية
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-400 text-base text-center">©    دؤوب 2025 
جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;