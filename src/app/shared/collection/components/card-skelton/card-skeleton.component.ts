import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-card-skelton',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card-skeleton.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSkeletonComponent {}
