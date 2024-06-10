import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';

@Injectable({
    providedIn: 'root',
})
export class CollectionDisplaySearchResultsStatesService {
    private _cards$ = new BehaviorSubject<UserCard[]>([]);
    private _searchRequestStatus$ = new BehaviorSubject<RequestStatus>(RequestStatus.initial);
    private _selectedCards$ = new BehaviorSubject<UserCard[]>([]);

    private _isAllSelected$ = combineLatest([this._cards$, this._selectedCards$]).pipe(
        map(([cards, selectedCards]) => {
            return selectedCards.length === cards.length;
        })
    );

    private _isIndeterminate$ = combineLatest([this._isAllSelected$, this._selectedCards$]).pipe(
        map(([isAllSelected, selectedCards]) => {
            return !isAllSelected && selectedCards.length > 0;
        })
    );

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

    getSelectedCards(): Observable<UserCard[]> {
        return this._selectedCards$;
    }

    setSelectedCards(selectedCards: UserCard[]): void {
        this._selectedCards$.next(selectedCards);
    }

    getSelectedCardsValue(): UserCard[] {
        return this._selectedCards$.getValue();
    }

    getIsAllSelected$(): Observable<boolean> {
        return this._isAllSelected$;
    }

    getIsIndeterminate$(): Observable<boolean> {
        return this._isIndeterminate$;
    }
}
