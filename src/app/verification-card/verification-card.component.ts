import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import QRCode from 'qrcode';
import { map } from 'rxjs/operators';

import { CardService, CustomsCard } from '../card.service';

@Component({
  selector: 'app-verification-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification-card.component.html',
  styleUrl: './verification-card.component.css'
})
export class VerificationCardComponent {
  private cardService = inject(CardService);

  qrDataUrl = '';
  card$ = this.cardService.card$.pipe(
    map(card => {
      if (card) void this.generateQr(card);
      return card;
    })
  );

  private async generateQr(card: CustomsCard): Promise<void> {
    const payload = JSON.stringify({
      cardNumber: card.cardNumber,
      declarationNumber: card.declarationNumber,
      baseNumber: card.baseNumber,
      plateNumber: card.plateNumber,
      entryRevision: card.entryRevision ?? '',
      verificationUrl: `${window.location.origin}/`
    });

    this.qrDataUrl = await QRCode.toDataURL(payload, {
      width: 180,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#101820', light: '#ffffff' }
    });
  }
}
