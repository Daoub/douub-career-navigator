
import { ResumeData } from './exportService';

export interface PDFTemplateConfig {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    accent: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    size: {
      title: string;
      heading: string;
      body: string;
      small: string;
    };
  };
  spacing: {
    section: string;
    element: string;
    line: string;
  };
}

export class PDFTemplateService {
  private getTemplateConfig(templateId: string, isArabic: boolean): PDFTemplateConfig {
    const baseConfig = {
      colors: {
        primary: '#1e40af',
        secondary: '#059669',
        text: '#1f2937',
        background: '#ffffff',
        accent: '#dc2626'
      },
      fonts: {
        primary: isArabic ? "'Noto Sans Arabic', 'Arial Unicode MS', Arial, sans-serif" : "'Inter', 'Segoe UI', Arial, sans-serif",
        secondary: isArabic ? "'Noto Sans Arabic', 'Arial Unicode MS', Arial, sans-serif" : "'Inter', 'Segoe UI', Arial, sans-serif",
        size: {
          title: isArabic ? '32px' : '28px',
          heading: isArabic ? '20px' : '18px',
          body: isArabic ? '16px' : '14px',
          small: isArabic ? '14px' : '12px'
        }
      },
      spacing: {
        section: '24px',
        element: '12px',
        line: isArabic ? '1.8' : '1.6'
      }
    };

    switch (templateId) {
      case 'neom-executive':
        return {
          ...baseConfig,
          colors: {
            ...baseConfig.colors,
            primary: '#7c3aed',
            secondary: '#2563eb'
          }
        };
      case 'saudi-modern':
        return {
          ...baseConfig,
          colors: {
            ...baseConfig.colors,
            primary: '#059669',
            secondary: '#0891b2'
          }
        };
      default:
        return baseConfig;
    }
  }

