import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestStatus } from '../../enums/request-status.enum';
import { UserCard } from '../models/user-card.model';

@Injectable({
    providedIn: 'root',
})
export class CollectionCardsStateService {
    private _cards$ = new BehaviorSubject<UserCard[]>([]);
    private _getCollectionStatus$ = new BehaviorSubject<RequestStatus>(RequestStatus.initial);
    private _isCollectionLoaded$ = new BehaviorSubject<boolean>(false);

    getIsCollectionLoadedValue(): boolean {
        return this._isCollectionLoaded$.getValue();
    }
    setIsCollectionLoaded(isLoaded: boolean): void {
        this._isCollectionLoaded$.next(isLoaded);
    }
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
        return this._getCollectionStatus$;
    }

    getSearchRequestStatusValue(): RequestStatus {
        return this._getCollectionStatus$.getValue();
    }

    setSearchRequestStatus(status: RequestStatus): void {
        this._getCollectionStatus$.next(status);
    }
}
