import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  Users, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Bookmark,
  Share2,
  ExternalLink
} from 'lucide-react';

interface JobModalProps {
  job: any;
  isOpen: boolean;
  onClose: () => void;
  onApply: (jobId: number) => void;
  onBookmark: (jobId: number) => void;
  isBookmarked: boolean;
}

const JobModal = ({ job, isOpen, onClose, onApply, onBookmark, isBookmarked }: JobModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="text-right">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                  {job.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-600">
                  {job.company}
                </DialogDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBookmark(job.id)}
                className={isBookmarked ? "text-yellow-600 border-yellow-600" : ""}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{job.posted}</span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">وصف الوظيفة</h3>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">المتطلبات</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">المزايا</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">المهارات المطلوبة</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات الشركة</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">حجم الشركة</span>
                  <p className="font-medium">{job.companySize}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">الصناعة</span>
                  <p className="font-medium">{job.industry}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">سنوات الخبرة</span>
                  <p className="font-medium">{job.experience}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">آخر موعد للتقديم</span>
                  <p className="font-medium text-red-600">{job.applicationDeadline}</p>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                onClick={() => onApply(job.id)}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                تقدم للوظيفة
              </Button>
              <Button variant="outline" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                زيارة موقع الشركة
              </Button>
            </div>

            {/* Similar Jobs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">وظائف مشابهة</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <p className="text-sm font-medium">مطور React</p>
                  <p className="text-xs text-gray-500">شركة التقنية الحديثة</p>
                </div>
                <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <p className="text-sm font-medium">مطور Mobile</p>
                  <p className="text-xs text-gray-500">مؤسسة البرمجيات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;