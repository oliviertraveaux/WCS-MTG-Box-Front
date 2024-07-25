import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { GetQualityClassPipe } from '../../../../../shared/collection/pipes/get-quality.pipe';
import { GetRarityClassPipe } from '../../../../../shared/collection/pipes/get-rarity-class.pipe';
import { GetRaritySymbolPipe } from '../../../../../shared/collection/pipes/get-rarity-symbol.pipe';
import { BreakpointObserverService } from '../../../../../shared/services/breakpoint-observer.service';
import { CardAdInfo } from '../../models/card-ad-info';

@Component({
    selector: 'app-card-ad-info',
    standalone: true,
    imports: [
        CommonModule,
        NgOptimizedImage,
        MatListModule,
        TranslateModule,
        GetRaritySymbolPipe,
        GetRarityClassPipe,
        MatCardModule,
        MatButtonModule,
        GetQualityClassPipe,
    ],
    templateUrl: './card-ad-card-info.component.html',
    styleUrls: ['./card-ad-card-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAdCardInfoComponent {
    @Input() cardAdInfo!: CardAdInfo;
    @Input() isCardAdWantedCard: boolean = true;

    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);

    readonly isDesktop = this._breakpointObserverService.isDesktop;

    ngOnInit() {
        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());
    }
}
