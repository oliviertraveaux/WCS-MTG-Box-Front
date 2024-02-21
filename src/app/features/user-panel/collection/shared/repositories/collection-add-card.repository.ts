import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../../../env';
import { ApiCard } from '../../models/card-api.model';
import { SearchQuery } from '../../models/search-query.model';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardRepository {
    private http = inject(HttpClient);

    public getCards(searchQuery: SearchQuery): Observable<ApiCard[]> {
        const params = new HttpParams({ fromObject: searchQuery } as HttpParamsOptions);

        // For debug purpose
        const apiUrlWithParams = `${ENVIRONMENT.apiCardsConfigurationURL}?${params.toString()}`;
        console.log('from repo', apiUrlWithParams);

        return this.http.get<ApiCard[]>(ENVIRONMENT.apiCardsConfigurationURL, { params });
    }

    public getCardTypes(): Observable<string[]> {
        return this.http.get<string[]>(`${ENVIRONMENT.apiCardsConfigurationURL}/types`);
    }
}
