
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6" dir="rtl">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            من نحن
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            نحن منصة متخصصة في تطوير المسيرة المهنية للخريجين الجدد والباحثين عن عمل في المملكة العربية السعودية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle>رؤيتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                أن نكون المنصة الرائدة في تطوير المسيرة المهنية في المملكة العربية السعودية
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>مهمتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                تقديم أدوات وخدمات متكاملة لمساعدة الباحثين عن عمل في تحقيق أهدافهم المهنية
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>قيمنا</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                الجودة، الاحترافية، والابتكار في تقديم خدمات تطوير المسيرة المهنية
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
