import { Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
import { GetTruncateTextPipe } from '../../../../../shared/collection/pipes/get-truncate-text.pipe';
import { OfferFullWantedCard } from '../../../../../shared/offer/models/offer-full-wanted-card.model';
import { OfferService } from '../../../../../shared/offer/services/offer.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { BreakpointObserverService } from '../../../../../shared/services/breakpoint-observer.service';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { trackById } from '../../../../../shared/utils/track-by-utils';
import { CardAdCardInfoComponent } from '../../../../transaction/card-ad/components/card-ad-card-info/card-ad-card-info.component';
import { fromUserCardToAdCardInfo } from '../../../shared/utils/offer.utils';
import { OfferCardActionsComponent } from '../offer-card-actions/offer-card-actions.component';

@Component({
    selector: 'offer-card',
    templateUrl: './offer-card-component.html',
    styleUrls: ['./offer-card-component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatBadgeModule,
        MatButtonModule,
        MatListModule,
        NgIf,
        DatePipe,
        GetTruncateTextPipe,
        MatCardModule,
        AsyncPipe,
        NgOptimizedImage,
        NgForOf,
        OfferCardActionsComponent,
    ],
})
export class OfferCardComponent implements OnInit {
    private readonly _alertService = inject(AlertService);
    private readonly _offerService = inject(OfferService);
    private readonly _dialog = inject(MatDialog);
    private readonly _userInfo = inject(UserInfoStatesService).getUserInfo();
    public readonly _breakpointService = inject(BreakpointObserverService);
    private readonly _translate = inject(TranslateService);

    @Input({ required: true }) offer!: OfferFullWantedCard;
    @Input() hasActionBar: boolean = true;

    protected readonly trackById = trackById;
    currentBreakpoints!: Observable<string[]>;
    limitOfCardsToDisplay$!: Observable<number>;
    arrayOfCardsToDisplay$!: Observable<UserCard[]>;
    badgeValue$!: Observable<string>;

    ngOnInit(): void {
        this.currentBreakpoints = this._breakpointService.currentBreakpoints;
        this.limitOfCardsToDisplay$ = this.currentBreakpoints.pipe(
            map((currentBreakpoints) => {
                if (currentBreakpoints.includes(Breakpoints.XLarge)) {
                    return this.offer.userCards.length < 5 ? this.offer.userCards.length : 5;
                } else if (currentBreakpoints.includes(Breakpoints.Large)) {
                    return this.offer.userCards.length < 4 ? this.offer.userCards.length : 4;
                } else if (currentBreakpoints.includes(Breakpoints.Small)) {
                    return this.offer.userCards.length < 3 ? this.offer.userCards.length : 3;
                } else return 1;
            })
        );

        this.arrayOfCardsToDisplay$ = this.limitOfCardsToDisplay$.pipe(
            map((limit) => this.offer.userCards.slice(0, limit))
        );

        this.badgeValue$ = this.limitOfCardsToDisplay$.pipe(
            map((value) => '+' + (this.offer.userCards.length - value))
        );
    }

    openWantedCardDetailDialog(): void {
        let dialogRef = this._dialog.open(CardAdCardInfoComponent, {
            width: '90%',
        });
        let instance = dialogRef.componentInstance;
        instance.cardAdInfo = fromUserCardToAdCardInfo(this.offer.wantedUserCard, this._userInfo);
    }
}
