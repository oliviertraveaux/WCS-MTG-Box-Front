import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OfferFullWantedCard } from '../models/offer-full-wanted-card.model';

@Injectable({
    providedIn: 'root',
})
export class OfferStatesService {
    private _offersMade: BehaviorSubject<OfferFullWantedCard[]> = new BehaviorSubject<
        OfferFullWantedCard[]
    >([]);
    private _offersReceived: BehaviorSubject<OfferFullWantedCard[]> = new BehaviorSubject<
        OfferFullWantedCard[]
    >([]);
    private _isOffersMadeLoaded = new BehaviorSubject<boolean>(false);
    private _isOffersReceivedLoaded = new BehaviorSubject<boolean>(false);

    getOffersMade$(): Observable<OfferFullWantedCard[]> {
        return this._offersMade;
    }
    getOffersMade(): OfferFullWantedCard[] {
        return this._offersMade.getValue();
    }
    setOffersMade(offers: OfferFullWantedCard[]): void {
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
