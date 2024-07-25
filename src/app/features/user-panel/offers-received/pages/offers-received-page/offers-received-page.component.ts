import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, map, Observable, of, take, tap } from 'rxjs';
import { OfferFullWantedCard } from '../../../../../shared/offer/models/offer-full-wanted-card.model';
import { OfferService } from '../../../../../shared/offer/services/offer.service';
import { OfferStatesService } from '../../../../../shared/offer/services/offer.states.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { FilterOfferBarComponent } from '../../../ui/filter-bar/filter-offer-bar.component';
import { OfferCardComponent } from '../../components/offer-card/offer-card-component';

@Component({
    selector: 'app-offers-received-page',
    standalone: true,
    imports: [
        CommonModule,
        OfferCardComponent,
        MatChipsModule,
        FilterOfferBarComponent,
        TranslateModule,
    ],
    templateUrl: './offers-received-page.component.html',
    styleUrls: ['./offers-received-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersReceivedPageComponent implements OnInit {
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);
    private readonly _offerService = inject(OfferService);
    private readonly _offerStatesService = inject(OfferStatesService);
    private readonly _userId = inject(UserInfoStatesService).getUserInfo().id;
    private readonly _notificationService = inject(NotificationService);
    private readonly _destroyRef = inject(DestroyRef);

    offersReceived$: Observable<OfferFullWantedCard[]> = of([]);
    filtreredOffersReceived$: Observable<OfferFullWantedCard[]> = of([]);
    filter$: BehaviorSubject<string> = new BehaviorSubject('');
    mouseOrKeyBoardEvent$: Observable<MouseEvent> = this._notificationService.mouseOrKeyBoardEvent$;

    ngOnInit(): void {
        this.loadOffers();
        this.offersReceived$ = this._offerStatesService.getOffersReceived$();
        this.filtreredOffersReceived$ = combineLatest([this.offersReceived$, this.filter$]).pipe(
            map(([offers, filter]) => {
                return offers.filter((offer) =>
                    filter !== '' ? offer.status.toUpperCase() === filter.toUpperCase() : offer
                );
            })
        );
        this._notificationService.setOfferReceivedNotification(false);
        this.mouseOrKeyBoardEvent$
            .pipe(
                take(1),
                tap(() => this._notificationService.setOfferReceivedNotification(false))
            )
            .subscribe();
    }

    loadOffers(): void {
        !this._offerStatesService.getIsOffersReceivedLoadedValue()
            ? this._offerService.getOffersReceived(this._userId)
            : null;
    }

    filterBy(status: string): void {
        this.filter$.next(status);
        this._changeDetectorRef.detectChanges();
    }
}
