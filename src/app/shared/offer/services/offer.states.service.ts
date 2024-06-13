import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OfferFullWantedCard } from '../models/offer-full-wanted-card.model';
import { Offer } from '../models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class OfferStatesService {
    private _offersMade: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);
    private _offersReceived: BehaviorSubject<OfferFullWantedCard[]> = new BehaviorSubject<
        OfferFullWantedCard[]
    >([]);
    private _isOffersMadeLoaded = new BehaviorSubject<boolean>(false);
    private _isOffersReceivedLoaded = new BehaviorSubject<boolean>(false);

    getOffersMade$(): Observable<Offer[]> {
        return this._offersMade;
    }
    getOffersMade(): Offer[] {
        return this._offersMade.getValue();
    }
    setOffersMade(offers: Offer[]): void {
        this._offersMade.next(offers);
    }
    getOffersReceived$(): Observable<OfferFullWantedCard[]> {
        return this._offersReceived;
    }
    getOffersReceived(): OfferFullWantedCard[] {
        return this._offersReceived.getValue();
    }
    setOffersReceived(offers: OfferFullWantedCard[]): void {
        this._offersReceived.next(offers);
    }
    getIsOffersMadeLoadedValue(): boolean {
        return this._isOffersMadeLoaded.getValue();
    }
    getIsOffersReceivedLoadedValue(): boolean {
        return this._isOffersReceivedLoaded.getValue();
    }
    setIsOffersMadeLoaded(isLoaded: boolean): void {
        this._isOffersMadeLoaded.next(isLoaded);
    }
    setIsOffersReceivedLoaded(isLoaded: boolean): void {
        this._isOffersReceivedLoaded.next(isLoaded);
    }
}
