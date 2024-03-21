import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { COLLECTION } from '../../../../../../shared/collection/components/collection-display-list/collection.mock';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { SearchQuery } from '../../../models/search-query.model';
import { CollectionDisplaySearchResultsStatesService } from './collection-display-search-results-states.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionDisplaySearchResultsService {
    private _searchCardsStatesService = inject(CollectionDisplaySearchResultsStatesService);

    init() {
        this._searchCardsStatesService.setCards(COLLECTION);
    }

    searchCards(searchQuery: SearchQuery) {
        this._searchCardsStatesService.setCards([]);
        this._searchCardsStatesService.setSearchRequestStatus(RequestStatus.loading);
        this.getCards(searchQuery).subscribe((userCards) => {
            this._searchCardsStatesService.setCards(userCards);
            this._searchCardsStatesService.setSearchRequestStatus(RequestStatus.success);
        });
    }

    private getCards(searchQuery: SearchQuery): Observable<UserCard[]> {
        let filteredCards: UserCard[] = [];
        filteredCards = COLLECTION.filter((card) => this.isMatchingFilter(searchQuery, card));
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
