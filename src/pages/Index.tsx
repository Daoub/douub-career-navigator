import React from 'react';
import { ArrowRight, Users, FileText, Calendar, MessageCircle, Briefcase, Globe, Star, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import SocialLinks from '@/components/SocialLinks';

const Index = () => {
  const coreFeatures = [{
    icon: <Globe className="h-8 w-8 text-emerald-600" />,
    title: "Find all jobs",
    titleAr: "البحث عن جميع الوظائف",
    description: "A service that provides an inventory and sorting of all jobs posted on all social media sites in the specified city and the specified specialization",
    descriptionAr: "خدمة تقدم حصر وفرز جميع الوظائف المنشورة في جميع مواقع التواصل الاجتماعي بالمدينة المحددة والتخصص المحدد"
  }, {
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    title: "Resume Builder",
    titleAr: "انشاء السيرة الذاتية",
    description: "Professional templates - Edit resume at any time - Export resume in Word - PDF - ATS compliant - Analyze resume",
    descriptionAr: "نماذج احترافية - ⁠تعديل السيرة باي وقت - ⁠تصدير السيرة الذاتية بصيغة Word - PDF - ⁠مطابقة لمعايير ATS - ⁠تحليل السيرة الذاتية "
  }, {
    icon: <Calendar className="h-8 w-8 text-purple-600" />,
    title: "Business models",
    titleAr: "نماذج الأعمال",
    description: "We provide business models that support you in your specialization in an open, downloadable Word, Excel, and PowerPoint format",
    descriptionAr: "نوفر نماذج الأعمال الي تساندك في تخصصك بصيغة مفتوحة word - Excel - PowerPoint وقابلة للتنزيل. "
  }, {
    icon: <MessageCircle className="h-8 w-8 text-orange-600" />,
    title: "Professional Events",
    titleAr: "الأحداث المهنية",
    description: "List all professional events in your specialty (courses, meetings, conferences, conferences, updates)",
    descriptionAr: "حصر جميع الأحداث المهنية في تخصصك مثل (الدورات - اللقاءات - المؤتمرات - المستجدات) "
  }, {
    icon: <Briefcase className="h-8 w-8 text-red-600" />,
    title: "Interview questions",
    titleAr: "أسئلة المقابلات الشخصية",
    description: "We provide you with interview questions for all job titles",
    descriptionAr: "نوفر لك أسئلة الجهات في المقابلات الشخصية لكل المسميات الوظيفية"
  }];

  const subscriptionTiers = [{
    name: "Basic",
    nameAr: "أساسي",
    price: "20",
    currency: "SAR",
    period: "month",
    periodAr: "شهر",
    features: [" Inventory and sort all posts posted on social media sites", "Create, edit and analyze resumes", "Download 3 business models", "Professional events", "Interview questions for one job"],
    featuresAr: ["حصر وفرز جميع الوظايف المنشورة بمواقع التواصل الاجتماعي", " الأحداث المهنية", "إنشاء و تعديل و تحليل السيرة الذاتية", "تنزيل ٣ نماذج أعمال", "أسئلة المقابلات الشخصية لوظيفة واحدة"],
    popular: false
  }];

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50" dir="rtl">
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
            
            {/* Free Trial Notice */}
            <div className="bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-emerald-600 ml-2" />
                <h3 className="text-2xl font-bold text-emerald-700">تجربة مجانية ليوم واحد</h3>
                <Star className="h-6 w-6 text-emerald-600 mr-2" />
              </div>
              <p className="text-lg text-emerald-800 font-medium">
                استكشف جميع ميزات المنصة مجاناً لمدة 24 ساعة كاملة
              </p>
              <p className="text-base text-emerald-700 mt-2">
                بدون التزام مالي • إلغاء في أي وقت • وصول كامل لجميع الخدمات
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-lg px-8 py-3">
                <a href="/signup">ابدأ تجربتك المجانية</a>
                <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent py-[3px]">
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
              باقة الاشتراك
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-px">
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
              جرب منصتنا مجاناً لمدة يوم كامل
            </h2>
            <p className="text-xl mb-4 opacity-90">
              اكتشف قوة أدواتنا المهنية واستفد من جميع الميزات بدون أي التزام مالي
            </p>
            <p className="text-lg mb-8 opacity-80">
              ⭐ وصول كامل لجميع الخدمات • 🚀 بدء فوري • ❌ بدون بطاقة ائتمان
            </p>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-3">
              <a href="/signup">ابدأ تجربتك المجانية الآن</a>
              <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent py-[2px]">
              تواصل معنا
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="pt-8">
                <Phone className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">الهاتف</h3>
                <p className="text-base text-zinc-600 font-normal">537805735 966+</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="pt-8">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-600">info@dooub.sa</p>
              </CardContent>
            </Card>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">تابعنا على وسائل التواصل الاجتماعي</h3>
            <SocialLinks className="justify-center" />
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
            
            {/* Social Media Links in Footer */}
            <div className="mb-6">
              <SocialLinks variant="footer" className="justify-center" />
            </div>
            
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
