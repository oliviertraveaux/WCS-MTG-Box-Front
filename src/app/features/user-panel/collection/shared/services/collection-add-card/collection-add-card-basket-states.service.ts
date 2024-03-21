import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardBasketStatesService {
    private _cardBasket$ = new BehaviorSubject<UserCard[]>([]);

    getCardBasket$(): Observable<UserCard[]> {
        return this._cardBasket$;
    }

    getCardBasketValue(): UserCard[] {
        return this._cardBasket$.getValue();
    }

    setCardBasket(cards: UserCard[]): void {
        this._cardBasket$.next(cards);
    }
}