  private sanitizeText(text: string): string {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  generateProfessionalTemplate(
    resumeData: ResumeData,
    templateId: string = 'vision-professional',
    language: 'ar' | 'en' = 'ar'
  ): string {
    console.log('PDF Template: Generating template', { templateId, language });
    
    if (!resumeData || !resumeData.personalInfo) {
      console.error('PDF Template: Invalid resume data');
      throw new Error('Invalid resume data provided');
    }

    const isArabic = language === 'ar';
    const config = this.getTemplateConfig(templateId, isArabic);
    const direction = isArabic ? 'rtl' : 'ltr';
    const textAlign = isArabic ? 'right' : 'left';

    const template = `
      <div style="
        width: 210mm;
        min-height: 297mm;
        background: ${config.colors.background};
        color: ${config.colors.text};
        font-family: ${config.fonts.primary};
        direction: ${direction};
        padding: 20mm;
        box-sizing: border-box;
        line-height: ${config.spacing.line};
        font-size: ${config.fonts.size.body};
      ">
        ${this.generateHeader(resumeData, config, isArabic, textAlign)}
        ${this.generateSummary(resumeData, config, isArabic, textAlign)}
        ${this.generateExperience(resumeData, config, isArabic, textAlign)}
        ${this.generateEducation(resumeData, config, isArabic, textAlign)}
        ${this.generateSkills(resumeData, config, isArabic, textAlign)}
        ${this.generateCertificates(resumeData, config, isArabic, textAlign)}
      </div>
    `;

    console.log('PDF Template: Template generated successfully');
    return template;
  }

  private generateHeader(resumeData: ResumeData, config: PDFTemplateConfig, isArabic: boolean, textAlign: string): string {
    const { personalInfo } = resumeData;
    
    if (!personalInfo) {
      console.warn('PDF Template: No personal info provided');
      return '';
    }
    
    const name = this.sanitizeText(personalInfo.name || (isArabic ? 'اسم المتقدم' : 'Applicant Name'));
    const email = personalInfo.email ? this.sanitizeText(personalInfo.email) : '';
    const phone = personalInfo.phone ? this.sanitizeText(personalInfo.phone) : '';
    const location = personalInfo.location ? this.sanitizeText(personalInfo.location) : '';
    
    return `
      <div style="margin-bottom: ${config.spacing.section}; border-bottom: 3px solid ${config.colors.primary}; padding-bottom: ${config.spacing.element};">
        <h1 style="
          font-size: ${config.fonts.size.title};
          font-weight: bold;
          color: ${config.colors.primary};
          margin: 0 0 ${config.spacing.element} 0;
          text-align: ${textAlign};
          word-wrap: break-word;
        ">
          ${name}
        </h1>
        
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: ${config.fonts.size.body}; color: ${config.colors.text};">
          ${email ? `
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0;">
              <span style="color: ${config.colors.secondary}; flex-shrink: 0;">✉</span>
              <span style="word-break: break-all;">${email}</span>
            </div>
          ` : ''}
          
          ${phone ? `
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0;">
              <span style="color: ${config.colors.secondary}; flex-shrink: 0;">📱</span>
              <span>${phone}</span>
            </div>
          ` : ''}
          
          ${location ? `
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0;">
              <span style="color: ${config.colors.secondary}; flex-shrink: 0;">📍</span>
              <span style="word-wrap: break-word;">${location}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private generateSummary(resumeData: ResumeData, config: PDFTemplateConfig, isArabic: boolean, textAlign: string): string {
    if (!resumeData.personalInfo?.summary) return '';
    
    const summary = this.sanitizeText(resumeData.personalInfo.summary);
    
    return `
      <div style="margin-bottom: ${config.spacing.section};">
        <h2 style="
          font-size: ${config.fonts.size.heading};
          font-weight: bold;
          color: ${config.colors.primary};
          margin: 0 0 ${config.spacing.element} 0;
          border-bottom: 2px solid ${config.colors.secondary};
          padding-bottom: 4px;
          text-align: ${textAlign};
        ">
          ${isArabic ? 'الملخص المهني' : 'Professional Summary'}
        </h2>
        <p style="
          margin: 0;
          font-size: ${config.fonts.size.body};
          text-align: justify;
          word-wrap: break-word;
          hyphens: auto;
        ">
          ${summary}
        </p>
      </div>
    `;
  }

  private generateExperience(resumeData: ResumeData, config: PDFTemplateConfig, isArabic: boolean, textAlign: string): string {
    if (!resumeData.experience?.length) return '';
    
    return `
      <div style="margin-bottom: ${config.spacing.section};">
        <h2 style="
          font-size: ${config.fonts.size.heading};
          font-weight: bold;
          color: ${config.colors.primary};
          margin: 0 0 ${config.spacing.element} 0;
          border-bottom: 2px solid ${config.colors.secondary};
          padding-bottom: 4px;
          text-align: ${textAlign};
        ">
          ${isArabic ? 'الخبرة المهنية' : 'Professional Experience'}
        </h2>
        
        ${resumeData.experience.map(exp => {
          const title = this.sanitizeText(exp.title || (isArabic ? 'المسمى الوظيفي' : 'Job Title'));
          const company = this.sanitizeText(exp.company || (isArabic ? 'اسم الشركة' : 'Company Name'));
          const location = exp.location ? this.sanitizeText(exp.location) : '';
          const description = exp.description ? this.sanitizeText(exp.description) : '';
          const startDate = this.sanitizeText(exp.startDate || '');
          const endDate = exp.current ? (isArabic ? 'حالياً' : 'Present') : this.sanitizeText(exp.endDate || '');
          
          return `
            <div style="margin-bottom: ${config.spacing.element}; padding: ${config.spacing.element}; background: #f9fafb; border-radius: 8px; page-break-inside: avoid;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 0;">
                  <h3 style="
                    font-size: ${config.fonts.size.body};
                    font-weight: bold;
                    color: ${config.colors.secondary};
                    margin: 0 0 4px 0;
                    word-wrap: break-word;
                  ">
                    ${title}
                  </h3>
                  <p style="
                    font-size: ${config.fonts.size.body};
                    color: ${config.colors.text};
                    margin: 0;
                    word-wrap: break-word;
                  ">
                    ${company}
                  </p>
                </div>
                <div style="text-align: ${isArabic ? 'left' : 'right'}; font-size: ${config.fonts.size.small}; color: #6b7280; flex-shrink: 0; margin-left: ${isArabic ? '0' : '10px'}; margin-right: ${isArabic ? '10px' : '0'};">
                  <p style="margin: 0; white-space: nowrap;">${startDate} - ${endDate}</p>
                  ${location ? `<p style="margin: 0; word-wrap: break-word;">${location}</p>` : ''}
                </div>
              </div>
              
              ${description ? `
                <p style="
                  margin: 0 0 8px 0;
                  font-size: ${config.fonts.size.body};
                  text-align: justify;
                  word-wrap: break-word;
                  hyphens: auto;
                ">
                  ${description}
                </p>
              ` : ''}
              
              ${exp.achievements?.length ? `
                <ul style="margin: 0; padding-${isArabic ? 'right' : 'left'}: 20px; list-style-type: disc;">
                  ${exp.achievements.map(achievement => `
                    <li style="
                      margin-bottom: 4px;
                      font-size: ${config.fonts.size.body};
                      word-wrap: break-word;
                      hyphens: auto;
                    ">
                      ${this.sanitizeText(achievement)}
                    </li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  private generateEducation(resumeData: ResumeData, config: PDFTemplateConfig, isArabic: boolean, textAlign: string): string {
    if (!resumeData.education?.length) return '';
    
    return `
      <div style="margin-bottom: ${config.spacing.section};">
        <h2 style="
          font-size: ${config.fonts.size.heading};
          font-weight: bold;
          color: ${config.colors.primary};
          margin: 0 0 ${config.spacing.element} 0;
          border-bottom: 2px solid ${config.colors.secondary};
          padding-bottom: 4px;
          text-align: ${textAlign};
        ">
          ${isArabic ? 'التعليم' : 'Education'}
        </h2>
        
        ${resumeData.education.map(edu => {
          const degree = this.sanitizeText(edu.degree || (isArabic ? 'الدرجة العلمية' : 'Degree'));
          const institution = this.sanitizeText(edu.institution || (isArabic ? 'اسم الجامعة' : 'Institution'));
          const startDate = this.sanitizeText(edu.startDate || '');
          const endDate = this.sanitizeText(edu.endDate || '');
          const gpa = edu.gpa ? this.sanitizeText(edu.gpa) : '';
          const description = edu.description ? this.sanitizeText(edu.description) : '';
          
          return `
            <div style="margin-bottom: ${config.spacing.element}; padding: ${config.spacing.element}; background: #f9fafb; border-radius: 8px; page-break-inside: avoid;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 0;">
                  <h3 style="
                    font-size: ${config.fonts.size.body};
                    font-weight: bold;
                    color: ${config.colors.secondary};
                    margin: 0 0 4px 0;
                    word-wrap: break-word;
                  ">
                    ${degree}
                  </h3>
                  <p style="
                    font-size: ${config.fonts.size.body};
                    color: ${config.colors.text};
                    margin: 0;
                    word-wrap: break-word;
                  ">
                    ${institution}
                  </p>
                </div>
                <div style="text-align: ${isArabic ? 'left' : 'right'}; font-size: ${config.fonts.size.small}; color: #6b7280; flex-shrink: 0; margin-left: ${isArabic ? '0' : '10px'}; margin-right: ${isArabic ? '10px' : '0'};">
                  <p style="margin: 0; white-space: nowrap;">${startDate} - ${endDate}</p>
                  ${gpa ? `<p style="margin: 0;">GPA: ${gpa}</p>` : ''}
                </div>
              </div>
              
              ${description ? `
                <p style="
                  margin: 0;
                  font-size: ${config.fonts.size.body};
                  text-align: justify;
                  word-wrap: break-word;
                  hyphens: auto;
                ">
                  ${description}
                </p>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  private generateSkills(resumeData: ResumeData, config: PDFTemplateConfig, isArabic: boolean, textAlign: string): string {
    if (!resumeData.skills?.length) return '';
    
    return `
      <div style="margin-bottom: ${config.spacing.section};">
        <h2 style="
          font-size: ${config.fonts.size.heading};
          font-weight: bold;
          color: ${config.colors.primary};
          margin: 0 0 ${config.spacing.element} 0;
          border-bottom: 2px solid ${config.colors.secondary};
          padding-bottom: 4px;
          text-align: ${textAlign};
        ">
          ${isArabic ? 'المهارات' : 'Skills'}
        </h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: ${config.spacing.element};">
          ${(Array.isArray(resumeData.skills) ? resumeData.skills : []).map((skill: any) => {
            const skillName = this.sanitizeText(typeof skill === 'string' ? skill : skill.name || '');
            const skillLevel = typeof skill === 'object' && skill.level ? skill.level : '';
            
            return `
              <div style="
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 8px 12px; 
                background: #f3f4f6; 
                border-radius: 6px;
                border-${isArabic ? 'right' : 'left'}: 3px solid ${config.colors.accent};
                min-height: 40px;
                page-break-inside: avoid;
              ">
                <span style="font-weight: 500; font-size: ${config.fonts.size.body}; word-wrap: break-word; flex: 1;">
                  ${skillName}
                </span>
                ${skillLevel ? `
                  <span style="
                    font-size: ${config.fonts.size.small};
                    background: ${config.colors.secondary};
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    margin-left: ${isArabic ? '0' : '8px'};
                    margin-right: ${isArabic ? '8px' : '0'};
                    white-space: nowrap;
                    flex-shrink: 0;
                  ">
                    ${skillLevel === 'expert' ? (isArabic ? 'خبير' : 'Expert') :
                      skillLevel === 'advanced' ? (isArabic ? 'متقدم' : 'Advanced') :
                      skillLevel === 'intermediate' ? (isArabic ? 'متوسط' : 'Intermediate') :
                      (isArabic ? 'مبتدئ' : 'Beginner')}
                  </span>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  private generateCertificates(resumeData: ResumeData, config: PDFTemplateConfig, isArabic: boolean, textAlign: string): string {
    if (!resumeData.certificates?.length) return '';
    
    return `
      <div style="margin-bottom: ${config.spacing.section};">
        <h2 style="
          font-size: ${config.fonts.size.heading};
          font-weight: bold;
          color: ${config.colors.primary};
          margin: 0 0 ${config.spacing.element} 0;
          border-bottom: 2px solid ${config.colors.secondary};
          padding-bottom: 4px;
          text-align: ${textAlign};
        ">
          ${isArabic ? 'الشهادات' : 'Certificates'}
        </h2>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: ${config.spacing.element};">
          ${resumeData.certificates.map(cert => {
            const name = this.sanitizeText(cert.name || '');
            const issuer = this.sanitizeText(cert.issuer || '');
            const date = this.sanitizeText(cert.date || '');
            
            return `
              <div style="
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: ${config.spacing.element}; 
                background: #f9fafb; 
                border-radius: 8px;
                border-${isArabic ? 'right' : 'left'}: 4px solid ${config.colors.accent};
                page-break-inside: avoid;
                flex-wrap: wrap;
                gap: 10px;
              ">
                <div style="flex: 1; min-width: 0;">
                  <h4 style="
                    font-weight: bold; 
                    margin: 0 0 4px 0; 
                    font-size: ${config.fonts.size.body};
                    color: ${config.colors.secondary};
                    word-wrap: break-word;
                  ">
                    ${name}
                  </h4>
                  <p style="
                    margin: 0; 
                    font-size: ${config.fonts.size.small}; 
                    color: #6b7280;
                    word-wrap: break-word;
                  ">
                    ${issuer}
                  </p>
                </div>
                <span style="
                  font-size: ${config.fonts.size.small}; 
                  color: #6b7280;
                  font-weight: 500;
                  white-space: nowrap;
                  flex-shrink: 0;
                ">
                  ${date}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}

export const pdfTemplateService = new PDFTemplateService();
