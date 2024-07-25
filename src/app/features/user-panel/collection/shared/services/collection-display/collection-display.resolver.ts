import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { CollectionCardsStateService } from '../../../../../../shared/collection/services/collection-cards-state.service';
import { CollectionCardsService } from '../../../../../../shared/collection/services/collection-cards.service';
import { UserInfoStatesService } from '../../../../../../shared/user/services/user-info-states.service';

export const collectionDisplayResolver: ResolveFn<boolean> = (route, state): Observable<any> => {
    const collectionCardsService = inject(CollectionCardsService);
    const collectionCardsStatesService = inject(CollectionCardsStateService);
    const userId = inject(UserInfoStatesService).getUserInfo().id;

    if (collectionCardsStatesService.getIsCollectionLoadedValue()) {
        return of(true);
    } else {
        return collectionCardsService.getCollectionCards$(userId).pipe(
            tap(() => collectionCardsStatesService.setIsCollectionLoaded(true)),
            map((collection) => true)
        );
    }
};
