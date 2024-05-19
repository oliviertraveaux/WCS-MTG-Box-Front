import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../../../env';
import { CardAdInfo } from '../../models/card-ad.info';

@Injectable({
    providedIn: 'root',
})
export class CardAdRepositoryService {
    private http = inject(HttpClient);
    private cardAdUrl: string = ENVIRONMENT.apiCardAdURL;

    getCardAd(id: number): Observable<CardAdInfo> {
        return this.http.get<CardAdInfo>(`${this.cardAdUrl}/${id}`);
    }
}
