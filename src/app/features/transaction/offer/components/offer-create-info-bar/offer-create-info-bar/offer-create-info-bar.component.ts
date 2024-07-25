import { Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';
import { GetQualityAbbreviationPipe } from '../../../../../../shared/collection/pipes/get-quality-abbreviation.pipe';
import { BreakpointObserverService } from '../../../../../../shared/services/breakpoint-observer.service';
import { UserInfo } from '../../../../../../shared/user/models/user-info.interface';
import { OfferWantedCardModalComponent } from '../../../../../user-panel/ui/offer-wanted-card-modal/offer-wanted-card-modal.component';
import { CardAdInfo } from '../../../../card-ad/models/card-ad-info';

@Component({
    selector: 'app-offer-create-info-bar',
    standalone: true,
    imports: [CommonModule, GetQualityAbbreviationPipe, RouterLink, TranslateModule],
    templateUrl: './offer-create-info-bar.component.html',
    styleUrls: ['./offer-create-info-bar.component.scss'],
})
export class OfferCreateInfoBarComponent implements OnInit {
    private _dialog = inject(MatDialog);
    public readonly _breakpointService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);

    @Input({ required: true }) cardAd!: CardAdInfo | null;
    @Input({ required: true }) cardOwner!: UserInfo | null;

    currentBreakpoints!: Observable<string[]>;
    isMobile: boolean = false;

    ngOnInit() {
        this.currentBreakpoints = this._breakpointService.currentBreakpoints;
        this.currentBreakpoints
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                tap(
                    (currentBreakpoints) =>
                        (this.isMobile = !currentBreakpoints.includes(Breakpoints.Small))
                )
            )
            .subscribe();
    }

    openCardAdInfoDialog(): void {
        let dialogRef = this._dialog.open(OfferWantedCardModalComponent, {
            height: this.isMobile ? '90%' : undefined,
            minWidth: '375px',
        });
        let instance = dialogRef.componentInstance;
        instance.cardAdInfo = this.cardAd!;
    }
}
