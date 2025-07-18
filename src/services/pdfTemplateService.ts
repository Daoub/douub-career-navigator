
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
        primary: isArabic ? "'Noto Sans Arabic', 'Arial Unicode MS', Arial, sans-serif" : "'Inter', 'Segoe UI', sans-serif",
        secondary: isArabic ? "'Noto Sans Arabic', 'Arial Unicode MS', Arial, sans-serif" : "'Inter', 'Segoe UI', sans-serif",
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

  generateProfessionalTemplate(
    resumeData: ResumeData,
    templateId: string = 'vision-professional',
    language: 'ar' | 'en' = 'ar'
  ): string {
    const isArabic = language === 'ar';
    const config = this.getTemplateConfig(templateId, isArabic);
    const direction = isArabic ? 'rtl' : 'ltr';
    const textAlign = isArabic ? 'right' : 'left';

    return `
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
      ">
        ${this.generateHeader(resumeData, config, isArabic, textAlign)}
        ${this.generateSummary(resumeData, config, isArabic, textAlign)}
        ${this.generateExperience(resumeData, config, isArabic, textAlign)}
        ${this.generateEducation(resumeData, config, isArabic, textAlign)}
        ${this.generateSkills(resumeData, config, isArabic, textAlign)}
        ${this.generateCertificates(resumeData, config, isArabic, textAlign)}
      </div>
    `;
  }

  private generateHeader(resumeData: ResumeData, config: PDFTemplateConfig, isArabic: boolean, textAlign: string): string {
    const { personalInfo } = resumeData;
    
    return `
      <div style="margin-bottom: ${config.spacing.section}; border-bottom: 3px solid ${config.colors.primary}; padding-bottom: ${config.spacing.element};">
        <h1 style="
          font-size: ${config.fonts.size.title};
          font-weight: bold;
          color: ${config.colors.primary};
          margin: 0 0 ${config.spacing.element} 0;
          text-align: ${textAlign};
        ">
          ${personalInfo?.name || (isArabic ? 'اسم المتقدم' : 'Applicant Name')}
        </h1>
        
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: ${config.fonts.size.body}; color: ${config.colors.text};">
          ${personalInfo?.email ? `
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="color: ${config.colors.secondary};">✉</span>
              <span>${personalInfo.email}</span>
            </div>
          ` : ''}
          
          ${personalInfo?.phone ? `
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="color: ${config.colors.secondary};">📱</span>
              <span>${personalInfo.phone}</span>
            </div>
          ` : ''}
          
          ${personalInfo?.location ? `
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="color: ${config.colors.secondary};">📍</span>
              <span>${personalInfo.location}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private generateSummary(resumeData: ResumeData, config: PDFTemplateConfig, isArabic: boolean, textAlign: string): string {
    if (!resumeData.personalInfo?.summary) return '';
    
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
          text-align: ${textAlign};
          text-align: justify;
        ">
          ${resumeData.personalInfo.summary}
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
        
        ${resumeData.experience.map(exp => `
          <div style="margin-bottom: ${config.spacing.element}; padding: ${config.spacing.element}; background: #f9fafb; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div style="flex: 1;">
                <h3 style="
                  font-size: ${config.fonts.size.body};
                  font-weight: bold;
                  color: ${config.colors.secondary};
                  margin: 0 0 4px 0;
                ">
                  ${exp.title || (isArabic ? 'المسمى الوظيفي' : 'Job Title')}
                </h3>
                <p style="
                  font-size: ${config.fonts.size.body};
                  color: ${config.colors.text};
                  margin: 0;
                ">
                  ${exp.company || (isArabic ? 'اسم الشركة' : 'Company Name')}
                </p>
              </div>
              <div style="text-align: ${isArabic ? 'left' : 'right'}; font-size: ${config.fonts.size.small}; color: #6b7280;">
                <p style="margin: 0;">${exp.startDate} - ${exp.current ? (isArabic ? 'حالياً' : 'Present') : exp.endDate}</p>
                ${exp.location ? `<p style="margin: 0;">${exp.location}</p>` : ''}
              </div>
            </div>
            
            ${exp.description ? `
              <p style="
                margin: 0 0 8px 0;
                font-size: ${config.fonts.size.body};
                text-align: justify;
              ">
                ${exp.description}
              </p>
            ` : ''}
            
            ${exp.achievements?.length ? `
              <ul style="margin: 0; padding-${isArabic ? 'right' : 'left'}: 20px;">
                ${exp.achievements.map(achievement => `
                  <li style="
                    margin-bottom: 4px;
                    font-size: ${config.fonts.size.body};
                  ">
                    ${achievement}
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
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
        
        ${resumeData.education.map(edu => `
          <div style="margin-bottom: ${config.spacing.element}; padding: ${config.spacing.element}; background: #f9fafb; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div style="flex: 1;">
                <h3 style="
                  font-size: ${config.fonts.size.body};
                  font-weight: bold;
                  color: ${config.colors.secondary};
                  margin: 0 0 4px 0;
                ">
                  ${edu.degree || (isArabic ? 'الدرجة العلمية' : 'Degree')}
                </h3>
                <p style="
                  font-size: ${config.fonts.size.body};
                  color: ${config.colors.text};
                  margin: 0;
                ">
                  ${edu.institution || (isArabic ? 'اسم الجامعة' : 'Institution')}
                </p>
              </div>
              <div style="text-align: ${isArabic ? 'left' : 'right'}; font-size: ${config.fonts.size.small}; color: #6b7280;">
                <p style="margin: 0;">${edu.startDate} - ${edu.endDate}</p>
                ${edu.gpa ? `<p style="margin: 0;">GPA: ${edu.gpa}</p>` : ''}
              </div>
            </div>
            
            ${edu.description ? `
              <p style="
                margin: 0;
                font-size: ${config.fonts.size.body};
                text-align: justify;
              ">
                ${edu.description}
              </p>
            ` : ''}
          </div>
        `).join('')}
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
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: ${config.spacing.element};">
          ${(Array.isArray(resumeData.skills) ? resumeData.skills : []).map((skill: any) => `
            <div style="
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              padding: 8px 12px; 
              background: #f3f4f6; 
              border-radius: 6px;
              border-${isArabic ? 'right' : 'left'}: 3px solid ${config.colors.accent};
            ">
              <span style="font-weight: 500; font-size: ${config.fonts.size.body};">
                ${typeof skill === 'string' ? skill : skill.name}
              </span>
              ${typeof skill === 'object' && skill.level ? `
                <span style="
                  font-size: ${config.fonts.size.small};
                  background: ${config.colors.secondary};
                  color: white;
                  padding: 2px 8px;
                  border-radius: 12px;
                ">
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
          ${resumeData.certificates.map(cert => `
            <div style="
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              padding: ${config.spacing.element}; 
              background: #f9fafb; 
              border-radius: 8px;
              border-${isArabic ? 'right' : 'left'}: 4px solid ${config.colors.accent};
            ">
              <div>
                <h4 style="
                  font-weight: bold; 
                  margin: 0 0 4px 0; 
                  font-size: ${config.fonts.size.body};
                  color: ${config.colors.secondary};
                ">
                  ${cert.name}
                </h4>
                <p style="
                  margin: 0; 
                  font-size: ${config.fonts.size.small}; 
                  color: #6b7280;
                ">
                  ${cert.issuer}
                </p>
              </div>
              <span style="
                font-size: ${config.fonts.size.small}; 
                color: #6b7280;
                font-weight: 500;
              ">
                ${cert.date}
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

export const pdfTemplateService = new PDFTemplateService();
