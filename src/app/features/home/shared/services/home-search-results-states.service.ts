import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestStatus } from '../../../../shared/enums/request-status.enum';
import { HomeCardSearchResult } from '../../models/home-search-results.model';

@Injectable({
    providedIn: 'root',
})
export class HomeSearchResultsStatesService {
    private _homeCards$ = new BehaviorSubject<HomeCardSearchResult[]>([]);
    private _searchRequestStatus$ = new BehaviorSubject<RequestStatus>(RequestStatus.initial);

    getHomeCards$(): Observable<HomeCardSearchResult[]> {
        return this._homeCards$;
    }

    getHomeCards(): HomeCardSearchResult[] {
        return this._homeCards$.getValue();
    }

    setHomeCards(cards: HomeCardSearchResult[]) {
        this._homeCards$.next(cards);
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
