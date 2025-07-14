import React, { useState, useEffect } from 'react';
import { Settings, Volume2, Mic, Key, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { audioService, AudioSettings as AudioSettingsType, ElevenLabsVoice } from '@/services/audioService';

const AudioSettings: React.FC = () => {
  const [settings, setSettings] = useState<AudioSettingsType>(audioService.getSettings());
  const [apiKey, setApiKey] = useState(audioService.getApiKey() || '');
  const [voices, setVoices] = useState<ElevenLabsVoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestPlaying, setIsTestPlaying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (settings.provider === 'elevenlabs' && audioService.getApiKey()) {
      loadVoices();
    }
  }, [settings.provider]);

  const loadVoices = async () => {
    setIsLoading(true);
    try {
      const voicesList = await audioService.getElevenLabsVoices();
      setVoices(voicesList);
    } catch (error) {
      toast({
        title: "خطأ في تحميل الأصوات",
        description: "تعذر تحميل قائمة الأصوات من ElevenLabs. تأكد من صحة مفتاح API.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsChange = (key: keyof AudioSettingsType, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    audioService.updateSettings({ [key]: value });
  };

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
    if (newApiKey.trim()) {
      audioService.setApiKey(newApiKey.trim());
      if (settings.provider === 'elevenlabs') {
        loadVoices();
      }
    }
  };

  const testAudio = async () => {
    setIsTestPlaying(true);
    try {
      const testText = "مرحباً! هذا اختبار للصوت المُولد بالذكاء الاصطناعي.";
      await audioService.generateAudio(testText);
      
      toast({
        title: "تم الاختبار بنجاح",
        description: "تم تشغيل الصوت التجريبي بنجاح",
      });
    } catch (error) {
      toast({
        title: "فشل الاختبار",
        description: "تعذر تشغيل الصوت التجريبي. تحقق من الإعدادات.",
        variant: "destructive",
      });
    } finally {
      setIsTestPlaying(false);
    }
  };

  const resetSettings = () => {
    const defaultSettings: AudioSettingsType = {
      provider: 'webspeech',
      speed: 1.0,
      volume: 0.8,
      language: 'ar-SA'
    };
    setSettings(defaultSettings);
    audioService.updateSettings(defaultSettings);
    
    toast({
      title: "تم إعادة تعيين الإعدادات",
      description: "تم استعادة الإعدادات الافتراضية",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          إعدادات الصوت
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            إعدادات الصوت المُولد بالذكاء الاصطناعي
          </DialogTitle>
          <DialogDescription>
            اضبط إعدادات الصوت للحصول على أفضل تجربة في العروض التوضيحية
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Audio Provider Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">مقدم خدمة الصوت</CardTitle>
              <CardDescription>
                اختر المصدر المفضل لتوليد الصوت
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">ElevenLabs (جودة عالية)</Label>
                  <p className="text-sm text-muted-foreground">
                    أصوات طبيعية عالية الجودة (يتطلب مفتاح API مدفوع)
                  </p>
                </div>
                <Switch
                  checked={settings.provider === 'elevenlabs'}
                  onCheckedChange={(checked) => 
                    handleSettingsChange('provider', checked ? 'elevenlabs' : 'webspeech')
                  }
                />
              </div>

              {settings.provider === 'elevenlabs' && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey" className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      مفتاح ElevenLabs API
                    </Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="أدخل مفتاح API الخاص بك"
                      value={apiKey}
                      onChange={(e) => handleApiKeyChange(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      يمكنك الحصول على مفتاح API من موقع ElevenLabs الرسمي
                    </p>
                  </div>

                  {voices.length > 0 && (
                    <div className="space-y-2">
                      <Label>اختر الصوت</Label>
                      <Select
                        value={settings.voiceId}
                        onValueChange={(value) => handleSettingsChange('voiceId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر صوتاً من القائمة" />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.map((voice) => (
                            <SelectItem key={voice.voice_id} value={voice.voice_id}>
                              {voice.name} ({voice.category})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {apiKey && (
                    <Button 
                      variant="outline" 
                      onClick={loadVoices}
                      disabled={isLoading}
                      className="gap-2"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                      {isLoading ? 'جارٍ التحميل...' : 'تحديث قائمة الأصوات'}
                    </Button>
                  )}
                </div>
              )}

              {settings.provider === 'webspeech' && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <Mic className="h-4 w-4 inline ml-1" />
                    يتم استخدام تقنية Web Speech API المدمجة في المتصفح (مجانية)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Audio Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">إعدادات التشغيل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>سرعة التشغيل: {settings.speed}x</Label>
                <Slider
                  value={[settings.speed]}
                  onValueChange={([value]) => handleSettingsChange('speed', value)}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>بطيء (0.5x)</span>
                  <span>عادي (1.0x)</span>
                  <span>سريع (2.0x)</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>مستوى الصوت: {Math.round(settings.volume * 100)}%</Label>
                <Slider
                  value={[settings.volume]}
                  onValueChange={([value]) => handleSettingsChange('volume', value)}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>اللغة</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => handleSettingsChange('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar-SA">العربية (السعودية)</SelectItem>
                    <SelectItem value="ar-EG">العربية (مصر)</SelectItem>
                    <SelectItem value="ar-AE">العربية (الإمارات)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={testAudio} 
              disabled={isTestPlaying}
              className="flex-1 gap-2"
            >
              <Volume2 className={`h-4 w-4 ${isTestPlaying ? 'animate-pulse' : ''}`} />
              {isTestPlaying ? 'جارٍ التشغيل...' : 'اختبار الصوت'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={resetSettings}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              إعادة تعيين
            </Button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">نصائح للحصول على أفضل تجربة:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
              <li>استخدم ElevenLabs للحصول على أفضل جودة صوت</li>
              <li>اضبط السرعة حسب تفضيلك الشخصي</li>
              <li>تأكد من أن السماعات أو السماعات الرأسية تعمل بشكل صحيح</li>
              <li>يمكن استخدام Web Speech API كبديل مجاني</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AudioSettings;