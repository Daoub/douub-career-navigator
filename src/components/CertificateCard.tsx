import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Download, Share2, ExternalLink } from 'lucide-react';

interface CertificateCardProps {
  certificate: {
    id: number;
    title: string;
    description: string;
    issuer: string;
    date: string;
    skills: string[];
    credentialId: string;
    verified: boolean;
    downloadUrl?: string;
    verificationUrl?: string;
  };
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{certificate.title}</CardTitle>
              <CardDescription>{certificate.issuer}</CardDescription>
            </div>
          </div>
          {certificate.verified && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              ✓ معتمد
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {certificate.description}
        </p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>تاريخ الإصدار: {certificate.date}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {certificate.skills.map(skill => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {certificate.credentialId && (
          <div className="text-xs text-muted-foreground">
            رقم الاعتماد: {certificate.credentialId}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          {certificate.downloadUrl && (
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              تحميل
            </Button>
          )}
          {certificate.verificationUrl && (
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              التحقق
            </Button>
          )}
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            مشاركة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;