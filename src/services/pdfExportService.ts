
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData, ExportOptions } from './exportService';
import { pdfTemplateService } from './pdfTemplateService';
import { arabicFontService } from './arabicFontService';
import { resumeValidationService } from './resumeValidationService';

export class PDFExportService {
  private debugMode = false;

  private getQualitySettings(quality: string) {
    const baseSettings = {
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      foreignObjectRendering: true,
      logging: this.debugMode,
      removeContainer: true,
      imageTimeout: 15000,
      windowWidth: 1200,
      windowHeight: 1697,
      ignoreElements: (element: Element) => {
        // Ignore hidden elements and overlays
        const style = window.getComputedStyle(element);
        return style.display === 'none' || 
               style.visibility === 'hidden' ||
               element.classList.contains('loading-overlay') ||
               element.classList.contains('debug-overlay');
      }
    };

    switch (quality) {
      case 'high':
        return { 
          ...baseSettings,
          scale: 2.5,
          width: 2480,
          height: 3508
        };
      case 'print':
        return { 
          ...baseSettings,
          scale: 3.5,
          width: 2480,
          height: 3508
        };
      default:
        return { 
          ...baseSettings,
          scale: 2,
          width: 1754,
          height: 2480
        };
    }
  }

  private async waitForContentToLoad(): Promise<void> {
    console.log('PDF Export: Waiting for content to load...');
    
    // Wait for fonts to load
    if ('fonts' in document) {
      await document.fonts.ready;
      console.log('PDF Export: Fonts loaded');
    }
    
    // Wait for images to load
    const images = document.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
        // Timeout for problematic images
        setTimeout(resolve, 5000);
      });
    });
    
    await Promise.all(imagePromises);
    console.log('PDF Export: Images loaded');
    
    // Additional wait for rendering and layout
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('PDF Export: Content loading complete');
  }

  private validateHtmlContent(htmlContent: string): boolean {
    if (!htmlContent || htmlContent.trim().length === 0) {
      console.error('PDF Export: HTML content is empty');
      return false;
    }

    // Check for essential content indicators
    const hasPersonalInfo = htmlContent.includes('name') || htmlContent.includes('اسم');
    const hasStructure = htmlContent.includes('<div') && htmlContent.includes('</div>');
    
    if (!hasPersonalInfo || !hasStructure) {
      console.error('PDF Export: HTML content appears to be incomplete', {
        hasPersonalInfo,
        hasStructure,
        contentLength: htmlContent.length
      });
      return false;
    }

    console.log('PDF Export: HTML content validation passed');
    return true;
  }

  private createFallbackTemplate(resumeData: ResumeData, isArabic: boolean): string {
    const direction = isArabic ? 'rtl' : 'ltr';
    const textAlign = isArabic ? 'right' : 'left';
    
    return `
      <div style="
        width: 210mm;
        min-height: 297mm;
        background: white;
        color: #1f2937;
        font-family: ${isArabic ? "'Arial Unicode MS', Arial" : "Arial, sans-serif"};
        direction: ${direction};
        padding: 20mm;
        box-sizing: border-box;
        line-height: 1.6;
      ">
        <div style="margin-bottom: 30px; text-align: ${textAlign};">
          <h1 style="font-size: 28px; font-weight: bold; color: #1e40af; margin: 0 0 15px 0;">
            ${resumeData.personalInfo?.name || (isArabic ? 'اسم المتقدم' : 'Applicant Name')}
          </h1>
          ${resumeData.personalInfo?.email ? `
            <p style="margin: 5px 0; font-size: 14px;">
              ${isArabic ? 'البريد الإلكتروني: ' : 'Email: '}${resumeData.personalInfo.email}
            </p>
          ` : ''}
          ${resumeData.personalInfo?.phone ? `
            <p style="margin: 5px 0; font-size: 14px;">
              ${isArabic ? 'الهاتف: ' : 'Phone: '}${resumeData.personalInfo.phone}
            </p>
          ` : ''}
        </div>
        
        ${resumeData.personalInfo?.summary ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 18px; font-weight: bold; color: #059669; margin: 0 0 10px 0; text-align: ${textAlign};">
              ${isArabic ? 'الملخص المهني' : 'Professional Summary'}
            </h2>
            <p style="margin: 0; text-align: justify; font-size: 14px;">
              ${resumeData.personalInfo.summary}
            </p>
          </div>
        ` : ''}
        
        ${resumeData.experience?.length ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 18px; font-weight: bold; color: #059669; margin: 0 0 15px 0; text-align: ${textAlign};">
              ${isArabic ? 'الخبرة المهنية' : 'Professional Experience'}
            </h2>
            ${resumeData.experience.map(exp => `
              <div style="margin-bottom: 15px; padding: 10px; background: #f9fafb; border-radius: 5px;">
                <h3 style="font-size: 16px; font-weight: bold; margin: 0 0 5px 0; color: #1f2937;">
                  ${exp.title || (isArabic ? 'المسمى الوظيفي' : 'Job Title')}
                </h3>
                <p style="margin: 0 0 5px 0; font-size: 14px; color: #6b7280;">
                  ${exp.company || (isArabic ? 'اسم الشركة' : 'Company')} | 
                  ${exp.startDate} - ${exp.current ? (isArabic ? 'حالياً' : 'Present') : exp.endDate}
                </p>
                ${exp.description ? `
                  <p style="margin: 0; font-size: 14px; text-align: justify;">
                    ${exp.description}
                  </p>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resumeData.skills?.length ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 18px; font-weight: bold; color: #059669; margin: 0 0 15px 0; text-align: ${textAlign};">
              ${isArabic ? 'المهارات' : 'Skills'}
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${(Array.isArray(resumeData.skills) ? resumeData.skills : []).map((skill: any) => `
                <span style="
                  background: #e5e7eb; 
                  padding: 5px 10px; 
                  border-radius: 15px; 
                  font-size: 12px;
                  display: inline-block;
                ">
                  ${typeof skill === 'string' ? skill : skill.name}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  private async prepareResumeForCapture(resumeData: ResumeData, options: ExportOptions): Promise<HTMLElement> {
    console.log('PDF Export: Preparing resume for capture...');
    
    // Handle "both" language case - default to English for PDF export
    const pdfLanguage = options.language === 'both' ? 'en' : options.language;
    const isArabic = pdfLanguage === 'ar';
    
    // Ensure Arabic fonts are loaded
    if (isArabic) {
      console.log('PDF Export: Loading Arabic fonts...');
      await arabicFontService.ensureArabicFontsLoaded();
    }

    // Generate professional HTML template
    let htmlContent: string;
    try {
      htmlContent = pdfTemplateService.generateProfessionalTemplate(
        resumeData, 
        options.template, 
        pdfLanguage
      );
      console.log('PDF Export: Professional template generated');
    } catch (error) {
      console.warn('PDF Export: Professional template failed, using fallback:', error);
      htmlContent = this.createFallbackTemplate(resumeData, isArabic);
    }

    // Validate HTML content
    if (!this.validateHtmlContent(htmlContent)) {
      console.log('PDF Export: Using fallback template due to validation failure');
      htmlContent = this.createFallbackTemplate(resumeData, isArabic);
    }

    // Create a temporary container for PDF generation
    const tempContainer = document.createElement('div');
    tempContainer.id = 'pdf-generation-container';
    tempContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 210mm;
      height: auto;
      background: white;
      overflow: visible;
      z-index: 10000;
      transform: translateX(-100vw);
      pointer-events: none;
    `;
    
    tempContainer.innerHTML = htmlContent;
    document.body.appendChild(tempContainer);

    // Add debug overlay if in debug mode
    if (this.debugMode) {
      const debugOverlay = document.createElement('div');
      debugOverlay.className = 'debug-overlay';
      debugOverlay.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 10001;
      `;
      debugOverlay.textContent = 'PDF Export Debug Mode';
      document.body.appendChild(debugOverlay);
      
      setTimeout(() => {
        if (debugOverlay.parentNode) {
          debugOverlay.parentNode.removeChild(debugOverlay);
        }
      }, 5000);
    }

    console.log('PDF Export: Temporary container created and added to DOM');

    // Wait for content to load and render
    await this.waitForContentToLoad();

    // Verify the container has content
    if (tempContainer.offsetHeight === 0 || tempContainer.offsetWidth === 0) {
      console.error('PDF Export: Container has no dimensions', {
        width: tempContainer.offsetWidth,
        height: tempContainer.offsetHeight
      });
      throw new Error(isArabic ? 'فشل في إعداد المحتوى للتصدير' : 'Failed to prepare content for export');
    }

    console.log('PDF Export: Container prepared successfully', {
      width: tempContainer.offsetWidth,
      height: tempContainer.offsetHeight
    });

    return tempContainer;
  }

  async exportToPDF(resumeData: ResumeData, options: ExportOptions): Promise<void> {
    console.log('PDF Export: Starting export process...');
    
    // Handle "both" language case - default to English for PDF export
    const pdfLanguage = options.language === 'both' ? 'en' : options.language;
    
    // Validate resume data first
    const validation = resumeValidationService.validateResumeData(resumeData, pdfLanguage);
    if (!validation.isValid) {
      console.error('PDF Export: Resume validation failed:', validation.errors);
      throw new Error(validation.errors.join(', '));
    }

    let tempContainer: HTMLElement | null = null;
    
    try {
      const isArabic = pdfLanguage === 'ar';
      
      // Prepare the resume content for capture
      tempContainer = await this.prepareResumeForCapture(resumeData, options);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const qualitySettings = this.getQualitySettings(options.quality);
      
      console.log('PDF Export: Capturing with html2canvas...', qualitySettings);
      
      // Capture the temporary container as canvas
      const canvas = await html2canvas(tempContainer, qualitySettings);

      console.log('PDF Export: Canvas captured', {
        width: canvas.width,
        height: canvas.height
      });

      if (canvas.width === 0 || canvas.height === 0) {
        console.error('PDF Export: Canvas has zero dimensions');
        throw new Error(isArabic ? 'فشل في التقاط محتوى السيرة الذاتية' : 'Failed to capture resume content');
      }

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      if (!imgData || imgData === 'data:,') {
        console.error('PDF Export: Canvas data is empty');
        throw new Error(isArabic ? 'فشل في تحويل المحتوى لصورة' : 'Failed to convert content to image');
      }

      console.log('PDF Export: Image data generated successfully');
      
      // Calculate dimensions for A4 page
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm  
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      console.log(`PDF Export: Generated ${pdf.getNumberOfPages()} pages`);

      // Add watermark if requested
      if (options.watermark) {
        const totalPages = pdf.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.setTextColor(150, 150, 150);
          const watermarkText = isArabic ? 'تم إنشاؤه بواسطة دؤوب - منشئ السيرة الذاتية' : 'Generated by Doaub - CV Builder';
          pdf.text(watermarkText, 10, 285);
        }
      }

      // Generate filename with proper characters
      const safeName = resumeData.personalInfo.name
        ?.replace(/[^\w\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF-]/g, '') // Keep Arabic characters
        ?.replace(/\s+/g, '_') // Replace spaces with underscores
        || (isArabic ? 'السيرة_الذاتية' : 'Resume');
      
      const fileName = `${safeName}_${pdfLanguage}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      console.log('PDF Export: Saving file:', fileName);
      
      // Save the PDF
      pdf.save(fileName);
      
      console.log('PDF Export: Export completed successfully');
      
    } catch (error) {
      console.error('PDF export error:', error);
      const isArabic = options.language === 'ar';
      throw new Error(isArabic ? 
        `فشل في تصدير PDF: ${error instanceof Error ? error.message : 'خطأ غير معروف'}` :
        `Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      // Clean up temporary container
      if (tempContainer && tempContainer.parentNode) {
        console.log('PDF Export: Cleaning up temporary container');
        tempContainer.parentNode.removeChild(tempContainer);
      }
    }
  }

  // Enable debug mode for troubleshooting
  enableDebugMode(): void {
    this.debugMode = true;
    console.log('PDF Export: Debug mode enabled');
  }

  // Disable debug mode
  disableDebugMode(): void {
    this.debugMode = false;
    console.log('PDF Export: Debug mode disabled');
  }
}

export const pdfExportService = new PDFExportService();
