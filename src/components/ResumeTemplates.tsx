import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Share2, Heart, Star, Briefcase, GraduationCap, User } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';

interface ResumeTemplate {
  id: string;
  name: string;
  nameEn: string;
  category: 'modern' | 'classic' | 'creative' | 'executive';
  preview: string;
  features: string[];
  rating: number;
  downloads: number;
  premium: boolean;
}

interface ResumeTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
  selectedTemplate?: string;
}

const ResumeTemplates: React.FC<ResumeTemplatesProps> = ({ 
  onSelectTemplate, 
  selectedTemplate 
}) => {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Professional Saudi Vision 2030 aligned templates
  const templates: ResumeTemplate[] = [
    {
      id: 'vision-professional',
      name: 'رؤية 2030 المهنية',
      nameEn: 'Vision 2030 Professional',
      category: 'modern',
      preview: '/api/template-preview/vision-professional.jpg',
      features: ['متوافق مع رؤية 2030', 'تصميم حديث', 'مُحسن للطباعة', 'مناسب للشركات الكبيرة'],
      rating: 4.9,
      downloads: 12500,
      premium: false
    },
    {
      id: 'neom-executive',
      name: 'نيوم التنفيذي',
      nameEn: 'NEOM Executive',
      category: 'executive',
      preview: '/api/template-preview/neom-executive.jpg',
      features: ['للمناصب التنفيذية', 'تصميم أنيق', 'مساحة للإنجازات', 'متوافق مع ATS'],
      rating: 4.8,
      downloads: 8900,
      premium: true
    },
    {
      id: 'saudi-modern',
      name: 'السعودية الحديثة',
      nameEn: 'Saudi Modern',
      category: 'modern',
      preview: '/api/template-preview/saudi-modern.jpg',
      features: ['عصري ومميز', 'ألوان احترافية', 'سهل التخصيص', 'متعدد الصفحات'],
      rating: 4.7,
      downloads: 15200,
      premium: false
    },
    {
      id: 'tech-innovator',
      name: 'مبتكر التقنية',
      nameEn: 'Tech Innovator',
      category: 'creative',
      preview: '/api/template-preview/tech-innovator.jpg',
      features: ['للوظائف التقنية', 'تصميم إبداعي', 'مساحة للمشاريع', 'روابط GitHub'],
      rating: 4.6,
      downloads: 9800,
      premium: true
    },
    {
      id: 'classic-saudi',
      name: 'الكلاسيكي السعودي',
      nameEn: 'Classic Saudi',
      category: 'classic',
      preview: '/api/template-preview/classic-saudi.jpg',
      features: ['تصميم تقليدي', 'مناسب لجميع المجالات', 'بسيط وواضح', 'سهل القراءة'],
      rating: 4.5,
      downloads: 20100,
      premium: false
    },
    {
      id: 'healthcare-pro',
      name: 'المهني الطبي',
      nameEn: 'Healthcare Professional',
      category: 'modern',
      preview: '/api/template-preview/healthcare-pro.jpg',
      features: ['للمجال الطبي', 'مساحة للشهادات', 'تصميم موثوق', 'متوافق مع معايير الصحة'],
      rating: 4.8,
      downloads: 7400,
      premium: true
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'modern': return <Star className="h-4 w-4" />;
      case 'classic': return <User className="h-4 w-4" />;
      case 'creative': return <Briefcase className="h-4 w-4" />;
      case 'executive': return <GraduationCap className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    const categories = {
      modern: language === 'ar' ? 'حديث' : 'Modern',
      classic: language === 'ar' ? 'كلاسيكي' : 'Classic',
      creative: language === 'ar' ? 'إبداعي' : 'Creative',
      executive: language === 'ar' ? 'تنفيذي' : 'Executive'
    };
    return categories[category as keyof typeof categories] || category;
  };

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const previewTemplate = (template: ResumeTemplate) => {
    toast({
      title: language === 'ar' ? 'معاينة القالب' : 'Template Preview',
      description: language === 'ar' 
        ? `سيتم فتح معاينة قالب ${template.name}` 
        : `Opening preview for ${template.nameEn}`,
    });
    // Open preview modal or new window
  };

  const shareTemplate = (template: ResumeTemplate) => {
    navigator.clipboard.writeText(`https://doaub.app/templates/${template.id}`);
    toast({
      title: language === 'ar' ? 'تم النسخ' : 'Copied',
      description: language === 'ar' ? 'تم نسخ رابط القالب' : 'Template link copied to clipboard',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-hero gradient-text-hero mb-4">
          {t('resume.templates')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'اختر من مجموعة متنوعة من القوالب المصممة خصيصاً للسوق السعودي ومتوافقة مع رؤية 2030'
            : 'Choose from a variety of templates designed specifically for the Saudi market and aligned with Vision 2030'
          }
        </p>
      </div>

      {/* Template Categories Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {['modern', 'classic', 'creative', 'executive'].map(category => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            {getCategoryIcon(category)}
            {getCategoryName(category)}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <Card 
            key={template.id} 
            className={`card-vision group cursor-pointer transition-all duration-300 ${
              selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base mb-1">
                    {language === 'ar' ? template.name : template.nameEn}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryIcon(template.category)}
                      <span className="ml-1">{getCategoryName(template.category)}</span>
                    </Badge>
                    {template.premium && (
                      <Badge className="text-xs bg-gradient-secondary">
                        {language === 'ar' ? 'مميز' : 'Premium'}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(template.id);
                  }}
                  className="p-1 h-auto"
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.includes(template.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-400'
                    }`} 
                  />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center group-hover:shadow-vision-md transition-shadow">
                <div className="text-center text-muted-foreground">
                  <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{language === 'ar' ? 'معاينة القالب' : 'Template Preview'}</p>
                </div>
              </div>

              {/* Template Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{template.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>{template.downloads.toLocaleString()}</span>
                </div>
              </div>

              {/* Template Features */}
              <div className="space-y-1">
                {template.features.slice(0, 3).map((feature, index) => (
                  <p key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    {feature}
                  </p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    previewTemplate(template);
                  }}
                  className="flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  <span className="text-xs">{language === 'ar' ? 'معاينة' : 'Preview'}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    shareTemplate(template);
                  }}
                  className="flex items-center gap-1"
                >
                  <Share2 className="h-3 w-3" />
                  <span className="text-xs">{language === 'ar' ? 'مشاركة' : 'Share'}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Template Actions */}
      {selectedTemplate && (
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">
                  {language === 'ar' ? 'القالب المحدد' : 'Selected Template'}
                </h4>
                <p className="text-sm opacity-90">
                  {templates.find(t => t.id === selectedTemplate)?.[language === 'ar' ? 'name' : 'nameEn']}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  {language === 'ar' ? 'تخصيص' : 'Customize'}
                </Button>
                <Button variant="secondary" size="sm">
                  {language === 'ar' ? 'استخدام' : 'Use Template'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeTemplates;