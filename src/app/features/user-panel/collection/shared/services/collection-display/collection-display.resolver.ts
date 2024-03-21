import { ResolveFn } from '@angular/router';
import {map, Observable} from "rxjs";
import {inject} from "@angular/core";
import {CollectionCardsService} from "../../../../../../shared/collection/services/collection-cards.service";
import {UserInfoStatesService} from "../../../../../../shared/user/services/user-info-states.service";

export const collectionDisplayResolver: ResolveFn<boolean> = (route, state): Observable<any> => {
  const userId = inject(UserInfoStatesService).getUserInfo().id;
  return inject(CollectionCardsService).getCollectionCards(userId).pipe(
    map((collection)=> true)
  );
};
