import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  /** Unique id for this saved entry — drives its verification link / QR. */
  entryRevision?: string;
}

const STORAGE_KEY = 'zatca-customs-card';
const ENTRIES_KEY = 'zatca-customs-entries';

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
   * assets/card-data.json so the form can be edited out of the box.
   * The public verification page does not use this stream for display —
   * it only shows an entry when opened via its verification link / QR.
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

  /**
   * Saves a new entry with a fresh unique id. Each save creates its own
   * verification link and QR; previous entries remain addressable by id.
   */
  save(card: CustomsCard): CustomsCard {
    const revision = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const entry: CustomsCard = { ...card, entryRevision: revision };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    this.persistEntry(entry);
    this.cardSubject.next(entry);
    return entry;
  }

  reset(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.load();
  }

  /**
   * Public verification URL for an entry. The URL carries the entry payload
   * so anyone with the link (or QR) can view it with no login. It never
   * includes form credentials or other login details.
   */
  verificationUrl(entry: CustomsCard): string {
    const encoded = this.encodeEntry(entry);
    // Always target the root verification page (never /form), unique per entry
    return `${window.location.origin}/?e=${encoded}`;
  }

  /** Decode an entry from the `e` query param. Returns null if invalid. */
  entryFromParam(encoded: string | null | undefined): CustomsCard | null {
    if (!encoded) return null;
    return this.decodeEntry(encoded);
  }

  /** Look up a previously saved entry by id (same browser). */
  getEntryById(id: string): CustomsCard | null {
    const entries = this.readEntries();
    return entries[id] ?? null;
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

  encodeEntry(entry: CustomsCard): string {
    const json = JSON.stringify(entry);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  decodeEntry(encoded: string): CustomsCard | null {
    try {
      const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
      const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
      const binary = atob(padded);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const parsed = JSON.parse(new TextDecoder().decode(bytes)) as CustomsCard;
      if (!parsed || typeof parsed !== 'object') return null;
      return parsed;
    } catch {
      return null;
    }
  }

  private persistEntry(entry: CustomsCard): void {
    if (!entry.entryRevision) return;
    const entries = this.readEntries();
    entries[entry.entryRevision] = entry;
    try {
      localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
    } catch {
      // Quota exceeded — keep the latest single-card key; verification still
      // works via the encoded URL for anyone who has the QR / link.
    }
  }

  private readEntries(): Record<string, CustomsCard> {
    try {
      const raw = localStorage.getItem(ENTRIES_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw) as Record<string, CustomsCard>;
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }
}
