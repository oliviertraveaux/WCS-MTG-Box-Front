import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, map, Observable, of, take, tap } from 'rxjs';
import { OfferFullWantedCard } from '../../../../../shared/offer/models/offer-full-wanted-card.model';
import { OfferService } from '../../../../../shared/offer/services/offer.service';
import { OfferStatesService } from '../../../../../shared/offer/services/offer.states.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { OfferCardComponent } from '../../../offers-received/components/offer-card/offer-card-component';
import { FilterOfferBarComponent } from '../../../ui/filter-bar/filter-offer-bar.component';

@Component({
    selector: 'app-offers-made-page',
    standalone: true,
    imports: [CommonModule, FilterOfferBarComponent, OfferCardComponent, TranslateModule],
    templateUrl: './offers-made-page.component.html',
    styleUrls: ['./offers-made-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersMadePageComponent implements OnInit {
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);
    private readonly _offerService = inject(OfferService);
    private readonly _offerStatesService = inject(OfferStatesService);
    private readonly _userId = inject(UserInfoStatesService).getUserInfo().id;
    private readonly _notificationService = inject(NotificationService);
    private readonly _destroyRef = inject(DestroyRef);

    offersMade$: Observable<OfferFullWantedCard[]> = of([]);
    filtreredOffersMade$: Observable<OfferFullWantedCard[]> = of([]);
    filter$: BehaviorSubject<string> = new BehaviorSubject('');
    mouseOrKeyBoardEvent$: Observable<MouseEvent> = this._notificationService.mouseOrKeyBoardEvent$;

    ngOnInit(): void {
        this.loadOffers();
        this.offersMade$ = this._offerStatesService.getOffersMade$();
        this.filtreredOffersMade$ = combineLatest([this.offersMade$, this.filter$]).pipe(
            map(([offers, filter]) => {
                return offers.filter((offer) =>
                    filter !== '' ? offer.status.toUpperCase() === filter.toUpperCase() : offer
                );
            })
        );
        this._notificationService.setOfferMadeNotification(false);
        this.mouseOrKeyBoardEvent$
            .pipe(
                take(1),
                tap(() => this._notificationService.setOfferMadeNotification(false))
            )
            .subscribe();
    }

    loadOffers(): void {
        !this._offerStatesService.getIsOffersMadeLoadedValue()
            ? this._offerService.getOffersMade(this._userId)
            : null;
    }

    filterBy(status: string): void {
        this.filter$.next(status);
        this._changeDetectorRef.detectChanges();
    }
}
