
import React, { useState, useEffect } from 'react';
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
  Printer,
  Smartphone,
  Tablet,
  Monitor,
  Languages,
  RefreshCw
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { exportService, ResumeData } from '@/services/exportService';
import { pdfTemplateService } from '@/services/pdfTemplateService';
import { arabicFontService } from '@/services/arabicFontService';

interface ResumePreviewProps {
  resumeData: ResumeData;
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
  const { toast } = useToast();
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewLanguage, setPreviewLanguage] = useState<'ar' | 'en'>('ar');
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string>('');

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

  // Generate preview HTML whenever data or settings change
  useEffect(() => {
    generatePreviewHtml();
  }, [resumeData, selectedTemplate, previewLanguage]);

  const generatePreviewHtml = async () => {
    try {
      setIsRefreshing(true);
      
      // Load Arabic fonts if needed
      if (previewLanguage === 'ar') {
        await arabicFontService.ensureArabicFontsLoaded();
      }
      
      const html = pdfTemplateService.generateProfessionalTemplate(
        resumeData,
        selectedTemplate,
        previewLanguage
      );
      
      setPreviewHtml(html);
    } catch (error) {
      console.error('Error generating preview:', error);
      toast({
        title: language === 'ar' ? 'خطأ في المعاينة' : 'Preview Error',
        description: language === 'ar' ? 'حدث خطأ أثناء تحديث المعاينة' : 'An error occurred while updating the preview',
        variant: 'destructive'
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));

  const handleQuickExport = async (format: 'pdf' | 'docx' | 'html') => {
    setIsExporting(true);
    try {
      await exportService.exportResume(resumeData, {
        format,
        quality: 'high',
        template: selectedTemplate,
        language: previewLanguage,
        watermark: false
      });
      
      toast({
        title: language === 'ar' ? 'تم التصدير بنجاح' : 'Export Successful',
        description: language === 'ar' 
          ? `تم تصدير السيرة الذاتية بصيغة ${format.toUpperCase()}`
          : `Resume exported as ${format.toUpperCase()}`,
      });
      
      onExport?.(format);
    } catch (error) {
      toast({
        title: language === 'ar' ? 'خطأ في التصدير' : 'Export Error',
        description: language === 'ar' ? 'حدث خطأ أثناء تصدير السيرة الذاتية' : 'An error occurred while exporting the resume',
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };

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
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {currentTemplate.name}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={generatePreviewHtml}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickExport('pdf')}
                disabled={isExporting}
              >
                <Download className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'طباعة' : 'Print'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Preview Container */}
      <div className="flex justify-center">
        <div className={`${getViewModeWidth()} transition-all duration-300`}>
          <div 
            data-resume-preview="true"
            className="bg-white shadow-2xl rounded-lg overflow-hidden border-2 border-gray-200 print:shadow-none print:border-none"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Professional Resume Content */}
            <div 
              className="resume-content print:p-0"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
              style={{
                minHeight: '297mm',
                width: '210mm',
                maxWidth: '100%'
              }}
            />
            
            {/* Loading overlay */}
            {isRefreshing && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>{language === 'ar' ? 'جاري التحديث...' : 'Updating...'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
