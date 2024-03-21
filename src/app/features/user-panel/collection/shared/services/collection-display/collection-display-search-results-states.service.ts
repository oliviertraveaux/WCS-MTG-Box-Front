import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';

@Injectable({
    providedIn: 'root',
})
export class CollectionDisplaySearchResultsStatesService {
    private _cards$ = new BehaviorSubject<UserCard[]>([]);
    private _searchRequestStatus$ = new BehaviorSubject<RequestStatus>(RequestStatus.initial);

    getCards$(): Observable<UserCard[]> {
        return this._cards$;
    }
    getCardsValue(): UserCard[] {
        return this._cards$.getValue();
    }

    setCards(cards: UserCard[]): void {
        this._cards$.next(cards);
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
