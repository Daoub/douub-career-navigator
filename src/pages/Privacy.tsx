
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6" dir="rtl">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            سياسة الخصوصية
          </h1>
          <p className="text-xl text-gray-700">
            نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>جمع المعلومات</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                نقوم بجمع المعلومات التي تقدمها لنا عند التسجيل في منصتنا أو استخدام خدماتنا، بما في ذلك الاسم والبريد الإلكتروني ومعلومات السيرة الذاتية.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>استخدام المعلومات</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                نستخدم المعلومات المجمعة لتقديم خدماتنا وتحسينها، وإرسال التحديثات والإشعارات المهمة، وتخصيص تجربتك على المنصة.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>حماية البيانات</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                نتخذ تدابير أمنية متقدمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو الاستخدام أو الكشف أو التدمير غير المشروع.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>مشاركة المعلومات</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                لا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك الصريحة، باستثناء الحالات المطلوبة قانونياً أو لتقديم الخدمات المطلوبة.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
