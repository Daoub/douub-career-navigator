
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

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

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
      </div>
    </div>
  );
};

export default Contact;
