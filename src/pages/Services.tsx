
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, FileText, Calendar, MessageCircle, Briefcase } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Globe className="h-8 w-8 text-emerald-600" />,
      title: "البحث عن جميع الوظائف",
      description: "خدمة تقدم حصر وفرز جميع الوظائف المنشورة في جميع مواقع التواصل الاجتماعي بالمدينة المحددة والتخصص المحدد"
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "إنشاء السيرة الذاتية",
      description: "نماذج احترافية - تعديل السيرة بأي وقت - تصدير السيرة الذاتية بصيغة Word - PDF - مطابقة لمعايير ATS - تحليل السيرة الذاتية"
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      title: "نماذج الأعمال",
      description: "نوفر نماذج الأعمال التي تساندك في تخصصك بصيغة مفتوحة Word - Excel - PowerPoint وقابلة للتنزيل"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-orange-600" />,
      title: "الأحداث المهنية",
      description: "حصر جميع الأحداث المهنية في تخصصك مثل (الدورات - اللقاءات - المؤتمرات - المستجدات)"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-red-600" />,
      title: "أسئلة المقابلات الشخصية",
      description: "نوفر لك أسئلة الجهات في المقابلات الشخصية لكل المسميات الوظيفية"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            خدماتنا
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            مجموعة شاملة من الأدوات والخدمات المصممة لتطوير مسيرتك المهنية
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
