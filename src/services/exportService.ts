
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { pdfExportService } from './pdfExportService';
import { htmlExportService } from './htmlExportService';

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'html' | 'json';
  quality: 'standard' | 'high' | 'print';
  template: string;
  language: 'ar' | 'en' | 'both';
  watermark: boolean;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email?: string;
    phone?: string;
    location?: string;
    summary?: string;
  };
  experience?: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    location?: string;
    description?: string;
    achievements?: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description?: string;
  }>;
  skills?: Array<{
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }> | string[];
  certificates?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

class ExportService {
  async exportToWord(resumeData: ResumeData, options: ExportOptions): Promise<void> {
    try {
      const isArabic = options.language === 'ar';
      
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Header
            new Paragraph({
              text: resumeData.personalInfo.name || (isArabic ? 'الاسم' : 'Name'),
              heading: HeadingLevel.HEADING_1,
              spacing: { after: 200 }
            }),
            
            // Contact Info
            ...(resumeData.personalInfo.email ? [new Paragraph({
              children: [
                new TextRun({ text: isArabic ? 'البريد الإلكتروني: ' : 'Email: ', bold: true }),
                new TextRun({ text: resumeData.personalInfo.email })
              ]
            })] : []),
            
            ...(resumeData.personalInfo.phone ? [new Paragraph({
              children: [
                new TextRun({ text: isArabic ? 'الهاتف: ' : 'Phone: ', bold: true }),
                new TextRun({ text: resumeData.personalInfo.phone })
              ]
            })] : []),
            
            ...(resumeData.personalInfo.location ? [new Paragraph({
              children: [
                new TextRun({ text: isArabic ? 'الموقع: ' : 'Location: ', bold: true }),
                new TextRun({ text: resumeData.personalInfo.location })
              ]
            })] : []),

            // Summary
            ...(resumeData.personalInfo.summary ? [
              new Paragraph({
                text: isArabic ? 'الملخص المهني' : 'Professional Summary',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 }
              }),
              new Paragraph({
                text: resumeData.personalInfo.summary,
                spacing: { after: 200 }
              })
            ] : []),

            // Experience
            ...(resumeData.experience && resumeData.experience.length > 0 ? [
              new Paragraph({
                text: isArabic ? 'الخبرة المهنية' : 'Professional Experience',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 }
              }),
              ...resumeData.experience.flatMap(exp => [
                new Paragraph({
                  children: [
                    new TextRun({ text: exp.title || (isArabic ? 'المسمى الوظيفي' : 'Job Title'), bold: true }),
                    new TextRun({ text: ` - ${exp.company || (isArabic ? 'اسم الشركة' : 'Company')}` })
                  ]
                }),
                new Paragraph({
                  text: `${exp.startDate || ''} - ${exp.current ? (isArabic ? 'حالياً' : 'Present') : (exp.endDate || '')}`,
                  spacing: { after: 100 }
                }),
                ...(exp.description ? [new Paragraph({
                  text: exp.description,
                  spacing: { after: 200 }
                })] : []),
                ...(exp.achievements && exp.achievements.length > 0 ? exp.achievements.map(achievement => 
                  new Paragraph({
                    text: `• ${achievement}`,
                    spacing: { after: 50 }
                  })
                ) : [])
              ])
            ] : []),

            // Education
            ...(resumeData.education && resumeData.education.length > 0 ? [
              new Paragraph({
                text: isArabic ? 'التعليم' : 'Education',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 }
              }),
              ...resumeData.education.flatMap(edu => [
                new Paragraph({
                  children: [
                    new TextRun({ text: edu.degree || (isArabic ? 'الدرجة العلمية' : 'Degree'), bold: true }),
                    new TextRun({ text: ` - ${edu.institution || (isArabic ? 'اسم الجامعة' : 'Institution')}` })
                  ]
                }),
                new Paragraph({
                  text: `${edu.startDate || ''} - ${edu.endDate || ''}`,
                  spacing: { after: edu.gpa ? 50 : 200 }
                }),
                ...(edu.gpa ? [new Paragraph({
                  text: `GPA: ${edu.gpa}`,
                  spacing: { after: 200 }
                })] : [])
              ])
            ] : []),

            // Skills
            ...(resumeData.skills && resumeData.skills.length > 0 ? [
              new Paragraph({
                text: isArabic ? 'المهارات' : 'Skills',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 }
              }),
              new Paragraph({
                text: Array.isArray(resumeData.skills) 
                  ? (typeof resumeData.skills[0] === 'string' 
                      ? (resumeData.skills as string[]).join(', ')
                      : (resumeData.skills as any[]).map(skill => skill.name).join(', '))
                  : '',
                spacing: { after: 200 }
              })
            ] : []),

            // Certificates
            ...(resumeData.certificates && resumeData.certificates.length > 0 ? [
              new Paragraph({
                text: isArabic ? 'الشهادات' : 'Certificates',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 }
              }),
              ...resumeData.certificates.flatMap(cert => [
                new Paragraph({
                  children: [
                    new TextRun({ text: cert.name, bold: true }),
                    new TextRun({ text: ` - ${cert.issuer}` })
                  ]
                }),
                new Paragraph({
                  text: cert.date,
                  spacing: { after: 150 }
                })
              ])
            ] : [])
          ]
        }]
      });

      const buffer = await Packer.toBlob(doc);
      const safeName = resumeData.personalInfo.name
        ?.replace(/[^\w\s-]/g, '')
        ?.replace(/\s+/g, '_')
        || 'Resume';
      
      const fileName = `${safeName}_${options.language}_${new Date().toISOString().split('T')[0]}.docx`;
      saveAs(buffer, fileName);
    } catch (error) {
      console.error('Word export error:', error);
      throw new Error('Failed to export Word document');
    }
  }

  async exportToJSON(resumeData: ResumeData, options: ExportOptions): Promise<void> {
    try {
      const exportData = {
        metadata: {
          exportedAt: new Date().toISOString(),
          language: options.language,
          template: options.template,
          version: '1.0'
        },
        resumeData
      };
      
      const jsonContent = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
      
      const safeName = resumeData.personalInfo.name
        ?.replace(/[^\w\s-]/g, '')
        ?.replace(/\s+/g, '_')
        || 'Resume';
      
      const fileName = `${safeName}_${options.language}_${new Date().toISOString().split('T')[0]}.json`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error('JSON export error:', error);
      throw new Error('Failed to export JSON');
    }
  }

  async exportResume(resumeData: ResumeData, options: ExportOptions): Promise<void> {
    const isArabic = options.language === 'ar';
    
    // Validate resume data
    if (!resumeData.personalInfo?.name) {
      throw new Error(isArabic ? 'الاسم مطلوب لتصدير السيرة الذاتية' : 'Name is required to export resume');
    }

    try {
      switch (options.format) {
        case 'pdf':
          return await pdfExportService.exportToPDF(resumeData, options);
        case 'docx':
          return await this.exportToWord(resumeData, options);
        case 'html':
          return await htmlExportService.exportToHTML(resumeData, options);
        case 'json':
          return await this.exportToJSON(resumeData, options);
        default:
          throw new Error(isArabic ? `تنسيق التصدير غير مدعوم: ${options.format}` : `Unsupported export format: ${options.format}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      throw new Error(isArabic ? 
        `فشل في تصدير السيرة الذاتية: ${error instanceof Error ? error.message : 'خطأ غير معروف'}` :
        `Failed to export resume: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

export const exportService = new ExportService();
