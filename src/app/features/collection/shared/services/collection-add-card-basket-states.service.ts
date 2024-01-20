import { Injectable } from '@angular/core';
import { Card } from '@shared';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardBasketStatesService {
    private cardBasket$ = new BehaviorSubject<Card[]>([]);

    getCardBasket(): Observable<Card[]> {
        return this.cardBasket$;
    }

    getCardBasketValue(): Card[] {
        return this.cardBasket$.getValue();
    }

    setCardBasket(cards: Card[]): void {
        this.cardBasket$.next(cards);
    }
}
