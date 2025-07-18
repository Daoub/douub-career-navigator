
import { ResumeData } from './exportService';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  completeness: number; // 0-100 percentage
}

export class ResumeValidationService {
  validateResumeData(resumeData: ResumeData, language: 'ar' | 'en' = 'ar'): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let completeness = 0;
    const maxPoints = 100;

    // Required fields validation
    if (!resumeData.personalInfo?.name?.trim()) {
      errors.push(language === 'ar' ? 'الاسم مطلوب' : 'Name is required');
    } else {
      completeness += 20;
    }

    // Contact information validation
    const hasContact = !!(resumeData.personalInfo?.email || resumeData.personalInfo?.phone);
    if (!hasContact) {
      errors.push(language === 'ar' ? 'يجب إضافة وسيلة تواصل واحدة على الأقل (إيميل أو هاتف)' : 'At least one contact method (email or phone) is required');
    } else {
      completeness += 15;
    }

    // Email validation
    if (resumeData.personalInfo?.email && !this.isValidEmail(resumeData.personalInfo.email)) {
      errors.push(language === 'ar' ? 'صيغة الإيميل غير صحيحة' : 'Invalid email format');
    }

    // Phone validation
    if (resumeData.personalInfo?.phone && !this.isValidPhone(resumeData.personalInfo.phone)) {
      warnings.push(language === 'ar' ? 'تحقق من صيغة رقم الهاتف' : 'Please verify phone number format');
    }

    // Content sections validation
    const hasExperience = !!(resumeData.experience?.length);
    const hasEducation = !!(resumeData.education?.length);
    const hasSkills = !!(resumeData.skills?.length);

    if (!hasExperience && !hasEducation && !hasSkills) {
      errors.push(language === 'ar' ? 'يجب إضافة محتوى للسيرة الذاتية (خبرة، تعليم، أو مهارات)' : 'Resume must have content (experience, education, or skills)');
    }

    // Professional summary
    if (resumeData.personalInfo?.summary?.trim()) {
      completeness += 15;
      if (resumeData.personalInfo.summary.length < 50) {
        warnings.push(language === 'ar' ? 'الملخص المهني قصير، يُنصح بإضافة المزيد من التفاصيل' : 'Professional summary is short, consider adding more details');
      }
    } else {
      warnings.push(language === 'ar' ? 'إضافة ملخص مهني يحسن من جودة السيرة الذاتية' : 'Adding a professional summary improves resume quality');
    }

    // Experience validation
    if (hasExperience) {
      completeness += 25;
      resumeData.experience?.forEach((exp, index) => {
        if (!exp.title?.trim()) {
          errors.push(language === 'ar' ? `المسمى الوظيفي مطلوب للخبرة رقم ${index + 1}` : `Job title is required for experience ${index + 1}`);
        }
        if (!exp.company?.trim()) {
          errors.push(language === 'ar' ? `اسم الشركة مطلوب للخبرة رقم ${index + 1}` : `Company name is required for experience ${index + 1}`);
        }
        if (!exp.startDate?.trim()) {
          errors.push(language === 'ar' ? `تاريخ البداية مطلوب للخبرة رقم ${index + 1}` : `Start date is required for experience ${index + 1}`);
        }
        if (!exp.description?.trim() && (!exp.achievements || exp.achievements.length === 0)) {
          warnings.push(language === 'ar' ? `إضافة وصف أو إنجازات للخبرة رقم ${index + 1}` : `Add description or achievements for experience ${index + 1}`);
        }
      });
    }

    // Education validation
    if (hasEducation) {
      completeness += 15;
      resumeData.education?.forEach((edu, index) => {
        if (!edu.degree?.trim()) {
          errors.push(language === 'ar' ? `الدرجة العلمية مطلوبة للتعليم رقم ${index + 1}` : `Degree is required for education ${index + 1}`);
        }
        if (!edu.institution?.trim()) {
          errors.push(language === 'ar' ? `اسم المؤسسة التعليمية مطلوب للتعليم رقم ${index + 1}` : `Institution name is required for education ${index + 1}`);
        }
      });
    }

    // Skills validation
    if (hasSkills) {
      completeness += 10;
      if (resumeData.skills && resumeData.skills.length < 3) {
        warnings.push(language === 'ar' ? 'إضافة المزيد من المهارات يحسن من السيرة الذاتية' : 'Adding more skills improves your resume');
      }
    }

    // Content quality checks
    this.checkContentQuality(resumeData, warnings, language);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      completeness: Math.min(completeness, maxPoints)
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    // Basic phone validation - accepts various formats
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
  }

  private checkContentQuality(resumeData: ResumeData, warnings: string[], language: 'ar' | 'en'): void {
    // Check for very short descriptions
    resumeData.experience?.forEach((exp, index) => {
      if (exp.description && exp.description.length < 30) {
        warnings.push(language === 'ar' 
          ? `وصف الخبرة رقم ${index + 1} قصير جداً`
          : `Experience ${index + 1} description is very short`
        );
      }
    });

    // Check for missing contact location
    if (!resumeData.personalInfo?.location) {
      warnings.push(language === 'ar' ? 'إضافة الموقع الجغرافي مفيد للتوظيف' : 'Adding location is helpful for recruitment');
    }

    // Check for certificates
    if (!resumeData.certificates?.length) {
      warnings.push(language === 'ar' ? 'إضافة الشهادات والدورات التدريبية يعزز السيرة الذاتية' : 'Adding certificates and courses enhances your resume');
    }
  }

  generateValidationSummary(validation: ValidationResult, language: 'ar' | 'en' = 'ar'): string {
    if (validation.isValid) {
      return language === 'ar' 
        ? `السيرة الذاتية جاهزة للتصدير (مكتملة بنسبة ${validation.completeness}%)`
        : `Resume is ready for export (${validation.completeness}% complete)`;
    } else {
      return language === 'ar'
        ? `يجب إصلاح ${validation.errors.length} خطأ قبل التصدير`
        : `Please fix ${validation.errors.length} error${validation.errors.length > 1 ? 's' : ''} before exporting`;
    }
  }
}

export const resumeValidationService = new ResumeValidationService();
