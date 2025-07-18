
import { saveAs } from 'file-saver';
import { ResumeData, ExportOptions } from './exportService';

export class HTMLExportService {
  async exportToHTML(resumeData: ResumeData, options: ExportOptions): Promise<void> {
    try {
      const htmlContent = this.generateHTMLContent(resumeData, options);
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      
      const safeName = resumeData.personalInfo.name
        ?.replace(/[^\w\s-]/g, '')
        ?.replace(/\s+/g, '_')
        || 'Resume';
      
      const fileName = `${safeName}_${options.language}_${new Date().toISOString().split('T')[0]}.html`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error('HTML export error:', error);
      throw new Error('Failed to export HTML');
    }
  }

  private generateHTMLContent(resumeData: ResumeData, options: ExportOptions): string {
    const isArabic = options.language === 'ar';
    
    return `
<!DOCTYPE html>
<html lang="${isArabic ? 'ar' : 'en'}" dir="${isArabic ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.personalInfo.name || 'Resume'}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${isArabic ? "'Noto Sans Arabic', Arial, sans-serif" : "'Inter', sans-serif"};
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #1f2937;
            background-color: #ffffff;
            direction: ${isArabic ? 'rtl' : 'ltr'};
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #1e40af;
            padding-bottom: 30px;
            margin-bottom: 40px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 15px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 25px;
            flex-wrap: wrap;
            margin-top: 15px;
            font-weight: 500;
        }
        
        .contact-info span {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e40af;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
            margin-bottom: 20px;
        }
        
        .experience-item, .education-item, .certificate-item {
            margin-bottom: 25px;
            padding-${isArabic ? 'right' : 'left'}: 20px;
            border-${isArabic ? 'right' : 'left'}: 3px solid #e5e7eb;
        }
        
        .job-title, .degree, .certificate-name {
            font-weight: 600;
            font-size: 1.1rem;
            color: #059669;
            margin-bottom: 5px;
        }
        
        .company, .institution, .issuer {
            font-weight: 500;
            color: #6b7280;
            margin-bottom: 5px;
        }
        
        .dates {
            color: #9ca3af;
            font-size: 0.9rem;
            margin-bottom: 10px;
        }
        
        .description {
            color: #374151;
            margin-bottom: 10px;
        }
        
        .achievements {
            list-style: none;
            padding: 0;
        }
        
        .achievements li {
            position: relative;
            padding-${isArabic ? 'right' : 'left'}: 20px;
            margin-bottom: 5px;
            color: #374151;
        }
        
        .achievements li::before {
            content: "▪";
            position: absolute;
            ${isArabic ? 'right' : 'left'}: 0;
            color: #059669;
            font-weight: bold;
        }
        
        .skills {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .skill {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background: #f9fafb;
            border-radius: 8px;
            border-${isArabic ? 'right' : 'left'}: 3px solid #e5e7eb;
        }
        
        .skill-name {
            font-weight: 500;
        }
        
        .skill-level {
            font-size: 0.8rem;
            padding: 4px 8px;
            border-radius: 12px;
            background: #dbeafe;
            color: #1e40af;
            font-weight: 500;
        }
        
        .summary {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-${isArabic ? 'right' : 'left'}: 4px solid #1e40af;
            font-size: 1rem;
            line-height: 1.7;
        }
        
        @media print {
            body { 
                margin: 0; 
                padding: 20px; 
                font-size: 12pt;
            }
            .section { 
                page-break-inside: avoid; 
            }
        }
        
        @media (max-width: 768px) {
            body {
                padding: 20px 15px;
            }
            .contact-info {
                flex-direction: column;
                gap: 10px;
            }
            .skills {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${resumeData.personalInfo.name || (isArabic ? 'الاسم' : 'Name')}</h1>
        <div class="contact-info">
            ${resumeData.personalInfo.email ? `<span><strong>📧</strong> ${resumeData.personalInfo.email}</span>` : ''}
            ${resumeData.personalInfo.phone ? `<span><strong>📱</strong> ${resumeData.personalInfo.phone}</span>` : ''}
            ${resumeData.personalInfo.location ? `<span><strong>📍</strong> ${resumeData.personalInfo.location}</span>` : ''}
        </div>
    </div>

    ${resumeData.personalInfo.summary ? `
    <div class="section">
        <h2 class="section-title">${isArabic ? 'الملخص المهني' : 'Professional Summary'}</h2>
        <div class="summary">${resumeData.personalInfo.summary}</div>
    </div>
    ` : ''}

    ${resumeData.experience && resumeData.experience.length > 0 ? `
    <div class="section">
        <h2 class="section-title">${isArabic ? 'الخبرة المهنية' : 'Professional Experience'}</h2>
        ${resumeData.experience.map(exp => `
            <div class="experience-item">
                <div class="job-title">${exp.title || (isArabic ? 'المسمى الوظيفي' : 'Job Title')}</div>
                <div class="company">${exp.company || (isArabic ? 'اسم الشركة' : 'Company Name')}</div>
                <div class="dates">${exp.startDate || ''} - ${exp.current ? (isArabic ? 'حالياً' : 'Present') : (exp.endDate || '')}</div>
                ${exp.location ? `<div class="dates">${exp.location}</div>` : ''}
                ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
                ${exp.achievements && exp.achievements.length > 0 ? `
                    <ul class="achievements">
                        ${exp.achievements.map((achievement: string) => `<li>${achievement}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${resumeData.education && resumeData.education.length > 0 ? `
    <div class="section">
        <h2 class="section-title">${isArabic ? 'التعليم' : 'Education'}</h2>
        ${resumeData.education.map(edu => `
            <div class="education-item">
                <div class="degree">${edu.degree || (isArabic ? 'الدرجة العلمية' : 'Degree')}</div>
                <div class="institution">${edu.institution || (isArabic ? 'اسم الجامعة' : 'Institution')}</div>
                <div class="dates">${edu.startDate || ''} - ${edu.endDate || ''}</div>
                ${edu.gpa ? `<div class="dates">GPA: ${edu.gpa}</div>` : ''}
                ${edu.description ? `<div class="description">${edu.description}</div>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${resumeData.skills && resumeData.skills.length > 0 ? `
    <div class="section">
        <h2 class="section-title">${isArabic ? 'المهارات' : 'Skills'}</h2>
        <div class="skills">
            ${(Array.isArray(resumeData.skills) ? resumeData.skills : []).map((skill: any) => `
                <div class="skill">
                    <span class="skill-name">${typeof skill === 'string' ? skill : skill.name}</span>
                    ${typeof skill === 'object' && skill.level ? `
                        <span class="skill-level">
                            ${skill.level === 'expert' ? (isArabic ? 'خبير' : 'Expert') :
                              skill.level === 'advanced' ? (isArabic ? 'متقدم' : 'Advanced') :
                              skill.level === 'intermediate' ? (isArabic ? 'متوسط' : 'Intermediate') :
                              (isArabic ? 'مبتدئ' : 'Beginner')}
                        </span>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    </div>
    ` : ''}

    ${resumeData.certificates && resumeData.certificates.length > 0 ? `
    <div class="section">
        <h2 class="section-title">${isArabic ? 'الشهادات' : 'Certificates'}</h2>
        ${resumeData.certificates.map(cert => `
            <div class="certificate-item">
                <div class="certificate-name">${cert.name}</div>
                <div class="issuer">${cert.issuer}</div>
                <div class="dates">${cert.date}</div>
            </div>
        `).join('')}
    </div>
    ` : ''}

    <div style="margin-top: 50px; text-align: center; font-size: 0.8rem; color: #9ca3af;">
        ${isArabic ? 'تم إنشاؤه بواسطة دؤوب - منشئ السيرة الذاتية' : 'Generated by Doaub - CV Builder'} • ${new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
    </div>
</body>
</html>`;
  }
}

export const htmlExportService = new HTMLExportService();
