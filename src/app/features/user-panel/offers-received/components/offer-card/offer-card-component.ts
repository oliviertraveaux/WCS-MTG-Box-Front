import { Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, tap } from 'rxjs';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
import { GetTruncateTextPipe } from '../../../../../shared/collection/pipes/get-truncate-text.pipe';
import { OfferFullWantedCard } from '../../../../../shared/offer/models/offer-full-wanted-card.model';
import { BreakpointObserverService } from '../../../../../shared/services/breakpoint-observer.service';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { trackById } from '../../../../../shared/utils/track-by-utils';
import { fromUserCardToAdCardInfo } from '../../../shared/utils/offer.utils';
import { OfferWantedCardModalComponent } from '../../../ui/offer-wanted-card-modal/offer-wanted-card-modal.component';
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
    private readonly _dialog = inject(MatDialog);
    private readonly _userInfo = inject(UserInfoStatesService).getUserInfo();
    public readonly _breakpointService = inject(BreakpointObserverService);
    private readonly _router = inject(Router);

    @Input({ required: true }) offer!: OfferFullWantedCard;
    @Input() hasActionBar: boolean = true;
    @Input() hasDeleteButton: boolean = false;
    @Input() hasAcceptButton: boolean = false;
    @Input() hasValidateButton: boolean = false;

    protected readonly trackById = trackById;
    currentBreakpoints!: Observable<string[]>;
    limitOfCardsToDisplay$!: Observable<number>;
    arrayOfCardsToDisplay$!: Observable<UserCard[]>;
    badgeValue$!: Observable<string>;
    isMobile: boolean = false;

    ngOnInit(): void {
        this.currentBreakpoints = this._breakpointService.currentBreakpoints;
        this.limitOfCardsToDisplay$ = this.currentBreakpoints.pipe(
            tap(
                (currentBreakpoints) =>
                    (this.isMobile = !currentBreakpoints.includes(Breakpoints.Small))
            ),
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
        let dialogRef = this._dialog.open(OfferWantedCardModalComponent, {
            height: this.isMobile ? '90%' : undefined,
            minWidth: '375px',
        });
        let instance = dialogRef.componentInstance;
        instance.cardAdInfo = fromUserCardToAdCardInfo(this.offer.wantedUserCard);
    }

    getOfferRemoteUserName(offer: OfferFullWantedCard): string {
        if (this.getPage() === 'offers-received') {
            return offer.userName;
        }
        if (this.getPage() === 'offers-made') {
            return offer.wantedUserCard.userInfo.userName;
        }
        if (this.getPage() === 'history') {
            return offer.userId === this._userInfo.id
                ? offer.wantedUserCard.userInfo.userName
                : offer.userName;
        }
        return '';
    }

    private getPage(): string {
        const array = this._router.url.split('/');
        return array.length > 1 ? array[2] : 'offers-received';
    }
}
