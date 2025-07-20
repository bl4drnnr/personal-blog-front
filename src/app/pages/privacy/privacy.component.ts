import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { ContentItem } from '@shared/interfaces/privacy-content-item.interface';

@Component({
  selector: 'page-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class PrivacyComponent implements OnInit {
  animationState = '';

  pageContent: {
    title: string;
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: ContentItem[];
    }>;
    cookiePolicy: {
      title: string;
      content: ContentItem[];
    };
  } = {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: January 2025',
    sections: [
      {
        title: '1. Information We Collect',
        content: [
          {
            type: 'paragraph',
            text: 'We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and any other information you choose to provide.'
          }
        ]
      },
      {
        title: '2. How We Use Your Information',
        content: [
          {
            type: 'paragraph',
            text: 'We use the information we collect to:'
          },
          {
            type: 'list',
            items: [
              'Provide, maintain, and improve our services',
              'Send you technical notices, updates, and support messages',
              'Respond to your comments and questions',
              'Communicate with you about products, services, and events'
            ]
          }
        ]
      },
      {
        title: '3. Information Sharing',
        content: [
          {
            type: 'paragraph',
            text: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.'
          }
        ]
      },
      {
        title: '4. Cookies and Tracking Technologies',
        content: [
          {
            type: 'paragraph',
            text: 'We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us understand how you use our site and improve our services.'
          }
        ]
      },
      {
        title: '5. Data Security',
        content: [
          {
            type: 'paragraph',
            text: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
          }
        ]
      },
      {
        title: '6. Your Rights',
        content: [
          {
            type: 'paragraph',
            text: 'You have the right to:'
          },
          {
            type: 'list',
            items: [
              'Access your personal information',
              'Correct inaccurate information',
              'Request deletion of your information',
              'Opt-out of marketing communications'
            ]
          }
        ]
      },
      {
        title: "7. Children's Privacy",
        content: [
          {
            type: 'paragraph',
            text: 'Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.'
          }
        ]
      },
      {
        title: '8. Changes to This Policy',
        content: [
          {
            type: 'paragraph',
            text: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.'
          }
        ]
      },
      {
        title: '9. Contact Us',
        content: [
          {
            type: 'paragraph_with_link',
            text: 'If you have any questions about this privacy policy, please contact us through our',
            linkText: 'contact page',
            linkUrl: '/contact'
          }
        ]
      }
    ],
    cookiePolicy: {
      title: 'Cookie Policy',
      content: [
        {
          type: 'paragraph',
          text: 'This website uses cookies to enhance your browsing experience. By continuing to use this site, you consent to our use of cookies in accordance with our privacy policy.'
        },
        {
          type: 'subtitle',
          text: 'Types of Cookies We Use:'
        },
        {
          type: 'list',
          items: [
            '<strong>Essential Cookies:</strong> Required for the website to function properly',
            '<strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website',
            '<strong>Functional Cookies:</strong> Remember your preferences and settings'
          ]
        },
        {
          type: 'paragraph',
          text: 'You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.'
        }
      ]
    }
  };

  ngOnInit() {
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }
}
