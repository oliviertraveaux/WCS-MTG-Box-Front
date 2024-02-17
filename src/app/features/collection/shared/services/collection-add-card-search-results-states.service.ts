import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestStatus } from '../../../../shared/enums/request-status.enum';
import { ApiCard } from '../../models/card-api.model';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardResultsStatesService {
    private _cards$ = new BehaviorSubject<ApiCard[]>([]);
    private _cardsTypes$ = new BehaviorSubject<string[]>([]);
    private _searchRequestStatus$ = new BehaviorSubject<RequestStatus>(RequestStatus.initial);

    getCards$(): Observable<ApiCard[]> {
        return this._cards$;
    }
    getCardsValue(): ApiCard[] {
        return this._cards$.getValue();
    }

    setCards(cards: ApiCard[]): void {
        this._cards$.next(cards);
    }

    getCardTypes$(): Observable<string[]> {
        return this._cardsTypes$;
    }

    getCardTypesValue(): string[] {
        return this._cardsTypes$.getValue();
    }

    setCardTypes(cardTypes: string[]): void {
        this._cardsTypes$.next(cardTypes);
    }

    getSearchRequestStatus$(): Observable<RequestStatus> {
        return this._searchRequestStatus$;
    }

    getSearchRequestStatusValue(): RequestStatus {
        return this._searchRequestStatus$.getValue();
    }

    setSearchRequestStatus(status: RequestStatus): void {
        this._searchRequestStatus$.next(status);
    }
}
