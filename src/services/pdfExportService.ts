
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData, ExportOptions } from './exportService';

export class PDFExportService {
  private getQualitySettings(quality: string) {
    switch (quality) {
      case 'high':
        return { 
          scale: 2, 
          useCORS: true, 
          allowTaint: false,
          backgroundColor: '#ffffff',
          foreignObjectRendering: true
        };
      case 'print':
        return { 
          scale: 3, 
          useCORS: true, 
          allowTaint: false,
          backgroundColor: '#ffffff',
          foreignObjectRendering: true
        };
      default:
        return { 
          scale: 1.5, 
          useCORS: true, 
          allowTaint: false,
          backgroundColor: '#ffffff',
          foreignObjectRendering: true
        };
    }
  }

  private async waitForFontsToLoad(): Promise<void> {
    // Wait for fonts to load before capturing
    if ('fonts' in document) {
      await document.fonts.ready;
    }
    // Additional wait to ensure all content is rendered
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  private ensureArabicFonts(isArabic: boolean): void {
    if (isArabic) {
      // Inject Arabic font CSS if not already present
      const fontId = 'arabic-font-injection';
      if (!document.getElementById(fontId)) {
        const style = document.createElement('style');
        style.id = fontId;
        style.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&display=swap');
          [data-resume-preview] * {
            font-family: 'Noto Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }

  async exportToPDF(resumeData: ResumeData, options: ExportOptions): Promise<void> {
    try {
      const isArabic = options.language === 'ar';
      
      // Ensure Arabic fonts are loaded
      this.ensureArabicFonts(isArabic);
      
      // Wait for fonts and rendering
      await this.waitForFontsToLoad();
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const qualitySettings = this.getQualitySettings(options.quality);
      
      // Find the resume preview element
      const element = document.querySelector('[data-resume-preview]') as HTMLElement;
      if (!element) {
        throw new Error('Resume preview element not found. Please ensure the preview is visible.');
      }

      // Ensure element is visible and has content
      if (element.offsetHeight === 0 || element.offsetWidth === 0) {
        throw new Error('Resume preview element is not visible. Please switch to the preview tab first.');
      }

      // Temporarily enhance the element for better PDF capture
      const originalStyle = element.style.cssText;
      element.style.transform = 'scale(1)';
      element.style.transformOrigin = 'top left';
      element.style.width = '210mm';
      element.style.backgroundColor = '#ffffff';
      
      // Add temporary Arabic text rendering improvements
      if (isArabic) {
        element.style.direction = 'rtl';
        element.style.textAlign = 'right';
      }

      // Capture the element as canvas with enhanced settings
      const canvas = await html2canvas(element, {
        ...qualitySettings,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: 1200,
        windowHeight: 1600,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-resume-preview]') as HTMLElement;
          if (clonedElement && isArabic) {
            // Enhance Arabic text rendering in cloned document
            clonedElement.style.fontFamily = "'Noto Sans Arabic', Arial, sans-serif";
            clonedElement.style.direction = 'rtl';
            clonedElement.style.unicodeBidi = 'bidi-override';
          }
        }
      });

      // Restore original styles
      element.style.cssText = originalStyle;

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Failed to capture resume content. The preview may be empty.');
      }

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Calculate dimensions for A4 page
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm  
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
        ?.replace(/[^\w\s-]/g, '') // Remove special characters
        ?.replace(/\s+/g, '_') // Replace spaces with underscores
        || 'Resume';
      
      const fileName = `${safeName}_${options.language}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Save the PDF
      pdf.save(fileName);
      
    } catch (error) {
      console.error('PDF export error:', error);
      throw new Error(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const pdfExportService = new PDFExportService();
