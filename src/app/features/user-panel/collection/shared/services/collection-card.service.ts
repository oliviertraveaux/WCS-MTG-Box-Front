import {inject, Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
import {CollectionCardRepository} from "../repositories/collection-card.repository";

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
