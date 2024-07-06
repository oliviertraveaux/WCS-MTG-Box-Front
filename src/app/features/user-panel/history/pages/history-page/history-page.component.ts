import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { OfferFullWantedCard } from '../../../../../shared/offer/models/offer-full-wanted-card.model';
import { OfferService } from '../../../../../shared/offer/services/offer.service';
import { OfferStatesService } from '../../../../../shared/offer/services/offer.states.service';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { OfferCardComponent } from '../../../offers-received/components/offer-card/offer-card-component';
import { FilterOfferBarComponent } from '../../../ui/filter-bar/filter-offer-bar.component';
import { FilterOfferHistoryBarComponent } from '../../../ui/filter-bar/filter-offer-history-bar/filter-offer-history-bar.component';

@Component({
    selector: 'app-history-page',
    standalone: true,
    imports: [
        CommonModule,
        FilterOfferBarComponent,
        OfferCardComponent,
        TranslateModule,
        FilterOfferHistoryBarComponent,
    ],
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private readonly _offerService = inject(OfferService);
    private readonly _offerStatesService = inject(OfferStatesService);
    private readonly _userId = inject(UserInfoStatesService).getUserInfo().id;

    offersHistory$: Observable<OfferFullWantedCard[]> = of([]);
    filteredOffersHistory$: Observable<OfferFullWantedCard[]> = of([]);
    filter$: BehaviorSubject<string> = new BehaviorSubject('');

    ngOnInit(): void {
        this.loadOffers();
        this.offersHistory$ = this._offerStatesService.getOffersHistory$();
        this.filteredOffersHistory$ = combineLatest([this.offersHistory$, this.filter$]).pipe(
            map(([offers, filter]) => {
                return this.filterOffers(offers, filter);
            })
        );
    }

    loadOffers(): void {
        !this._offerStatesService.getIsOffersHistoryLoadedValue()
            ? this._offerService.getOffersHistory(this._userId)
            : null;
    }

    filterBy(status: string): void {
        this.filter$.next(status);
        this._changeDetectorRef.detectChanges();
    }

    private filterOffers(offers: OfferFullWantedCard[], filter: string): OfferFullWantedCard[] {
        if (filter === 'received') {
            return offers.filter((offer) => offer.userId !== this._userId);
        }
        if (filter === 'made') {
            return offers.filter((offer) => offer.userId === this._userId);
        }
        return offers;
    }
}
