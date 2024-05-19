import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../env';
import { Offer } from '../models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class OfferRepositoryService {
    private http = inject(HttpClient);

    private cardAdOffersURL: string = ENVIRONMENT.apiCardAdOffersURL;

    getCardAdOffers(id: number): Observable<Offer[]> {
        return this.http.get<Offer[]>(`${this.cardAdOffersURL}/${id}`);
    }
}
