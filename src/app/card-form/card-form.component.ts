import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { CardService, CustomsCard } from '../card.service';

interface FieldDef {
  name: keyof CustomsCard;
  label: string;
  type?: 'text' | 'textarea';
}

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent {
  private fb = inject(FormBuilder);
  private cardService = inject(CardService);
  private router = inject(Router);

  fields: FieldDef[] = [
    { name: 'cardTitle',         label: 'عنوان البطاقة' },
    { name: 'port',              label: 'المنفذ' },
    { name: 'cardNumber',        label: 'رقم البطاقة' },
    { name: 'date',              label: 'التاريخ' },
    { name: 'vehicleType',       label: 'نوع المركبة (الشكل)' },
    { name: 'status',            label: 'حالة المركبة' },
    { name: 'makeYear',          label: 'سنة الصنع' },
    { name: 'capacity',          label: 'حمولة' },
    { name: 'sourceCountry',     label: 'بلد الصنع' },
    { name: 'enginePower',       label: 'قوة المحرك' },
    { name: 'baseNumber',        label: 'رقم القاعدة' },
    { name: 'weight',            label: 'الوزن' },
    { name: 'engineNumber',      label: 'رقم المحرك' },
    { name: 'ownerName',         label: 'اسم المستورد / المالك' },
    { name: 'color',             label: 'اللون' },
    { name: 'declarationNumber', label: 'رقم البيان الجمركي' },
    { name: 'declarationDate',   label: 'تاريخه' },
    { name: 'nationality',       label: 'جنسية المالك' },
    { name: 'address',           label: 'محل اقامته' },
    { name: 'plateNumber',       label: 'لوحة مؤقتة' },
    { name: 'notes',             label: 'ملاحظات السيارة', type: 'textarea' }
  ];

  form = this.buildForm();

  saved = false;

  constructor() {
    this.cardService.card$.pipe(take(2)).subscribe(card => {
      if (card) {
        this.form.patchValue(card as unknown as Record<string, string>);
      }
    });
  }

  private buildForm() {
    const controls: Record<string, [string, unknown?]> = {};
    for (const f of this.fields) {
      controls[f.name] = ['', f.name === 'cardTitle' ? Validators.required : undefined];
    }
    return this.fb.group(controls);
  }

  private currentCard(): CustomsCard {
    return this.form.getRawValue() as unknown as CustomsCard;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cardService.save(this.currentCard());
    this.saved = true;
    setTimeout(() => (this.saved = false), 2500);
  }

  download(): void {
    this.cardService.download(this.currentCard());
  }

  reset(): void {
    if (!confirm('Reset to defaults from card-data.json? Local edits will be lost.')) {
      return;
    }
    this.cardService.reset();
    this.cardService.card$.pipe(take(2)).subscribe(card => {
      if (card) this.form.patchValue(card as unknown as Record<string, string>);
    });
  }

  viewCard(): void {
    this.save();
    this.router.navigateByUrl('/');
  }
}
