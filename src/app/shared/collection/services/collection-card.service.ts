import {inject, Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CollectionCardRepository
} from "../../../features/user-panel/collection/shared/repositories/collection-card.repository";
import {UserCard} from "../models/user-card.model";


@Injectable({
  providedIn: 'root',
})
export class CollectionCardService {
  private _collectionCard = inject (CollectionCardRepository)


  getCollectionCards(userId: number): Observable<UserCard[]> {
    return this._collectionCard.getCards(userId);
  }

  deleteCard(userCardId: number | undefined) : Observable<any> {
    return this._collectionCard.deleteCard(userCardId);
  }


}
