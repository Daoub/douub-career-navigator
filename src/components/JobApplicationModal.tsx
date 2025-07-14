import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  User,
  Mail,
  Phone,
  FileCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JobApplicationModalProps {
  job: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (applicationData: any) => void;
}

const JobApplicationModal = ({ job, isOpen, onClose, onSubmit }: JobApplicationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    experience: '',
    portfolio: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit({ ...formData, jobId: job.id });
      toast({
        title: "تم إرسال طلب التوظيف بنجاح",
        description: "سيتم التواصل معك قريباً من قبل فريق التوظيف",
      });
      setIsSubmitting(false);
      onClose();
    }, 2000);
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            التقدم للوظيفة
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {job.title} - {job.company}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <User className="h-5 w-5 text-emerald-600" />
              المعلومات الشخصية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">الاسم الكامل *</Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="text-right"
                />
              </div>
              
              <div>
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                  className="text-right"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+966 5X XXX XXXX"
                className="text-right"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-emerald-600" />
              السيرة الذاتية
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="resume" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">اضغط لرفع السيرة الذاتية</p>
                <p className="text-sm text-gray-500">PDF, DOC, DOCX (حتى 5MB)</p>
              </label>
              {formData.resume && (
                <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{formData.resume.name}</span>
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Mail className="h-5 w-5 text-emerald-600" />
              خطاب التقديم
            </h3>
            
            <div>
              <Label htmlFor="coverLetter">خطاب التقديم *</Label>
              <Textarea
                id="coverLetter"
                required
                value={formData.coverLetter}
                onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                placeholder="اكتب لماذا تعتبر مناسباً لهذه الوظيفة..."
                rows={5}
                className="text-right"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="experience">الخبرة ذات الصلة</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="اذكر خبراتك السابقة المتعلقة بهذه الوظيفة..."
                rows={3}
                className="text-right"
              />
            </div>

            <div>
              <Label htmlFor="portfolio">رابط المعرض (اختياري)</Label>
              <Input
                id="portfolio"
                value={formData.portfolio}
                onChange={(e) => handleInputChange('portfolio', e.target.value)}
                placeholder="https://portfolio.example.com"
                className="text-right"
              />
            </div>
          </div>

          {/* Job Requirements Match */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              المهارات المطلوبة للوظيفة
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              تأكد من ذكر خبرتك في هذه المهارات في خطاب التقديم
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب التوظيف'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationModal;