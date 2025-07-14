interface AudioSettings {
  provider: 'elevenlabs' | 'webspeech';
  voiceId?: string;
  speed: number;
  volume: number;
  language: string;
}

interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
}

class AudioService {
  private settings: AudioSettings = {
    provider: 'webspeech',
    speed: 1.0,
    volume: 0.8,
    language: 'ar-SA'
  };

  private apiKey: string | null = null;
  private isPlaying = false;
  private currentAudio: HTMLAudioElement | null = null;
  private speechSynthesis: SpeechSynthesis | null = null;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.loadSettings();
  }

  // Settings Management
  updateSettings(newSettings: Partial<AudioSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
  }

  getSettings(): AudioSettings {
    return { ...this.settings };
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('elevenlabs_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('elevenlabs_api_key');
    }
    return this.apiKey;
  }

  private saveSettings() {
    localStorage.setItem('audio_settings', JSON.stringify(this.settings));
  }

  private loadSettings() {
    const saved = localStorage.getItem('audio_settings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
  }

  // ElevenLabs Integration
  async generateElevenLabsAudio(text: string, voiceId: string = '9BWtsMINqrJLrRacOk9x'): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('ElevenLabs API key not provided');
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('ElevenLabs error:', error);
      throw error;
    }
  }

  async getElevenLabsVoices(): Promise<ElevenLabsVoice[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('ElevenLabs API key not provided');
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error('Failed to fetch voices:', error);
      return [];
    }
  }

  // Web Speech API Integration
  async generateWebSpeechAudio(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.settings.language;
      utterance.rate = this.settings.speed;
      utterance.volume = this.settings.volume;

      // Try to find Arabic voice
      const voices = this.speechSynthesis.getVoices();
      const arabicVoice = voices.find(voice => 
        voice.lang.startsWith('ar') || voice.name.includes('Arabic')
      );
      
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      utterance.onend = () => {
        this.isPlaying = false;
        resolve();
      };

      utterance.onerror = (event) => {
        this.isPlaying = false;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      this.isPlaying = true;
      this.speechSynthesis.speak(utterance);
    });
  }

  // Main Audio Generation Method
  async generateAudio(text: string): Promise<string | void> {
    try {
      if (this.settings.provider === 'elevenlabs' && this.getApiKey()) {
        return await this.generateElevenLabsAudio(text, this.settings.voiceId);
      } else {
        await this.generateWebSpeechAudio(text);
        return; // Web Speech API doesn't return a URL
      }
    } catch (error) {
      console.warn('Primary audio provider failed, falling back to Web Speech API:', error);
      // Fallback to Web Speech API
      await this.generateWebSpeechAudio(text);
      return;
    }
  }

  // Audio Playback Control
  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      const audio = new Audio(audioUrl);
      audio.volume = this.settings.volume;
      
      audio.onended = () => {
        this.isPlaying = false;
        this.currentAudio = null;
        resolve();
      };

      audio.onerror = () => {
        this.isPlaying = false;
        this.currentAudio = null;
        reject(new Error('Audio playback failed'));
      };

      this.currentAudio = audio;
      this.isPlaying = true;
      audio.play();
    });
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }

    this.isPlaying = false;
  }

  getPlayingStatus(): boolean {
    return this.isPlaying;
  }

  // Demo Content
  getDemoContent(demoType: string): string {
    const content = {
      'job-search': `مرحباً بكم في عرض البحث الذكي عن الوظائف. سنستكشف معاً كيف تعمل منصة دؤوب في العثور على أفضل الفرص الوظيفية المناسبة لمؤهلاتكم وخبراتكم. 

أولاً، سنبدأ بالبحث في منصات التواصل الاجتماعي المختلفة حيث تقوم المنصة بفحص آلاف الوظائف المنشورة يومياً.

ثانياً، سنرى كيف يمكن تصفية النتائج حسب المجال والموقع الجغرافي لضمان العثور على الوظائف الأكثر صلة بكم.

ثالثاً، ستتعلمون كيفية حفظ الوظائف المفضلة لديكم لمراجعتها لاحقاً والتقديم عليها في الوقت المناسب.

وأخيراً، سنوضح كيفية إعداد التنبيهات الذكية التي تخبركم فور توفر وظائف جديدة تتطابق مع معاييركم.`,

      'resume-builder': `أهلاً بكم في عرض بناء السيرة الذاتية المهنية. سنتعرف على كيفية إنشاء سيرة ذاتية احترافية تساعدكم في التميز بين المتقدمين.

سنبدأ باختيار القالب المناسب من مجموعة واسعة من التصاميم الحديثة والمهنية التي تناسب مختلف المجالات والتخصصات.

بعدها سنقوم بإدخال البيانات الشخصية والمهنية بطريقة منظمة وواضحة تبرز نقاط القوة والإنجازات.

ثم سنستخدم تقنيات الذكاء الاصطناعي لتحليل السيرة الذاتية وتقديم اقتراحات لتحسينها وزيادة فعاليتها.

وفي النهاية، سنتعلم كيفية تصدير السيرة الذاتية بصيغة PDF احترافية جاهزة للإرسال لأصحاب العمل.`,

      'consultation': `مرحباً بكم في عرض جلسات الاستشارة المباشرة. سنتعرف على كيفية الاستفادة من خبرة المختصين في تطوير مسيرتكم المهنية.

أولاً، سنوضح كيفية حجز موعد مع الخبير المناسب حسب مجال تخصصكم واحتياجاتكم المهنية.

ثم سنرى كيفية الانضمام للجلسة المباشرة عبر الإنترنت باستخدام أدوات التواصل المتقدمة المتوفرة في المنصة.

بعدها سنتناول كيفية مناقشة التحديات المهنية التي تواجهونها والحصول على نصائح عملية من الخبراء.

وأخيراً، سنتعلم كيفية الحصول على خطة عمل واضحة ومفصلة تساعدكم في تحقيق أهدافكم المهنية.`,

      'community': `أهلاً وسهلاً بكم في عرض المجتمعات المهنية. سنستكشف كيفية الاستفادة من قوة التواصل والتشبيك المهني.

سنبدأ بتوضيح كيفية الانضمام للمجتمع المهني المناسب لمجال تخصصكم والتفاعل مع الأعضاء الآخرين.

ثم سنتعرف على الطرق المختلفة للتفاعل مع الأعضاء من خلال المناقشات والفعاليات والورش التدريبية.

بعدها سنوضح كيفية مشاركة خبراتكم ومعرفتكم مع الآخرين والاستفادة من تجاربهم أيضاً.

وفي النهاية، سنتعلم كيفية بناء شبكة مهنية قوية تساعدكم في تطوير مسيرتكم وفتح آفاق جديدة للنمو المهني.`
    };

    return content[demoType as keyof typeof content] || '';
  }
}

export const audioService = new AudioService();
export type { AudioSettings, ElevenLabsVoice };