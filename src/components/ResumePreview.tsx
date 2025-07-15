import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  Download, 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Printer,
  Smartphone,
  Tablet,
  Monitor,
  FileText,
  Globe,
  Languages
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ResumePreviewProps {
  resumeData: any;
  selectedTemplate?: string;
  onExport?: (format: string) => void;
  onShare?: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  selectedTemplate = 'vision-professional',
  onExport,
  onShare
}) => {
  const { t, language } = useTranslation();
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewLanguage, setPreviewLanguage] = useState<'ar' | 'en'>('ar');
  const [showGrid, setShowGrid] = useState(false);

  const templates = {
    'vision-professional': {
      name: 'Vision 2030 Professional',
      colors: {
        primary: '#1e40af',
        secondary: '#059669',
        accent: '#dc2626'
      }
    },
    'neom-executive': {
      name: 'NEOM Executive',
      colors: {
        primary: '#7c3aed',
        secondary: '#2563eb',
        accent: '#ea580c'
      }
    },
    'saudi-modern': {
      name: 'Saudi Modern',
      colors: {
        primary: '#059669',
        secondary: '#0891b2',
        accent: '#c2410c'
      }
    }
  };

  const currentTemplate = templates[selectedTemplate as keyof typeof templates] || templates['vision-professional'];

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));

  const getViewModeIcon = (mode: typeof viewMode) => {
    switch (mode) {
      case 'desktop': return <Monitor className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
    }
  };

  const getViewModeWidth = () => {
    switch (viewMode) {
      case 'desktop': return 'w-full max-w-4xl';
      case 'tablet': return 'w-full max-w-2xl';
      case 'mobile': return 'w-full max-w-md';
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Controls */}
      <Card className="card-vision">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'معاينة السيرة الذاتية' : 'Resume Preview'}
            </CardTitle>
            <Badge variant="outline">
              {currentTemplate.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[3rem] text-center">
                {zoom}%
              </span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* View Mode Controls */}
            <div className="flex border rounded-lg p-1">
              {(['desktop', 'tablet', 'mobile'] as const).map(mode => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className="px-3"
                >
                  {getViewModeIcon(mode)}
                </Button>
              ))}
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <Select value={previewLanguage} onValueChange={(value: 'ar' | 'en') => setPreviewLanguage(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" onClick={() => onShare?.()}>
                <Share2 className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'مشاركة' : 'Share'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => onExport?.('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'تحميل' : 'Download'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'طباعة' : 'Print'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Container */}
      <div className="flex justify-center">
        <div className={`${getViewModeWidth()} transition-all duration-300`}>
          <div 
            className="bg-white shadow-2xl rounded-lg overflow-hidden border-2 border-gray-200"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Resume Content */}
            <div 
              className="p-8 min-h-[1122px]"
              style={{
                background: 'white',
                color: '#1f2937',
                direction: previewLanguage === 'ar' ? 'rtl' : 'ltr'
              }}
            >
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <h1 
                      className="text-4xl font-bold mb-2"
                      style={{ color: currentTemplate.colors.primary }}
                    >
                      {resumeData.personalInfo?.name || (previewLanguage === 'ar' ? 'اسم المتقدم' : 'Applicant Name')}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {resumeData.personalInfo?.email && (
                        <span className="flex items-center gap-1">
                          <span>📧</span>
                          {resumeData.personalInfo.email}
                        </span>
                      )}
                      {resumeData.personalInfo?.phone && (
                        <span className="flex items-center gap-1">
                          <span>📱</span>
                          {resumeData.personalInfo.phone}
                        </span>
                      )}
                      {resumeData.personalInfo?.location && (
                        <span className="flex items-center gap-1">
                          <span>📍</span>
                          {resumeData.personalInfo.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-xs">
                      {previewLanguage === 'ar' ? 'صورة' : 'Photo'}
                    </span>
                  </div>
                </div>

                {/* Professional Summary */}
                {resumeData.personalInfo?.summary && (
                  <div className="mb-6">
                    <h2 
                      className="text-xl font-semibold mb-3 pb-2 border-b-2"
                      style={{ borderColor: currentTemplate.colors.primary }}
                    >
                      {previewLanguage === 'ar' ? 'الملخص المهني' : 'Professional Summary'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {resumeData.personalInfo.summary}
                    </p>
                  </div>
                )}
              </div>

              {/* Experience Section */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div className="mb-8">
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b-2"
                    style={{ borderColor: currentTemplate.colors.primary }}
                  >
                    {previewLanguage === 'ar' ? 'الخبرة المهنية' : 'Professional Experience'}
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp: any, index: number) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg" style={{ color: currentTemplate.colors.secondary }}>
                              {exp.title || (previewLanguage === 'ar' ? 'المسمى الوظيفي' : 'Job Title')}
                            </h3>
                            <p className="text-gray-600">
                              {exp.company || (previewLanguage === 'ar' ? 'اسم الشركة' : 'Company Name')}
                            </p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{exp.startDate} - {exp.current ? (previewLanguage === 'ar' ? 'حالياً' : 'Present') : exp.endDate}</p>
                            {exp.location && <p>{exp.location}</p>}
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 mb-2">{exp.description}</p>
                        )}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {exp.achievements.map((achievement: string, i: number) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div className="mb-8">
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b-2"
                    style={{ borderColor: currentTemplate.colors.primary }}
                  >
                    {previewLanguage === 'ar' ? 'التعليم' : 'Education'}
                  </h2>
                  <div className="space-y-4">
                    {resumeData.education.map((edu: any, index: number) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg" style={{ color: currentTemplate.colors.secondary }}>
                              {edu.degree || (previewLanguage === 'ar' ? 'الدرجة العلمية' : 'Degree')}
                            </h3>
                            <p className="text-gray-600">
                              {edu.institution || (previewLanguage === 'ar' ? 'اسم الجامعة' : 'Institution')}
                            </p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{edu.startDate} - {edu.endDate}</p>
                            {edu.gpa && <p>GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                        {edu.description && (
                          <p className="text-gray-700">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <div className="mb-8">
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b-2"
                    style={{ borderColor: currentTemplate.colors.primary }}
                  >
                    {previewLanguage === 'ar' ? 'المهارات' : 'Skills'}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {resumeData.skills.map((skill: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: currentTemplate.colors.accent + '20',
                            color: currentTemplate.colors.accent
                          }}
                        >
                          {skill.level === 'expert' ? (previewLanguage === 'ar' ? 'خبير' : 'Expert') :
                           skill.level === 'advanced' ? (previewLanguage === 'ar' ? 'متقدم' : 'Advanced') :
                           skill.level === 'intermediate' ? (previewLanguage === 'ar' ? 'متوسط' : 'Intermediate') :
                           (previewLanguage === 'ar' ? 'مبتدئ' : 'Beginner')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates Section */}
              {resumeData.certificates && resumeData.certificates.length > 0 && (
                <div className="mb-8">
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b-2"
                    style={{ borderColor: currentTemplate.colors.primary }}
                  >
                    {previewLanguage === 'ar' ? 'الشهادات' : 'Certificates'}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {resumeData.certificates.map((cert: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{cert.name}</h4>
                          <p className="text-sm text-gray-600">{cert.issuer}</p>
                        </div>
                        <span className="text-sm text-gray-500">{cert.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;