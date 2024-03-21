import {inject, Injectable} from '@angular/core';
import { Observable, take, tap} from 'rxjs';
import {UserCard} from "../models/user-card.model";
import {CollectionCardsRepository} from "../repository/collection-cards.repository";
import {CollectionCardsStateService} from "./collection-cards-state.service";


@Injectable({
    providedIn: 'root',
})
export class CollectionCardsService {
    private _collectionCard = inject(CollectionCardsRepository)
    private _collectionCardsStateService = inject(CollectionCardsStateService)

  getCollectionCards(userId: number): Observable<UserCard[]> {
    return this._collectionCard.getCards(userId).pipe(
      take(1),
      tap((collection) => this._collectionCardsStateService.setCards(collection))
    );
  }


    deleteCard(userCardId: number | undefined): Observable<any> {
        return this._collectionCard.deleteCard(userCardId);
    }


}
