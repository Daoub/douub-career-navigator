
import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { audioService } from '@/services/audioService';
import AudioSettings from '@/components/AudioSettings';

interface DemoVideoProps {
  title: string;
  description: string;
  duration: string;
  demoType: 'job-search' | 'resume-builder' | 'consultation' | 'community';
}

const DemoVideo: React.FC<DemoVideoProps> = ({ 
  title, 
  description, 
  duration, 
  demoType 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioGenerated, setAudioGenerated] = useState(false);
  const { toast } = useToast();

  const demoContent = {
    'job-search': {
      steps: [
        'البحث في منصات التواصل الاجتماعي',
        'تصفية النتائج حسب المجال والموقع',
        'حفظ الوظائف المفضلة',
        'إعداد التنبيهات الذكية'
      ],
      color: 'from-emerald-500 to-green-600'
    },
    'resume-builder': {
      steps: [
        'اختيار القالب المناسب',
        'إدخال البيانات الشخصية',
        'تحليل السيرة بالذكاء الاصطناعي',
        'تصدير PDF احترافي'
      ],
      color: 'from-blue-500 to-indigo-600'
    },
    'consultation': {
      steps: [
        'حجز موعد مع الخبير',
        'الانضمام للجلسة المباشرة',
        'مناقشة التحديات المهنية',
        'الحصول على خطة عمل'
      ],
      color: 'from-purple-500 to-pink-600'
    },
    'community': {
      steps: [
        'الانضمام للمجتمع المهني',
        'التفاعل مع الأعضاء',
        'مشاركة الخبرات',
        'بناء الشبكة المهنية'
      ],
      color: 'from-orange-500 to-red-600'
    }
  };

  const currentDemo = demoContent[demoType];

  // Generate and play AI audio
  const generateAndPlayAudio = async () => {
    if (isMuted) return;
    
    setIsGeneratingAudio(true);
    try {
      const demoText = audioService.getDemoContent(demoType);
      const audioUrl = await audioService.generateAudio(demoText);
      
      if (audioUrl) {
        await audioService.playAudio(audioUrl);
      }
      
      setAudioGenerated(true);
    } catch (error) {
      console.error('Audio generation failed:', error);
      toast({
        title: "خطأ في تشغيل الصوت",
        description: "تعذر توليد أو تشغيل الصوت. سيتم المتابعة بدون صوت.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const stopAudio = () => {
    audioService.stopAudio();
  };

  const handlePlay = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopAudio();
    } else {
      setIsPlaying(true);
      
      // Start audio generation/playback
      if (!isMuted) {
        await generateAndPlayAudio();
      }
      
      // Start video progress simulation
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            stopAudio();
            return 100;
          }
          return prev + 1.25; // Slower progress to match longer audio
        });
      }, 300);
    }
  };

  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(false);
    stopAudio();
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        {/* Video Player Area */}
        <div className={`relative bg-gradient-to-r ${currentDemo.color} rounded-t-lg overflow-hidden`}>
          <div className="aspect-video flex items-center justify-center text-white relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/20">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
            </div>
            
            {/* Demo Content */}
            <div className="relative z-10 text-center p-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                
                {/* Demo Steps Animation */}
                <div className="space-y-3">
                  {currentDemo.steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-center text-sm p-2 rounded-lg transition-all duration-500 ${
                        progress > (index * 25) 
                          ? 'bg-white/30 transform scale-105' 
                          : 'bg-white/10'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ml-2 transition-colors duration-300 ${
                        progress > (index * 25) ? 'bg-yellow-300' : 'bg-white/50'
                      }`}></div>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Play Button */}
              <div className="flex items-center justify-center gap-4">
                <Button 
                  onClick={handlePlay}
                  size="lg"
                  disabled={isGeneratingAudio}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white disabled:opacity-50"
                >
                  {isGeneratingAudio ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                
                {isGeneratingAudio && (
                  <span className="text-sm text-white/80">
                    جارٍ توليد الصوت...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse">
            <AudioSettings />
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={handleRestart}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/20"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>

          {/* Duration Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {duration}
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-bold text-gray-800">{title}</h4>
            {audioGenerated && !isGeneratingAudio && (
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <Volume2 className="h-3 w-3" />
                <span>صوت ذكي</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          {!isMuted && (
            <p className="text-xs text-gray-500 mt-2">
              💡 سيتم تشغيل تعليق صوتي مُولد بالذكاء الاصطناعي مع الفيديو
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoVideo;
