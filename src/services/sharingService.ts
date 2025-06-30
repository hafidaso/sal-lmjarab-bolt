export interface ShareableContent {
  type: 'doctor' | 'hospital' | 'pharmacy';
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  metadata: {
    rating?: number;
    specialty?: string;
    location?: string;
    phone?: string;
    email?: string;
  };
}

export interface ShareOptions {
  platform: 'email' | 'sms' | 'whatsapp' | 'facebook' | 'twitter' | 'linkedin' | 'copy-link';
  customMessage?: string;
  recipientEmail?: string;
  recipientPhone?: string;
}

class SharingService {
  async generateShareableLink(content: ShareableContent): Promise<string> {
    // Generate a shareable link with metadata
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/${content.type}/${content.id}`;
    
    // Add tracking parameters
    const trackingParams = new URLSearchParams({
      utm_source: 'share',
      utm_medium: 'social',
      utm_campaign: 'doctor_profile_share',
      shared_at: Date.now().toString()
    });

    return `${shareUrl}?${trackingParams.toString()}`;
  }

  async shareContent(content: ShareableContent, options: ShareOptions): Promise<boolean> {
    const shareUrl = await this.generateShareableLink(content);
    const shareText = this.generateShareText(content, options.customMessage);

    switch (options.platform) {
      case 'email':
        return this.shareViaEmail(content, shareUrl, shareText, options.recipientEmail);
      
      case 'sms':
        return this.shareViaSMS(shareText, shareUrl, options.recipientPhone);
      
      case 'whatsapp':
        return this.shareViaWhatsApp(shareText, shareUrl);
      
      case 'facebook':
        return this.shareViaFacebook(shareUrl, shareText);
      
      case 'twitter':
        return this.shareViaTwitter(shareText, shareUrl);
      
      case 'linkedin':
        return this.shareViaLinkedIn(shareUrl, content.title, shareText);
      
      case 'copy-link':
        return this.copyToClipboard(shareUrl);
      
      default:
        throw new Error('Unsupported sharing platform');
    }
  }

  async generateVCard(doctorData: any): Promise<string> {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${doctorData.name}`,
      `ORG:${doctorData.clinic || 'Private Practice'}`,
      `TITLE:${doctorData.specialty}`,
      `TEL;TYPE=WORK:${doctorData.phone}`,
      `EMAIL;TYPE=WORK:${doctorData.email}`,
      `ADR;TYPE=WORK:;;${doctorData.address};${doctorData.city};;;Morocco`,
      `URL:${await this.generateShareableLink({
        type: 'doctor',
        id: doctorData.id,
        title: doctorData.name,
        description: doctorData.specialty,
        url: '',
        metadata: {}
      })}`,
      `NOTE:${doctorData.specialty} - Rating: ${doctorData.rating}/5`,
      'END:VCARD'
    ].join('\n');

    return vcard;
  }

  async downloadVCard(doctorData: any): Promise<void> {
    const vcard = await this.generateVCard(doctorData);
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doctorData.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  async getShareAnalytics(contentId: string, contentType: string): Promise<{
    totalShares: number;
    sharesByPlatform: { [platform: string]: number };
    clickThroughs: number;
    conversionRate: number;
  }> {
    // In production, this would fetch real analytics data
    return {
      totalShares: Math.floor(Math.random() * 100) + 10,
      sharesByPlatform: {
        whatsapp: Math.floor(Math.random() * 30) + 5,
        facebook: Math.floor(Math.random() * 20) + 3,
        email: Math.floor(Math.random() * 15) + 2,
        twitter: Math.floor(Math.random() * 10) + 1,
        sms: Math.floor(Math.random() * 8) + 1,
        linkedin: Math.floor(Math.random() * 5) + 1
      },
      clickThroughs: Math.floor(Math.random() * 50) + 5,
      conversionRate: Math.random() * 0.3 + 0.1 // 10-40%
    };
  }

  private generateShareText(content: ShareableContent, customMessage?: string): string {
    if (customMessage) {
      return customMessage;
    }

    const baseText = `Check out ${content.title}`;
    
    switch (content.type) {
      case 'doctor':
        return `${baseText} - ${content.metadata.specialty} in ${content.metadata.location}. Rating: ${content.metadata.rating}/5 ⭐`;
      
      case 'hospital':
        return `${baseText} - Quality healthcare facility in ${content.metadata.location}. Rating: ${content.metadata.rating}/5 ⭐`;
      
      case 'pharmacy':
        return `${baseText} - Trusted pharmacy in ${content.metadata.location}. Rating: ${content.metadata.rating}/5 ⭐`;
      
      default:
        return baseText;
    }
  }

  private async shareViaEmail(
    content: ShareableContent, 
    shareUrl: string, 
    shareText: string, 
    recipientEmail?: string
  ): Promise<boolean> {
    const subject = encodeURIComponent(`Healthcare Recommendation: ${content.title}`);
    const body = encodeURIComponent(`
${shareText}

${content.description}

View full profile: ${shareUrl}

Shared via Sal-lmjarab - Morocco's Healthcare Platform
    `);

    const mailtoUrl = `mailto:${recipientEmail || ''}?subject=${subject}&body=${body}`;
    
    try {
      window.open(mailtoUrl);
      return true;
    } catch (error) {
      console.error('Email sharing failed:', error);
      return false;
    }
  }

  private async shareViaSMS(shareText: string, shareUrl: string, recipientPhone?: string): Promise<boolean> {
    const message = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    const smsUrl = `sms:${recipientPhone || ''}?body=${message}`;
    
    try {
      window.open(smsUrl);
      return true;
    } catch (error) {
      console.error('SMS sharing failed:', error);
      return false;
    }
  }

  private async shareViaWhatsApp(shareText: string, shareUrl: string): Promise<boolean> {
    const message = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    
    try {
      window.open(whatsappUrl, '_blank');
      return true;
    } catch (error) {
      console.error('WhatsApp sharing failed:', error);
      return false;
    }
  }

  private async shareViaFacebook(shareUrl: string, shareText: string): Promise<boolean> {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    
    try {
      window.open(facebookUrl, '_blank', 'width=600,height=400');
      return true;
    } catch (error) {
      console.error('Facebook sharing failed:', error);
      return false;
    }
  }

  private async shareViaTwitter(shareText: string, shareUrl: string): Promise<boolean> {
    const tweetText = encodeURIComponent(`${shareText}\n\n${shareUrl} #Healthcare #Morocco`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    
    try {
      window.open(twitterUrl, '_blank', 'width=600,height=400');
      return true;
    } catch (error) {
      console.error('Twitter sharing failed:', error);
      return false;
    }
  }

  private async shareViaLinkedIn(shareUrl: string, title: string, shareText: string): Promise<boolean> {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(shareText)}`;
    
    try {
      window.open(linkedinUrl, '_blank', 'width=600,height=400');
      return true;
    } catch (error) {
      console.error('LinkedIn sharing failed:', error);
      return false;
    }
  }

  private async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      return true;
    } catch (error) {
      console.error('Clipboard copy failed:', error);
      return false;
    }
  }
}

export const sharingService = new SharingService();