import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink {
  label: string;
  href: string;
}

interface NavSection {
  label: string;
  href: string;
  children: NavLink[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sections: NavSection[] = [
    {
      label: 'عن الهيئة',
      href: 'https://zatca.gov.sa/ar/AboutUs/Pages/AboutZATCA.aspx',
      children: [
        { label: 'عن الهيئة', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/AboutZATCA.aspx' },
        { label: 'الهيكل التنظيمي', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/Organizational-Structure.aspx' },
        { label: 'تنظيم هيئة الزكاة والضريبة والجمارك', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/Statute-of-ZATCA.aspx' },
        { label: 'كلمة معالي المحافظ', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/Message.aspx' },
        { label: 'أعضاء مجلس الإدارة', href: 'https://zatca.gov.sa/ar/AboutUs/BoardMembers/Pages/default.aspx' },
        { label: 'أعضاء اللجنة الشرعية', href: 'https://zatca.gov.sa/ar/AboutUs/ShariaMembers/Pages/default.aspx' },
        { label: 'قيادات الهيئة', href: 'https://zatca.gov.sa/ar/AboutUs/ZATCALeadership/' },
        { label: 'اللجنة الاستشارية', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/AdvisoryCommittee.aspx' },
        { label: 'شركاؤنا', href: 'https://zatca.gov.sa/ar/AboutUs/OurPartners/' },
        { label: 'السياسات والاستراتيجيات والتزامات الخدمة', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/Policies-Strategies-and-Service-Commitments.aspx' },
        { label: 'المنافسات والمشتريات', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/Procurement-and-Tenders.aspx' },
        { label: 'أهداف التنمية المستدامة', href: 'https://zatca.gov.sa/ar/AboutUs/Pages/Sustainable-Development-Goals.aspx' },
        { label: 'المشاركة الإلكترونية', href: 'https://zatca.gov.sa/ar/e-participation/Pages/default.aspx' },
        { label: 'البيانات المفتوحة', href: 'https://zatca.gov.sa/ar/e-participation/PublicData/' },
        { label: 'إحصائيات الهيئة', href: 'https://zatca.gov.sa/ar/e-participation/Pages/website-service-statistics.aspx' },
        { label: 'برامج حديثي التخرج', href: 'https://zatca.gov.sa/ar/AboutUs/graduation-programs/Pages/default.aspx' },
        { label: 'انضم إلينا', href: 'https://careers.zatca.gov.sa/?locale=ar_SA' },
        { label: 'اتصل بنا', href: 'https://zatca.gov.sa/ar/Contactus/' }
      ]
    },
    {
      label: 'الخدمات الإلكترونية',
      href: 'https://zatca.gov.sa/ar/eServices/',
      children: [
        { label: 'الخدمات الزكوية والضريبية والجمركية', href: 'https://zatca.gov.sa/ar/eServices/Pages/default.aspx' },
        { label: 'منصة زكاتي "زكاة الأفراد الاختيارية"', href: 'https://zakaty.zatca.gov.sa/' },
        { label: 'المزادات الإلكترونية', href: 'https://auction.zatca.gov.sa/' }
      ]
    },
    {
      label: 'الأنظمة واللوائح',
      href: 'https://zatca.gov.sa/ar/RulesRegulations/Pages/rules.aspx',
      children: [
        { label: 'الزكاة والجمارك والأنظمة الضريبية', href: 'https://zatca.gov.sa/ar/RulesRegulations/Taxes/' },
        { label: 'الاتفاقيات الضريبية والجمركية', href: 'https://zatca.gov.sa/ar/RulesRegulations/Agreements' },
        { label: 'بوابة تبادل المعلومات', href: 'https://zatca.gov.sa/ar/RulesRegulations/InformationExchange' }
      ]
    },
    {
      label: 'التواصل الإعلامي',
      href: 'https://zatca.gov.sa/ar/MediaCenter/',
      children: [
        { label: 'الأخبار', href: 'https://zatca.gov.sa/ar/MediaCenter/News/' },
        { label: 'المنافسات والفرص الاستثمارية', href: 'https://zatca.gov.sa/ar/MediaCenter/Elan/' },
        { label: 'أحدث الإصدارات', href: 'https://zatca.gov.sa/ar/MediaCenter/Publications/' },
        { label: 'مجلة الهيئة', href: 'https://zatca.gov.sa/ar/MediaCenter/Magazine/' },
        { label: 'الفعاليات وورش العمل', href: 'https://zatca.gov.sa/ar/MediaCenter/Events/' },
        { label: 'طلب ورشة عمل', href: 'https://zatca.gov.sa/ar/MediaCenter/WorkshopRequest/' },
        { label: 'هوية الهيئة', href: 'https://zatca.gov.sa/ar/MediaCenter/Authorityidentity/' },
        { label: 'النشرة البريدية', href: 'https://zatca.gov.sa/ar/MediaCenter/NewsLetters/' }
      ]
    },
    {
      label: 'مركز المعرفة',
      href: 'https://zatca.gov.sa/ar/HelpCenter/',
      children: [
        { label: 'الأدلة والإرشادات', href: 'https://zatca.gov.sa/ar/HelpCenter/guidelines/' },
        { label: 'رحلة المستفيد', href: 'https://zatca.gov.sa/ar/HelpCenter/CustomerJourney' },
        { label: 'الأسئلة الشائعة', href: 'https://zatca.gov.sa/ar/HelpCenter/FAQs/' },
        { label: 'أكاديمية الزكاة والضريبة والجمارك', href: 'https://zatca.gov.sa/ar/HelpCenter/Pages/ZatcaAcademy.aspx' },
        { label: 'قواعد السوق', href: 'https://zatca.gov.sa/ar/HelpCenter/Pages/Standards.aspx' },
        { label: 'الحقيبة التوعوية', href: 'https://zatca.gov.sa/ar/HelpCenter/AwarenessToolkit/' },
        { label: 'منصة البنود الزكوية', href: 'https://zatca.gov.sa/ar/HelpCenter/ZakatItems/' },
        { label: 'منصة أســـهـــمــت', href: 'https://zatca.gov.sa/ar/HelpCenter/ashmt/Pages/default.aspx' },
        { label: 'المشغل الاقتصادي السعودي المعتمد', href: 'https://zatca.gov.sa/ar/HelpCenter/AEO/' }
      ]
    }
  ];

  openSectionIndex: number | null = null;

  toggleSection(idx: number): void {
    this.openSectionIndex = this.openSectionIndex === idx ? null : idx;
  }
}
