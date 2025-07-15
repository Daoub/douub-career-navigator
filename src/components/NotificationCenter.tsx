import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Users, BookOpen, Check, X, Clock } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'meeting',
      title: 'اجتماع جديد متاح',
      message: 'تم إضافة جلسة "تطوير تطبيقات الويب" - غداً الساعة 8 مساءً',
      time: 'منذ 5 دقائق',
      read: false,
      icon: Calendar
    },
    {
      id: 2,
      type: 'learning',
      title: 'تحديث في التعلم',
      message: 'تم إضافة وحدة جديدة في دورة "التسويق الرقمي"',
      time: 'منذ ساعة',
      read: false,
      icon: BookOpen
    },
    {
      id: 3,
      type: 'community',
      title: 'مناقشة جديدة',
      message: 'تم نشر مناقشة جديدة في مجتمع المطورين',
      time: 'منذ 3 ساعات',
      read: true,
      icon: Users
    },
    {
      id: 4,
      type: 'reminder',
      title: 'تذكير: اجتماع قادم',
      message: 'لديك اجتماع في "إدارة المشاريع" خلال 30 دقيقة',
      time: 'منذ 10 دقائق',
      read: false,
      icon: Clock
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          الإشعارات
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          آخر التحديثات والفعاليات
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              لا توجد إشعارات جديدة
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  notification.read 
                    ? 'bg-muted/50 border-muted' 
                    : 'bg-background border-primary/20'
                }`}
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  <notification.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        تم القراءة
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3 mr-1" />
                      إزالة
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full text-xs"
              onClick={() => setNotifications([])}
            >
              مسح جميع الإشعارات
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;