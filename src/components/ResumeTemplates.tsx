import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  Share2, 
  Heart, 
  Crown,
  CheckCircle,
  FileText,
  Palette,
  Sparkles,
  Shield,
  Briefcase,
  Users,
  TrendingUp,
  Zap,
  Settings,
  Copy,
  Maximize2,
  Play
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { resumeTemplates, templateCategories } from '@/data/resumeTemplates';
import type { ResumeTemplate } from '@/data/resumeTemplates';


interface ResumeTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
  selectedTemplate: string;
}

const ResumeTemplates: React.FC<ResumeTemplatesProps> = ({
  onSelectTemplate,
  selectedTemplate
}) => {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'newest'>('rating');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [showSaudiOnly, setShowSaudiOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);

  const filteredTemplates = useMemo(() => {
    let filtered = resumeTemplates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.nameAr.includes(searchQuery) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesPremium = !showPremiumOnly || template.premium;
      const matchesSaudi = !showSaudiOnly || template.saudiCompliant;
      
      return matchesSearch && matchesCategory && matchesPremium && matchesSaudi;
    });

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'newest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, showPremiumOnly, showSaudiOnly]);

  const getCategoryIcon = (category: string) => {
    const icons = {
      'traditional': FileText,
      'modern': Sparkles,
      'creative': Palette,
      'saudi': Shield,
      'professional': Briefcase
    };
    return icons[category as keyof typeof icons] || FileText;
  };

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handlePreview = (template: ResumeTemplate) => {
    setPreviewTemplate(template);
    toast({
      title: language === 'ar' ? 'معاينة القالب' : 'Template Preview',
      description: language === 'ar' 
        ? `فتح معاينة لقالب ${template.nameAr}`
        : `Opening preview for ${template.name}`,
    });
  };

  const handleShare = async (template: ResumeTemplate) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/templates/${template.id}`);
      toast({
        title: language === 'ar' ? 'تم النسخ' : 'Copied',
        description: language === 'ar' 
          ? 'تم نسخ رابط القالب إلى الحافظة'
          : 'Template link copied to clipboard',
      });
    } catch (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' 
          ? 'فشل في نسخ الرابط'
          : 'Failed to copy link',
        variant: 'destructive'
      });
    }
  };

  const handleCustomize = (template: ResumeTemplate) => {
    onSelectTemplate(template.id);
    toast({
      title: language === 'ar' ? 'تم تحديد القالب' : 'Template Selected',
      description: language === 'ar' 
        ? `تم تحديد قالب ${template.nameAr} للتخصيص`
        : `Selected ${template.name} for customization`,
    });
  };

  const handleUseTemplate = (template: ResumeTemplate) => {
    onSelectTemplate(template.id);
    toast({
      title: language === 'ar' ? 'تم استخدام القالب' : 'Template Applied',
      description: language === 'ar' 
        ? `تم تطبيق قالب ${template.nameAr}`
        : `Applied ${template.name} template`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-hero gradient-text-hero">
            {language === 'ar' ? 'قوالب السيرة الذاتية' : 'Resume Templates'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'اختر من مجموعة متنوعة من القوالب المهنية'
              : 'Choose from a variety of professional templates'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {filteredTemplates.length} {language === 'ar' ? 'قالب' : 'templates'}
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="card-vision">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            {language === 'ar' ? 'البحث والفلترة' : 'Search & Filter'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'ar' ? 'البحث في القوالب...' : 'Search templates...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? 'الفئة' : 'Category'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
                </SelectItem>
                {templateCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {language === 'ar' ? category.nameAr : category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: 'rating' | 'downloads' | 'newest') => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? 'الترتيب' : 'Sort by'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">
                  {language === 'ar' ? 'التقييم' : 'Rating'}
                </SelectItem>
                <SelectItem value="downloads">
                  {language === 'ar' ? 'التحميلات' : 'Downloads'}
                </SelectItem>
                <SelectItem value="newest">
                  {language === 'ar' ? 'الأحدث' : 'Newest'}
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={showPremiumOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                className="flex items-center gap-1"
              >
                <Crown className="h-4 w-4" />
                {language === 'ar' ? 'مميز' : 'Premium'}
              </Button>
              <Button
                variant={showSaudiOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSaudiOnly(!showSaudiOnly)}
                className="flex items-center gap-1"
              >
                <Shield className="h-4 w-4" />
                {language === 'ar' ? 'سعودي' : 'Saudi'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <Tabs value="gallery" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            {language === 'ar' ? 'معرض القوالب' : 'Template Gallery'}
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            {language === 'ar' ? 'المفضلة' : 'Favorites'}
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            {language === 'ar' ? 'المستخدمة مؤخراً' : 'Recently Used'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className={`card-vision relative group ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}>
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  {template.premium && (
                    <Badge variant="default" className="bg-gradient-primary">
                      <Crown className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'مميز' : 'Premium'}
                    </Badge>
                  )}
                  {template.saudiCompliant && (
                    <Badge variant="outline" className="border-primary">
                      <Shield className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'سعودي' : 'Saudi'}
                    </Badge>
                  )}
                </div>

                <div className="absolute top-2 left-2 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(template.id)}
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(template.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>

                <CardHeader className="pb-2">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 relative overflow-hidden">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreview(template)}
                          className="bg-background/80 backdrop-blur-sm"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShare(template)}
                          className="bg-background/80 backdrop-blur-sm"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCustomize(template)}
                          className="bg-background/80 backdrop-blur-sm"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {language === 'ar' ? template.nameAr : template.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                  </div>
                  
                  <CardDescription className="text-sm">
                    {language === 'ar' ? template.descriptionAr : template.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    {React.createElement(getCategoryIcon(template.category), { className: "h-4 w-4 text-primary" })}
                    <span className="text-sm capitalize">{template.category}</span>
                    <Badge variant="outline" className="ml-auto">
                      <Download className="h-3 w-3 mr-1" />
                      {template.downloads.toLocaleString()}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCustomize(template)}
                      className="flex-1"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'تخصيص' : 'Customize'}
                    </Button>
                    <Button
                      onClick={() => handleUseTemplate(template)}
                      className="flex-1 bg-gradient-primary btn-gradient-hover"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'استخدام' : 'Use'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.filter(template => favorites.includes(template.id)).map((template) => (
              <Card key={template.id} className="card-vision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    {language === 'ar' ? template.nameAr : template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? template.descriptionAr : template.description}
                  </p>
                </CardContent>
              </Card>
            ))}
            {favorites.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  {language === 'ar' ? 'لا توجد قوالب مفضلة' : 'No favorite templates'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' 
                    ? 'انقر على أيقونة القلب لإضافة قوالب إلى المفضلة'
                    : 'Click the heart icon to add templates to favorites'
                  }
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="text-center py-12">
            <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              {language === 'ar' ? 'لا توجد قوالب مستخدمة مؤخراً' : 'No recently used templates'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' 
                ? 'القوالب التي تستخدمها ستظهر هنا'
                : 'Templates you use will appear here'
              }
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeTemplates;