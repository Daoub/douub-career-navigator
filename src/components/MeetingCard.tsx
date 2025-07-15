import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, Users, Video, Globe } from 'lucide-react';

interface MeetingCardProps {
  meeting: {
    id: number;
    title: string;
    community: string;
    date: string;
    time: string;
    duration: string;
    participants: number;
    maxParticipants: number;
    speaker: string;
    description: string;
    category: string;
    type?: string;
  };
  showJoinButton?: boolean;
  variant?: 'default' | 'registered' | 'past';
}

const MeetingCard: React.FC<MeetingCardProps> = ({ 
  meeting, 
  showJoinButton = true,
  variant = 'default'
}) => {
  const getCardClasses = () => {
    switch (variant) {
      case 'registered':
        return 'border-primary/20 bg-primary/5';
      case 'past':
        return 'opacity-75';
      default:
        return 'hover:shadow-md transition-shadow';
    }
  };

  return (
    <Card className={getCardClasses()}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 flex items-center gap-2">
              {meeting.title}
              {variant === 'registered' && (
                <Badge variant="default" className="text-xs">مسجل</Badge>
              )}
            </CardTitle>
            <CardDescription className="text-sm mb-3">
              {meeting.description}
            </CardDescription>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {meeting.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {meeting.time} ({meeting.duration})
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {meeting.participants}/{meeting.maxParticipants || meeting.participants}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                أونلاين
              </div>
            </div>
          </div>
          <Badge variant="secondary">{meeting.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{meeting.speaker.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{meeting.speaker}</p>
              <p className="text-xs text-muted-foreground">{meeting.community}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {variant === 'past' ? (
              <>
                <Button variant="outline" size="sm">
                  مشاهدة التسجيل
                </Button>
                <Button variant="outline" size="sm">
                  تقييم الاجتماع
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  {variant === 'registered' ? 'إضافة للتقويم' : 'تفاصيل'}
                </Button>
                {showJoinButton && (
                  <Button size="sm" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    {variant === 'registered' ? 'انضم الآن' : 'انضم'}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;