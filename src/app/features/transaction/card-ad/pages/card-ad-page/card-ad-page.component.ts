import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-ad-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-ad-page.component.html',
  styleUrls: ['./card-ad-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardAdPageComponent {

}
