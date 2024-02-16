import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestStatus } from '../../../../shared/enums/request-status.enum';
import { CardApi } from '../../models/card-api.model';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardResultsStatesService {
    private cards$ = new BehaviorSubject<CardApi[]>([]);
    private cardsTypes$ = new BehaviorSubject<string[]>([]);
    private searchRequestStatus$ = new BehaviorSubject<RequestStatus>(RequestStatus.initial);

    getCards(): Observable<CardApi[]> {
        return this.cards$;
    }
    getCardsValue(): CardApi[] {
        return this.cards$.getValue();
    }

    setCards(cards: CardApi[]): void {
        this.cards$.next(cards);
    }

    getCardTypes(): Observable<string[]> {
        return this.cardsTypes$;
    }

    getCardTypesValue(): string[] {
        return this.cardsTypes$.getValue();
    }

    setCardTypes(cardTypes: string[]): void {
        this.cardsTypes$.next(cardTypes);
    }

    getSearchRequestStatus(): Observable<RequestStatus> {
        return this.searchRequestStatus$;
    }

    getSearchRequestStatusValue(): RequestStatus {
        return this.searchRequestStatus$.getValue();
    }

    setSearchRequestStatus(status: RequestStatus): void {
        this.searchRequestStatus$.next(status);
    }
}
