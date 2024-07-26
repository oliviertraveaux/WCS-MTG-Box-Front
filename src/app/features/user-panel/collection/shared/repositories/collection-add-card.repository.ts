import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../../../backend-endpoints';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
import { ApiCard } from '../../models/card-api.model';
import { SearchQuery } from '../../models/search-query.model';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardRepository {
    private http = inject(HttpClient);
    apiCardsUrl: string = ENVIRONMENT.apiCardsConfigurationURL;
    apiCollectionCardsUrl: string = ENVIRONMENT.apiCollectionCardsConfigurationURL;

    public getCards(searchQuery: SearchQuery): Observable<ApiCard[]> {
        const params = new HttpParams({ fromObject: searchQuery } as HttpParamsOptions);

        // For debug purpose
        const apiUrlWithParams = `${this.apiCardsUrl}?${params.toString()}`;

        return this.http.get<ApiCard[]>(this.apiCardsUrl, {
            params,
            withCredentials: true,
        });
    }

    public saveCards(userCards: UserCard[]): Observable<UserCard[]> {
        return this.http.post<UserCard[]>(this.apiCollectionCardsUrl, userCards, {
            withCredentials: true,
        });
    }
}
