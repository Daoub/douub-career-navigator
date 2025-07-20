import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from 'lucide-react';

interface ResumeProgressCardProps {
  title: string;
  progress: number;
  description: string;
}

const ResumeProgressCard: React.FC<ResumeProgressCardProps> = ({ title, progress, description }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressStatus = (progress: number) => {
    if (progress >= 100) return 'Complete';
    if (progress >= 80) return 'Almost done';
    if (progress >= 50) return 'In progress';
    return 'Getting started';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className={getProgressColor(progress)}>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {getProgressStatus(progress)}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            {progress >= 100 ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}
            <span>Personal Information</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {progress >= 80 ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}
            <span>Experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {progress >= 60 ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}
            <span>Education</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {progress >= 40 ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}
            <span>Skills</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeProgressCard;