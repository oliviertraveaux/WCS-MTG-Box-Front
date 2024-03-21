import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SearchFormAddCardCollectionService } from '../../../../../../shared/services/search-form/search-form-add-card-collection.service';
import { CollectionAddCardBasketService } from './collection-add-card-basket.service';
import { CollectionAddCardSearchResultsService } from './collection-add-card-search-results.service';

export const collectionAddCardGuard: CanActivateFn = (route, state) => {
    inject(CollectionAddCardSearchResultsService).reset();
    inject(CollectionAddCardBasketService).emptyCardBasket();
    inject(SearchFormAddCardCollectionService).reset();
    return true;
};
