import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Users, Star, Award } from 'lucide-react';

interface LearningCardProps {
  specialization: {
    id: number;
    title: string;
    description: string;
    category: string;
    level: string;
    duration: string;
    modules: number;
    enrolled: number;
    rating: number;
    price: string;
    instructor: string;
    skills: string[];
    certified: boolean;
  };
}

const LearningCard: React.FC<LearningCardProps> = ({ specialization }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ':
        return 'default';
      case 'متوسط':
        return 'secondary';
      case 'متقدم':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary">{specialization.category}</Badge>
          <Badge variant={getLevelColor(specialization.level)}>
            {specialization.level}
          </Badge>
        </div>
        <CardTitle className="text-lg">{specialization.title}</CardTitle>
        <CardDescription>{specialization.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {specialization.duration}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {specialization.modules} وحدات
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {specialization.enrolled}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{specialization.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">بواسطة {specialization.instructor}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {specialization.skills.slice(0, 3).map(skill => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {specialization.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{specialization.skills.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{specialization.price}</span>
            {specialization.certified && (
              <Badge variant="outline" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                شهادة
              </Badge>
            )}
          </div>
          <Button size="sm">ابدأ التعلم</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningCard;