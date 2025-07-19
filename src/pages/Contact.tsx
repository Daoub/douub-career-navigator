
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import SocialLinks from '@/components/SocialLinks';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            تواصل معنا
          </h1>
          <p className="text-xl text-gray-700">
            نحن هنا لمساعدتك في رحلتك المهنية
          </p>
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

          <Card className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="pt-8">
              <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">العنوان</h3>
              <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Section */}
        <div className="text-center max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">تابعنا على وسائل التواصل الاجتماعي</h3>
              <p className="text-gray-600 mb-6">
                ابق على اطلاع دائم بآخر الأخبار والوظائف والنصائح المهنية
              </p>
              <SocialLinks className="justify-center" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
