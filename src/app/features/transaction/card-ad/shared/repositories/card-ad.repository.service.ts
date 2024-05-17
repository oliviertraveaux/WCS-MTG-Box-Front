import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../../../env';
import cardAdMock from '../../mock/card-ad.mock';
import { CardAdInfo } from '../../models/card-ad.info';

@Injectable({
    providedIn: 'root',
})
export class CardAdRepositoryService {
    readonly CARD_AD_1 = cardAdMock.CARD_AD_1;
    private http = inject(HttpClient);
    private cardAdUrl: string = ENVIRONMENT.apiCardAdURL;

    getCardAd(id: number): Observable<CardAdInfo> {
        return this.http.get<CardAdInfo>(`${this.cardAdUrl}/${id}`);
        // return of(this.CARD_AD_1);
    }
}
