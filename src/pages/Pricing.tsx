
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Pricing = () => {
  const features = [
    "حصر وفرز جميع الوظائف المنشورة بمواقع التواصل الاجتماعي",
    "الأحداث المهنية",
    "إنشاء و تعديل و تحليل السيرة الذاتية",
    "تنزيل ٣ نماذج أعمال",
    "أسئلة المقابلات الشخصية لوظيفة واحدة"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            باقة الاشتراك
          </h1>
          <p className="text-xl text-gray-700">
            اختر الباقة المناسبة لاحتياجاتك المهنية
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="relative hover:shadow-xl transition-all duration-300 scale-105 border-2 border-emerald-500 bg-gradient-to-br from-white to-emerald-50">
            <div className="absolute -top-4 right-1/2 transform translate-x-1/2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
              الأكثر شعبية
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">أساسي</CardTitle>
              <div className="mb-4">
                <span className="text-4xl font-bold text-emerald-600">20</span>
                <span className="text-gray-600 mr-2">ريال / شهر</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 ml-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                <a href="/signup">اختر هذه الباقة</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
