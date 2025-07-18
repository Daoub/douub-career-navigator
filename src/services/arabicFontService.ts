
export class ArabicFontService {
  private fontLoadedPromise: Promise<void> | null = null;
  private fontsLoaded = false;

  async ensureArabicFontsLoaded(): Promise<void> {
    if (this.fontsLoaded) {
      return Promise.resolve();
    }

    if (this.fontLoadedPromise) {
      return this.fontLoadedPromise;
    }

    this.fontLoadedPromise = this.loadArabicFonts();
    return this.fontLoadedPromise;
  }

  private async loadArabicFonts(): Promise<void> {
    try {
      // Check if fonts are already loaded
      if (document.fonts && await this.checkFontsAvailable()) {
        this.fontsLoaded = true;
        return;
      }

      // Inject CSS for Arabic fonts
      await this.injectArabicFontCSS();
      
      // Wait for fonts to load
      if (document.fonts) {
        await document.fonts.ready;
      }

      // Additional wait to ensure fonts are fully rendered
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.fontsLoaded = true;
    } catch (error) {
      console.warn('Arabic fonts loading failed, falling back to system fonts:', error);
      this.fontsLoaded = true; // Continue with system fonts
    }
  }

  private async checkFontsAvailable(): Promise<boolean> {
    if (!document.fonts) return false;
    
    try {
      const notoArabic = new FontFace('Noto Sans Arabic', 'url(https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyG2vdFaAO3lNNFEPWcCdJ2RD.woff2)');
      await notoArabic.load();
      document.fonts.add(notoArabic);
      return true;
    } catch {
      return false;
    }
  }

  private async injectArabicFontCSS(): Promise<void> {
    const fontId = 'arabic-font-injection';
    
    if (document.getElementById(fontId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = fontId;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&display=swap');
      
      .arabic-text, [data-resume-preview] * {
        font-family: 'Noto Sans Arabic', 'Cairo', 'Arial Unicode MS', 'Tahoma', 'DejaVu Sans', sans-serif !important;
        font-feature-settings: 'liga' 1, 'kern' 1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      .arabic-text {
        direction: rtl;
        text-align: right;
        unicode-bidi: bidi-override;
        word-spacing: 0.1em;
        letter-spacing: 0.02em;
      }
      
      .arabic-text h1, .arabic-text h2, .arabic-text h3, 
      .arabic-text h4, .arabic-text h5, .arabic-text h6 {
        font-weight: 600;
        line-height: 1.4;
      }
      
      .arabic-text p, .arabic-text li {
        line-height: 1.8;
        word-spacing: 0.1em;
      }
    `;
    
    document.head.appendChild(style);
    
    // Wait for CSS to be applied
    await new Promise(resolve => requestAnimationFrame(resolve));
  }

  applyArabicStyling(element: HTMLElement): void {
    element.classList.add('arabic-text');
    element.style.direction = 'rtl';
    element.style.textAlign = 'right';
    element.style.fontFamily = "'Noto Sans Arabic', 'Cairo', 'Arial Unicode MS', sans-serif";
  }

  removeArabicStyling(element: HTMLElement): void {
    element.classList.remove('arabic-text');
    element.style.direction = '';
    element.style.textAlign = '';
    element.style.fontFamily = '';
  }
}

export const arabicFontService = new ArabicFontService();
