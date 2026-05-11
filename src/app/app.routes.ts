import { Routes } from '@angular/router';

import { VerificationCardComponent } from './verification-card/verification-card.component';
import { CardFormComponent } from './card-form/card-form.component';

/**
 * Two routes:
 *   ''     - public verification view
 *   'form' - hidden admin form (no UI links anywhere; reachable only by URL)
 * If you ever want to gate the form behind a password, add a CanActivate guard
 * to the 'form' route — but right now the obscurity *is* the access control.
 */
export const routes: Routes = [
  { path: '', component: VerificationCardComponent },
  { path: 'form', component: CardFormComponent },
  { path: '**', redirectTo: '' }
];
