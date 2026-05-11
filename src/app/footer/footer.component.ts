import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FooterColumn {
  heading: string;
  links: { label: string; href: string; target?: string }[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  columns: FooterColumn[] = [
    {
      heading: 'الهيئة',
      links: [
        { label: 'عن الهيئة', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/AboutZATCA.aspx' },
        { label: 'انضم إلينا', href: 'https://careers.zatca.gov.sa/?locale=ar_SA' },
        { label: 'الفوترة الإلكترونية', href: 'https://zatca.gov.sa/ar/E-Invoicing' },
        { label: 'المشاركة الإلكترونية', href: 'https://zatca.gov.sa/ar/e-participation/Pages/default.aspx' },
        { label: 'البيانات المفتوحة', href: 'https://zatca.gov.sa/ar/e-participation/PublicData/' },
        { label: 'سياسة أمن المعلومات', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/Information-Security-Policy.aspx' },
        { label: 'سياسة إخلاء المسؤولية', href: 'https://zatca.gov.sa/ar/Pages/Disclaimer-Policy.aspx' },
        { label: 'اتفاقية مستوى الخدمة', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/ZATCA-SLA.aspx' },
        { label: 'ميثاق المتعاملين', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/Customer-Charter.aspx', target: '_blank' }
      ]
    },
    {
      heading: 'التواصل الإعلامي',
      links: [
        { label: 'الأخبار والإعلانات', href: 'https://zatca.gov.sa/ar/MediaCenter/News/' },
        { label: 'الإصدارات', href: 'https://zatca.gov.sa/ar/MediaCenter/Publications/' },
        { label: 'المجلة', href: 'https://zatca.gov.sa/ar/MediaCenter/Magazine/' },
        { label: 'الفعاليات', href: 'https://zatca.gov.sa/ar/MediaCenter/Events/' },
        { label: 'هوية الهيئة', href: 'https://zatca.gov.sa/ar/MediaCenter/Authorityidentity/' }
      ]
    },
    {
      heading: 'الدعم والمساعدة',
      links: [
        { label: 'اتصل بنا', href: 'https://zatca.gov.sa/ar/contactus/Pages/default.aspx' },
        { label: 'طلبات المساعدة والدعم', href: 'https://zatca.gov.sa/ar/ContactUs/ContactRequests/' },
        { label: 'الأسئلة الشائعة', href: 'https://zatca.gov.sa/ar/HelpCenter/FAQs/Pages/FAQArchiveEservices.aspx' },
        { label: 'معجم الزكاة والضريبة والجمارك', href: 'https://zatca.gov.sa/ar/MediaCenter/Publications/Documents/معجم الزكاة والضريبة والجمارك.pdf' },
        { label: 'إمكانية الوصول', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/Accessibility.aspx' }
      ]
    },
    {
      heading: 'روابط مهمة',
      links: [
        { label: 'بوابة البيانات المفتوحة', href: 'https://open.data.gov.sa/ar/home', target: '_blank' },
        { label: 'المنصة الوطنية', href: 'https://my.gov.sa/ar', target: '_blank' },
        { label: 'منصة تفاعل', href: 'https://eparticipation.my.gov.sa/', target: '_blank' },
        { label: 'منصة الاستشارات العامة', href: 'https://istitlaa.ncc.gov.sa/ar/Pages/default.aspx', target: '_blank' },
        { label: 'منصة الخدمات المالية (اعتماد)', href: 'https://portal.etimad.sa/', target: '_blank' },
        { label: 'هيئة الخبراء بمجلس الوزراء', href: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/667e9149-19e3-451e-9212-ad2e0091def9/1', target: '_blank' },
        { label: 'الإبلاغ عن فساد (نزاهة)', href: 'https://my.gov.sa/ar/content/report-corruption', target: '_blank' }
      ]
    }
  ];

  socials = [
    { title: 'Twitter', href: 'https://twitter.com/zatca_sa', icon: 'assets/images/icons/x.svg' },
    { title: 'Instagram', href: 'https://www.instagram.com/zatca_sa/', icon: 'assets/images/icons/insta.svg' },
    { title: 'LinkedIn', href: 'https://www.linkedin.com/company/zatca_sa/', icon: 'assets/images/icons/linkedin.svg' },
    { title: 'Youtube', href: 'https://www.youtube.com/zatcasa', icon: 'assets/images/icons/youtube.svg' }
  ];

  bottomLinks = [
    { label: 'سياسة الخصوصية', href: 'https://zatca.gov.sa/ar/Pages/PrivacyPolicy.aspx' },
    { label: 'شروط الإستخدام', href: 'https://zatca.gov.sa/ar/Pages/Terms.aspx' },
    { label: 'خريطة الموقع', href: 'https://zatca.gov.sa/ar/PortalServices/Pages/SiteMap.aspx' }
  ];
}
