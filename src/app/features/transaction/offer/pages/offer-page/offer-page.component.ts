import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offer-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferPageComponent {

}
