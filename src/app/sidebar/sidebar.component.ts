import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SideNavItem {
  label: string;
  href: string;
  selected?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  navItems: SideNavItem[] = [
    { label: 'خدمات عامة', href: '#general', selected: true },
    { label: 'الأستعلامات', href: '#inquiries' },
    { label: 'خدمات الأفراد', href: '#individuals' }
  ];

  open = false;

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }
}
