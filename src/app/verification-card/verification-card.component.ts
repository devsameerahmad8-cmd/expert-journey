import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../card.service';

@Component({
  selector: 'app-verification-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification-card.component.html',
  styleUrl: './verification-card.component.css'
})
export class VerificationCardComponent {
  private cardService = inject(CardService);
  card$ = this.cardService.card$;
}
