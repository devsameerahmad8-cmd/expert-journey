import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import QRCode from 'qrcode';
import { BehaviorSubject, Subscription } from 'rxjs';

import { CardService, CustomsCard } from '../card.service';

@Component({
  selector: 'app-verification-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification-card.component.html',
  styleUrl: './verification-card.component.css'
})
export class VerificationCardComponent implements OnDestroy {
  private cardService = inject(CardService);
  private route = inject(ActivatedRoute);
  private sub: Subscription;

  qrDataUrl = '';
  /** Only set when this page was opened via a verification link / QR. */
  private cardSubject = new BehaviorSubject<CustomsCard | null>(null);
  card$ = this.cardSubject.asObservable();

  constructor() {
    this.sub = this.route.queryParamMap.subscribe(params => {
      const encoded = params.get('e');
      const id = params.get('id');

      let entry: CustomsCard | null = this.cardService.entryFromParam(encoded);

      // Same-browser fallback: short ?id= link when the entry was saved here
      if (!entry && id) {
        entry = this.cardService.getEntryById(id);
      }

      this.cardSubject.next(entry);
      this.qrDataUrl = '';
      if (entry) {
        void this.generateQr(entry);
      }
      // Form → verify navigation can keep the form's scroll offset
      queueMicrotask(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * QR encodes only the public verification URL for this entry — no login
   * details, no form credentials. Scanning opens this same verification page
   * with that entry's data.
   */
  private async generateQr(card: CustomsCard): Promise<void> {
    const url = this.cardService.verificationUrl(card);
    this.qrDataUrl = await QRCode.toDataURL(url, {
      width: 180,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#101820', light: '#ffffff' }
    });
  }
}
