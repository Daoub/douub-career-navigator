
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Share2, Link2, Mail, MessageSquare, FileText, Globe, Eye, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { exportService, ExportOptions, ResumeData } from '@/services/exportService';

interface ShareOptions {
  method: 'link' | 'email' | 'whatsapp' | 'linkedin';
  privacy: 'public' | 'private' | 'password';
  expiration: string;
}

interface ResumeExporterProps {
  resumeData: ResumeData;
  onExport?: (options: ExportOptions) => void;
  onShare?: (options: ShareOptions) => void;
}

const ResumeExporter: React.FC<ResumeExporterProps> = ({ 
  resumeData, 
  onExport, 
  onShare 
}) => {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    quality: 'high',
    template: 'vision-professional',
    language: 'ar',
    watermark: false
  });

  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    method: 'link',
    privacy: 'private',
    expiration: '30'
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const validateResumeData = (): string | null => {
    if (!resumeData.personalInfo?.name) {
      return language === 'ar' ? 'يجب إدخال الاسم أولاً' : 'Name is required';
    }
    
    if (!resumeData.experience?.length && !resumeData.education?.length && !resumeData.skills?.length) {
      return language === 'ar' ? 'يجب إضافة محتوى للسيرة الذاتية (خبرة، تعليم، أو مهارات)' : 'Resume must have content (experience, education, or skills)';
    }
    
    return null;
  };

  const handleExport = async () => {
    // Validate resume data first
    const validationError = validateResumeData();
    if (validationError) {
      toast({
        title: language === 'ar' ? 'خطأ في البيانات' : 'Data Error',
        description: validationError,
        variant: 'destructive'
      });
      return;
    }

    setIsExporting(true);
    
    try {
      // Check if preview is visible for PDF export
      if (exportOptions.format === 'pdf') {
        const previewElement = document.querySelector('[data-resume-preview]');
        if (!previewElement) {
          toast({
            title: language === 'ar' ? 'المعاينة مطلوبة' : 'Preview Required',
            description: language === 'ar' 
              ? 'يرجى الانتقال إلى تبويب المعاينة أولاً لتصدير PDF'
              : 'Please go to the Preview tab first to export PDF',
            variant: 'destructive'
          });
          setIsExporting(false);
          return;
        }
      }

      await exportService.exportResume(resumeData, exportOptions);
      
      toast({
        title: language === 'ar' ? 'تم التصدير بنجاح' : 'Export Successful',
        description: language === 'ar' 
          ? `تم تصدير السيرة الذاتية بصيغة ${exportOptions.format.toUpperCase()}`
          : `Resume exported as ${exportOptions.format.toUpperCase()}`,
      });

      onExport?.(exportOptions);
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: language === 'ar' ? 'خطأ في التصدير' : 'Export Error',
        description: error instanceof Error ? error.message : (language === 'ar' ? 'حدث خطأ أثناء تصدير السيرة الذاتية' : 'An error occurred while exporting the resume'),
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      // Simulate share URL generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedUrl = `https://doaub.app/shared/resume/${Math.random().toString(36).substr(2, 9)}`;
      setShareUrl(generatedUrl);
      
      toast({
        title: language === 'ar' ? 'تم إنشاء رابط المشاركة' : 'Share Link Created',
        description: language === 'ar' ? 'تم إنشاء رابط مشاركة السيرة الذاتية' : 'Resume share link has been created',
      });

      onShare?.(shareOptions);
    } catch (error) {
      toast({
        title: language === 'ar' ? 'خطأ في المشاركة' : 'Share Error',
        description: language === 'ar' ? 'حدث خطأ أثناء إنشاء رابط المشاركة' : 'An error occurred while creating the share link',
        variant: 'destructive'
      });
    } finally {
      setIsSharing(false);
    }
  };

  const copyShareUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: language === 'ar' ? 'تم النسخ' : 'Copied',
        description: language === 'ar' ? 'تم نسخ الرابط إلى الحافظة' : 'Link copied to clipboard',
      });
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
      case 'docx': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'html': return <Globe className="h-4 w-4 text-green-500" />;
      case 'json': return <FileText className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getShareIcon = (method: string) => {
    switch (method) {
      case 'link': return <Link2 className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'linkedin': return <Share2 className="h-4 w-4 text-blue-600" />;
      default: return <Share2 className="h-4 w-4" />;
    }
  };

  const validationError = validateResumeData();

  return (
    <div className="space-y-6">
      {/* Data Validation Warning */}
      {validationError && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm font-medium">{validationError}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Section */}
      <Card className="card-vision">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            {language === 'ar' ? 'تصدير السيرة الذاتية' : 'Export Resume'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' 
              ? 'صدر سيرتك الذاتية بصيغات مختلفة وجودة عالية'
              : 'Export your resume in different formats and high quality'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Format Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'pdf', name: 'PDF', desc: language === 'ar' ? 'الأكثر شيوعاً' : 'Most popular' },
              { id: 'docx', name: 'Word', desc: language === 'ar' ? 'قابل للتعديل' : 'Editable' },
              { id: 'html', name: 'HTML', desc: language === 'ar' ? 'للويب' : 'For web' },
              { id: 'json', name: 'JSON', desc: language === 'ar' ? 'للبيانات' : 'For data' }
            ].map(format => (
              <Card
                key={format.id}
                className={`cursor-pointer transition-all p-3 ${
                  exportOptions.format === format.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:shadow-vision-md'
                }`}
                onClick={() => setExportOptions(prev => ({ ...prev, format: format.id as any }))}
              >
                <div className="text-center space-y-2">
                  {getFormatIcon(format.id)}
                  <div>
                    <p className="font-medium text-sm">{format.name}</p>
                    <p className="text-xs text-muted-foreground">{format.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Export Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{language === 'ar' ? 'جودة التصدير' : 'Export Quality'}</Label>
              <Select 
                value={exportOptions.quality} 
                onValueChange={(value) => setExportOptions(prev => ({ ...prev, quality: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">
                    {language === 'ar' ? 'قياسية' : 'Standard'}
                  </SelectItem>
                  <SelectItem value="high">
                    {language === 'ar' ? 'عالية' : 'High Quality'}
                  </SelectItem>
                  <SelectItem value="print">
                    {language === 'ar' ? 'جودة طباعة' : 'Print Quality'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{language === 'ar' ? 'اللغة' : 'Language'}</Label>
              <Select 
                value={exportOptions.language} 
                onValueChange={(value) => setExportOptions(prev => ({ ...prev, language: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">{language === 'ar' ? 'العربية' : 'Arabic'}</SelectItem>
                  <SelectItem value="en">{language === 'ar' ? 'الإنجليزية' : 'English'}</SelectItem>
                  <SelectItem value="both">{language === 'ar' ? 'ثنائية اللغة' : 'Bilingual'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* PDF Export Warning */}
          {exportOptions.format === 'pdf' && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
              <Eye className="h-4 w-4" />
              <span>
                {language === 'ar' 
                  ? 'للحصول على أفضل جودة PDF، تأكد من أن المعاينة مرئية قبل التصدير'
                  : 'For best PDF quality, ensure the preview is visible before exporting'
                }
              </span>
            </div>
          )}

          {/* Export Button */}
          <Button 
            onClick={handleExport}
            disabled={isExporting || !!validationError}
            className="w-full bg-gradient-primary btn-gradient-hover"
          >
            {isExporting ? (
              <>
                <Download className="h-4 w-4 mr-2 animate-pulse" />
                {language === 'ar' ? 'جاري التصدير...' : 'Exporting...'}
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'تصدير السيرة الذاتية' : 'Export Resume'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Share Section */}
      <Card className="card-vision">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-secondary" />
            {language === 'ar' ? 'مشاركة السيرة الذاتية' : 'Share Resume'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' 
              ? 'أنشئ رابط مشاركة آمن لسيرتك الذاتية'
              : 'Create a secure share link for your resume'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Share Methods */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'link', name: language === 'ar' ? 'رابط' : 'Link' },
              { id: 'email', name: language === 'ar' ? 'إيميل' : 'Email' },
              { id: 'whatsapp', name: 'WhatsApp' },
              { id: 'linkedin', name: 'LinkedIn' }
            ].map(method => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all p-3 ${
                  shareOptions.method === method.id 
                    ? 'ring-2 ring-secondary bg-secondary/5' 
                    : 'hover:shadow-vision-md'
                }`}
                onClick={() => setShareOptions(prev => ({ ...prev, method: method.id as any }))}
              >
                <div className="text-center space-y-2">
                  {getShareIcon(method.id)}
                  <p className="font-medium text-sm">{method.name}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{language === 'ar' ? 'الخصوصية' : 'Privacy'}</Label>
              <Select 
                value={shareOptions.privacy} 
                onValueChange={(value) => setShareOptions(prev => ({ ...prev, privacy: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    {language === 'ar' ? 'عام' : 'Public'}
                  </SelectItem>
                  <SelectItem value="private">
                    {language === 'ar' ? 'خاص' : 'Private'}
                  </SelectItem>
                  <SelectItem value="password">
                    {language === 'ar' ? 'محمي بكلمة مرور' : 'Password Protected'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{language === 'ar' ? 'انتهاء الصلاحية (أيام)' : 'Expiration (days)'}</Label>
              <Select 
                value={shareOptions.expiration} 
                onValueChange={(value) => setShareOptions(prev => ({ ...prev, expiration: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 {language === 'ar' ? 'أيام' : 'days'}</SelectItem>
                  <SelectItem value="30">30 {language === 'ar' ? 'يوم' : 'days'}</SelectItem>
                  <SelectItem value="90">90 {language === 'ar' ? 'يوم' : 'days'}</SelectItem>
                  <SelectItem value="365">{language === 'ar' ? 'سنة واحدة' : '1 year'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Share Button */}
          <Button 
            onClick={handleShare}
            disabled={isSharing || !!validationError}
            className="w-full bg-gradient-secondary text-secondary-foreground btn-gradient-hover"
          >
            {isSharing ? (
              <>
                <Share2 className="h-4 w-4 mr-2 animate-pulse" />
                {language === 'ar' ? 'جاري إنشاء الرابط...' : 'Creating Link...'}
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'إنشاء رابط المشاركة' : 'Create Share Link'}
              </>
            )}
          </Button>

          {/* Share URL Display */}
          {shareUrl && (
            <div className="space-y-2">
              <Label>{language === 'ar' ? 'رابط المشاركة' : 'Share Link'}</Label>
              <div className="flex gap-2">
                <Input 
                  value={shareUrl} 
                  readOnly 
                  className="flex-1"
                />
                <Button variant="outline" onClick={copyShareUrl}>
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' 
                  ? `سينتهي الرابط خلال ${shareOptions.expiration} ${shareOptions.expiration === '1' ? 'يوم' : 'أيام'}`
                  : `Link expires in ${shareOptions.expiration} day${shareOptions.expiration === '1' ? '' : 's'}`
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeExporter;
