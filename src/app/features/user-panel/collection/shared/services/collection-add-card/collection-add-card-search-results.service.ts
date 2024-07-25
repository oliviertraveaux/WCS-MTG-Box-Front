import { inject, Injectable } from '@angular/core';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { SearchQuery } from '../../../models/search-query.model';
import { CollectionAddCardRepository } from '../../repositories/collection-add-card.repository';
import { CollectionAddCardResultsStatesService } from './collection-add-card-search-results-states.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardSearchResultsService {
    private _collectionAddCardRepository = inject(CollectionAddCardRepository);
    private _searchCardsStatesService = inject(CollectionAddCardResultsStatesService);

    searchCards(searchQuery: SearchQuery): void {
        this._searchCardsStatesService.setCards([]);
        this._searchCardsStatesService.setSearchRequestStatus(RequestStatus.loading);
        this._collectionAddCardRepository.getCards(searchQuery).subscribe((apiCards) => {
            this._searchCardsStatesService.setCards(apiCards);
            this._searchCardsStatesService.setSearchRequestStatus(RequestStatus.success);
        });
    }

    reset() {
        this._searchCardsStatesService.setCards([]);
    }
}
