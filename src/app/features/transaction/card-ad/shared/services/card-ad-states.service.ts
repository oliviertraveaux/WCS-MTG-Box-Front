import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Offer } from '../../../../../shared/offer/models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class CardAdStatesService {
    private _cardAdOffer$ = new BehaviorSubject<Offer[]>([]);
    private _isLoading$ = new BehaviorSubject<boolean>(false);

    getCardAdOffer$(): Observable<Offer[]> {
        return this._cardAdOffer$;
    }

    getCardAdOffer(): Offer[] {
        return this._cardAdOffer$.getValue();
    }

    setCardAdOffer(offers: Offer[]) {
        this._cardAdOffer$.next(offers);
    }

    getIsLoading$(): Observable<boolean> {
        return this._isLoading$;
    }

    getIsLoading(): boolean {
        return this._isLoading$.getValue();
    }

    setIsLoading(status: boolean): void {
        this._isLoading$.next(status);
    }
}
