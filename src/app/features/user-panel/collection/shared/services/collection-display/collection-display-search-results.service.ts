import { inject, Injectable } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { CollectionCardsStateService } from '../../../../../../shared/collection/services/collection-cards-state.service';
import { CollectionCardsService } from '../../../../../../shared/collection/services/collection-cards.service';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { UserInfoStatesService } from '../../../../../../shared/user/services/user-info-states.service';
import { SearchQuery } from '../../../models/search-query.model';
import { CollectionDisplaySearchResultsStatesService } from './collection-display-search-results-states.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionDisplaySearchResultsService {
    private _searchCardsStatesService = inject(CollectionDisplaySearchResultsStatesService);
    private _collectionCardsStatesService = inject(CollectionCardsStateService);
    private _collectionCardsService = inject(CollectionCardsService);
    private _userInfoId = inject(UserInfoStatesService).getUserInfo().id;

    init() {
        this._searchCardsStatesService.setCards(this._collectionCardsStatesService.getCardsValue());
    }

    searchCards(searchQuery: SearchQuery) {
        this._searchCardsStatesService.setCards([]);
        this._searchCardsStatesService.setSearchRequestStatus(RequestStatus.loading);
        this.getCards(searchQuery).subscribe((userCards) => {
            this._searchCardsStatesService.setCards(userCards);
            this._searchCardsStatesService.setSearchRequestStatus(RequestStatus.success);
        });
    }

    deleteCard(userCardId: number): Observable<any> {
        return this._collectionCardsService.deleteCard(userCardId).pipe(
            tap(() =>
                this._collectionCardsService
                    .getCollectionCards(this._userInfoId)
                    .pipe(
                        take(1),
                        tap(() => this.init())
                    )
                    .subscribe()
            )
        );
    }

    private getCards(searchQuery: SearchQuery): Observable<UserCard[]> {
        let filteredCards: UserCard[] = [];
        filteredCards = this._collectionCardsStatesService
            .getCardsValue()
            .filter((card) => this.isMatchingFilter(searchQuery, card));
        return of(filteredCards);
    }

    private isMatchingFilter(searchQuery: SearchQuery, card: UserCard) {
        let result = true;
        if (searchQuery.name) {
            result =
                result &&
                card.cardInfo.name
                    .toLowerCase()
                    .includes(searchQuery.name?.toLowerCase() as string);
        }
        if (searchQuery.language) {
            result =
                result &&
                card.userInfo.languageName!.toLowerCase() ===
                    (searchQuery.language?.toLowerCase() as string);
        }
        if (searchQuery.set) {
            result =
                result &&
                card.cardInfo.setAbbreviation.toLowerCase() ===
                    (searchQuery.set?.toLowerCase() as string);
        }
        if (searchQuery.rarity) {
            result =
                result &&
                card.cardInfo.rarity.toLowerCase() ===
                    (searchQuery.rarity?.toLowerCase() as string);
        }
        return result;
    }
}
