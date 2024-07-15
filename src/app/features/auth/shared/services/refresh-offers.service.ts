import { inject, Injectable } from '@angular/core';
import { isNil } from 'lodash-es';
import {
    combineLatest,
    filter,
    map,
    merge,
    Observable,
    pairwise,
    race,
    switchMap,
    takeUntil,
    tap,
    timer,
} from 'rxjs';
import { UserCard } from '../../../../shared/collection/models/user-card.model';
import { CollectionCardsStateService } from '../../../../shared/collection/services/collection-cards-state.service';
import { CollectionCardsService } from '../../../../shared/collection/services/collection-cards.service';
import { OfferService } from '../../../../shared/offer/services/offer.service';
import { UserInfo } from '../../../../shared/user/models/user-info.interface';
import { UserInfoStatesService } from '../../../../shared/user/services/user-info-states.service';

@Injectable({
    providedIn: 'root',
})
export class RefreshOffersService {
    private readonly _userInfoStatesService = inject(UserInfoStatesService);
    private readonly _collectionCardsStateService = inject(CollectionCardsStateService);
    private readonly _collectionCardsService = inject(CollectionCardsService);
    private readonly _offerService = inject(OfferService);

    // We don't refresh offers for users that are not active, banned or not connected
    public isUserEligible$: Observable<boolean> = this._userInfoStatesService
        .getUserInfo$()
        .pipe(map((u: UserInfo) => !!u.id && u.isActive && !u.isBanned));

    // Used with race, we use the collection value if already loaded
    public isUserCollectionLoadedWithCards$: Observable<boolean> = this._collectionCardsStateService
        .getCards$()
        .pipe(
            filter((cards: UserCard[]) => !isNil(cards) && cards.length > 0),
            map(() => true)
        );

    // Used with race, we make a call if collection is not loaded
    public isUserCollectionEmpty$: Observable<boolean> = this._collectionCardsService
        .getCollectionCards$(this._userInfoStatesService.getUserInfo().id)
        .pipe(
            filter((cards: UserCard[]) => !isNil(cards) && cards.length > 0),
            map(() => true)
        );

    public hasUserCollection$: Observable<boolean> = race(
        this.isUserCollectionEmpty$,
        this.isUserCollectionLoadedWithCards$
    );

    // If all conditions are met, we refresh offers made and offers received with latest value every minute until stopRefreshOffers$ emits
    public refreshData$: Observable<number> = combineLatest([
        this.isUserEligible$,
        this.hasUserCollection$,
    ]).pipe(
        filter(([isEligible, hasCollection]) => isEligible && hasCollection),
        switchMap(() =>
            timer(0, 60000).pipe(
                takeUntil(this.stopRefreshOffers$),
                tap(() => {
                    this._offerService.getOffersMade(this._userInfoStatesService.getUserInfo().id);
                    this._offerService.getOffersReceived(
                        this._userInfoStatesService.getUserInfo().id
                    );
                })
            )
        )
    );

    // We stop refreshing offers if collection as been emptied
    public hasUserCollectionBeenEmptied$: Observable<boolean> = this._collectionCardsStateService
        .getCards$()
        .pipe(
            pairwise(),
            filter(([prev, curr]) => {
                return !!prev.length && !curr.length;
            }),
            map(() => true)
        );

    // We stop refreshing offers if user state has been deconnected, banned or inactive
    public hasUserStateChanged$: Observable<boolean> = this._userInfoStatesService
        .getUserInfo$()
        .pipe(
            pairwise(),
            filter(([prev, curr]) => {
                return (
                    !!prev.id &&
                    prev.isActive &&
                    !prev.isBanned &&
                    (!curr.id || !curr.isActive || curr.isBanned)
                );
            }),
            map(() => true)
        );

    public stopRefreshOffers$: Observable<boolean> = merge(
        this.hasUserStateChanged$,
        this.hasUserCollectionBeenEmptied$
    );
}
