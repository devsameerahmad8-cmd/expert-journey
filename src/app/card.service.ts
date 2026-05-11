import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface CustomsCard {
  port: string;
  cardTitle: string;
  cardNumber: string;
  date: string;
  vehicleType: string;
  status: string;
  makeYear: string;
  capacity: string;
  sourceCountry: string;
  enginePower: string;
  baseNumber: string;
  weight: string;
  engineNumber: string;
  ownerName: string;
  color: string;
  declarationNumber: string;
  declarationDate: string;
  nationality: string;
  address: string;
  plateNumber: string;
  notes: string;
}

const STORAGE_KEY = 'zatca-customs-card';

@Injectable({ providedIn: 'root' })
export class CardService {
  private http = inject(HttpClient);
  private cardSubject = new BehaviorSubject<CustomsCard | null>(null);

  readonly card$: Observable<CustomsCard | null> = this.cardSubject.asObservable();

  constructor() {
    this.load();
  }

  /**
   * Loads the card. Reads from localStorage first (where /form writes its
   * edits); if nothing's been saved yet, falls back to the seed JSON in
   * assets/card-data.json so the page renders out of the box.
   */
  private load(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        this.cardSubject.next(JSON.parse(stored) as CustomsCard);
        return;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    this.http.get<CustomsCard>('assets/card-data.json')
      .pipe(catchError(() => of(null)))
      .subscribe(data => this.cardSubject.next(data));
  }

  save(card: CustomsCard): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
    this.cardSubject.next(card);
  }

  reset(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.load();
  }

  /**
   * Triggers a browser download of the current card as card-data.json — drop
   * the downloaded file over src/assets/card-data.json to make these the new
   * defaults (since the browser cannot write directly to disk).
   */
  download(card: CustomsCard): void {
    const blob = new Blob([JSON.stringify(card, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'card-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
