
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialLinksProps {
  variant?: 'default' | 'compact' | 'footer';
  className?: string;
}

const socialMediaAccounts = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/dooub.sa',
    icon: Facebook,
    color: 'text-blue-600 hover:text-blue-700'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/dooub_sa',
    icon: Twitter,
    color: 'text-sky-500 hover:text-sky-600'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/dooub.sa',
    icon: Instagram,
    color: 'text-pink-600 hover:text-pink-700'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/dooub-sa',
    icon: Linkedin,
    color: 'text-blue-700 hover:text-blue-800'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@dooub-sa',
    icon: Youtube,
    color: 'text-red-600 hover:text-red-700'
  }
];

const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'default', className = '' }) => {
  const getButtonSize = () => {
    switch (variant) {
      case 'compact':
        return 'sm';
      case 'footer':
        return 'sm';
      default:
        return 'default';
    }
  };

  const getIconSize = () => {
    switch (variant) {
      case 'compact':
        return 'h-4 w-4';
      case 'footer':
        return 'h-5 w-5';
      default:
        return 'h-5 w-5';
    }
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      {socialMediaAccounts.map((social) => (
        <Button
          key={social.name}
          variant="ghost"
          size={getButtonSize()}
          className={`${social.color} hover:bg-gray-100 transition-colors`}
          asChild
        >
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`تابعنا على ${social.name}`}
          >
            <social.icon className={getIconSize()} />
          </a>
        </Button>
      ))}
    </div>
  );
};

export default SocialLinks;
