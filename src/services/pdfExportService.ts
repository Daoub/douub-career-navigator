
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData, ExportOptions } from './exportService';
import { pdfTemplateService } from './pdfTemplateService';
import { arabicFontService } from './arabicFontService';
import { resumeValidationService } from './resumeValidationService';

export class PDFExportService {
  private getQualitySettings(quality: string) {
    const baseSettings = {
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      foreignObjectRendering: true,
      logging: false,
      removeContainer: true,
      imageTimeout: 15000,
      windowWidth: 1200,
      windowHeight: 1697
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
    // Wait for fonts to load
    if ('fonts' in document) {
      await document.fonts.ready;
    }
    
    // Wait for images to load
    const images = document.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    
    await Promise.all(imagePromises);
    
    // Additional wait for rendering
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  private async prepareResumeForCapture(resumeData: ResumeData, options: ExportOptions): Promise<HTMLElement> {
    // Handle "both" language case - default to English for PDF export
    const pdfLanguage = options.language === 'both' ? 'en' : options.language;
    const isArabic = pdfLanguage === 'ar';
    
    // Ensure Arabic fonts are loaded
    if (isArabic) {
      await arabicFontService.ensureArabicFontsLoaded();
    }

    // Generate professional HTML template
    const htmlContent = pdfTemplateService.generateProfessionalTemplate(
      resumeData, 
      options.template, 
      pdfLanguage
    );

    // Create a temporary container for PDF generation
    const tempContainer = document.createElement('div');
    tempContainer.id = 'pdf-generation-container';
    tempContainer.style.cssText = `
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: 210mm;
      height: auto;
      background: white;
      overflow: visible;
      z-index: -1000;
    `;
    
    tempContainer.innerHTML = htmlContent;
    document.body.appendChild(tempContainer);

    // Wait for content to load and render
    await this.waitForContentToLoad();

    return tempContainer;
  }

  async exportToPDF(resumeData: ResumeData, options: ExportOptions): Promise<void> {
    // Handle "both" language case - default to English for PDF export
    const pdfLanguage = options.language === 'both' ? 'en' : options.language;
    
    // Validate resume data first
    const validation = resumeValidationService.validateResumeData(resumeData, pdfLanguage);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    let tempContainer: HTMLElement | null = null;
    
    try {
      const isArabic = pdfLanguage === 'ar';
      
      // Prepare the resume content for capture
      tempContainer = await this.prepareResumeForCapture(resumeData, options);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const qualitySettings = this.getQualitySettings(options.quality);
      
      // Capture the temporary container as canvas
      const canvas = await html2canvas(tempContainer, qualitySettings);

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error(isArabic ? 'فشل في التقاط محتوى السيرة الذاتية' : 'Failed to capture resume content');
      }

      const imgData = canvas.toDataURL('image/png', 1.0);
      
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
      
      const fileName = `${safeName}_${options.language}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Save the PDF
      pdf.save(fileName);
      
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
        tempContainer.parentNode.removeChild(tempContainer);
      }
    }
  }
}

export const pdfExportService = new PDFExportService();
