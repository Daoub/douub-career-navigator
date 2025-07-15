import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface LearningProgressCardProps {
  course: {
    id: number;
    title: string;
    progress: number;
    currentModule: string;
    nextDeadline: string;
    totalModules: number;
    completedModules: number;
    timeSpent: string;
    status: string;
  };
}

const LearningProgressCard: React.FC<LearningProgressCardProps> = ({ course }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{course.title}</CardTitle>
            <CardDescription className="mt-2">
              الوحدة الحالية: {course.currentModule}
            </CardDescription>
          </div>
          <Badge variant={course.status === 'جاري' ? 'default' : 'secondary'}>
            {course.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>التقدم</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">الوحدات المكتملة</p>
            <p className="font-medium">{course.completedModules}/{course.totalModules}</p>
          </div>
          <div>
            <p className="text-muted-foreground">الوقت المستغرق</p>
            <p className="font-medium">{course.timeSpent}</p>
          </div>
          <div>
            <p className="text-muted-foreground">الموعد التالي</p>
            <p className="font-medium">{course.nextDeadline}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              عرض التقدم
            </Button>
            <Button size="sm">
              متابعة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgressCard;