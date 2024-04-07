import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CollectionDisplaySearchResultsService } from './collection-display-search-results.service';

export const collectionDisplayGuard: CanActivateFn = (route, state) => {
    inject(CollectionDisplaySearchResultsService).resetSelection();
    return true;
};
